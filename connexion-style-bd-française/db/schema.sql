-- 1. MODIFICATION DE LA TABLE WORKS (Stock & Physique & Maturité)
ALTER TABLE works 
ADD COLUMN is_physical BOOLEAN DEFAULT FALSE,
ADD COLUMN stock_quantity INTEGER DEFAULT 0 CHECK (stock_quantity >= 0),
ADD COLUMN weight_grams INTEGER DEFAULT 0,
ADD COLUMN is_mature BOOLEAN DEFAULT FALSE; -- Protection Mineurs

-- 2. TABLE DES COMMANDES PHYSIQUES (Support Escrow)
CREATE TYPE order_status AS ENUM ('pending', 'paid', 'shipped', 'delivered', 'cancelled');

CREATE TABLE physical_orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  buyer_id UUID REFERENCES auth.users(id),
  author_id UUID REFERENCES auth.users(id),
  work_id UUID REFERENCES works(id),
  
  -- Détails financiers
  amount_total INTEGER NOT NULL, -- Prix total en InkPoints (Livraison incluse)
  commission_rate NUMERIC(3,2) NOT NULL, -- 0.05 ou 0.15 au moment de l'achat
  
  -- Logique d'Escrow (Séquestre)
  funds_released BOOLEAN DEFAULT FALSE, -- FALSE = Argent chez InkUp, TRUE = Argent chez l'auteur
  
  -- Logique Logistique
  status order_status DEFAULT 'paid',
  tracking_number TEXT,
  shipping_address JSONB NOT NULL, -- Snapshot de l'adresse au moment de l'achat
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. TABLE DES CONSENTEMENTS (RGPD - Log d'audit)
CREATE TABLE user_consents (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  consent_type TEXT NOT NULL, -- 'tos', 'privacy', 'marketing'
  agreed_at TIMESTAMPTZ DEFAULT NOW(),
  ip_address INET, -- Pour preuve légale en cas de litige
  user_agent TEXT
);

-- 4. TABLE DES FACTURES (Mentions obligatoires Auto-entrepreneur/Société)
CREATE TABLE invoices (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id), -- L'acheteur
  order_id UUID, -- Lien vers physical_orders ou achat InkPoints
  invoice_number TEXT NOT NULL UNIQUE, -- Séquentiel (ex: INV-2023-001)
  amount_paid_cents INTEGER NOT NULL,
  currency TEXT DEFAULT 'EUR',
  vat_rate NUMERIC(3,2) DEFAULT 0.00, -- 0 si auto-entrepreneur (TVA non applicable, art. 293 B du CGI)
  billing_address JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  pdf_url TEXT -- Lien vers le stockage sécurisé
);

-- Mise à jour Profil pour Age Verification
ALTER TABLE profiles ADD COLUMN birth_date DATE;

-- 5. TABLE HISTORIQUE INKPOINTS (Ledger)
-- Essentiel pour la traçabilité des points (Achat de packs vs Dépense Oeuvre)
CREATE TYPE transaction_type AS ENUM ('deposit', 'purchase_content', 'purchase_physical', 'refund', 'payout', 'bonus');

CREATE TABLE inkpoints_transactions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  amount INTEGER NOT NULL, -- Valeur positive (Crédit) ou Négative (Débit)
  type transaction_type NOT NULL,
  description TEXT, -- Ex: "Achat Pack 500 IP" ou "Achat BD: Tintin"
  related_order_id UUID, -- Optionnel, lien vers physical_orders ou invoices
  balance_after INTEGER, -- Snapshot du solde après opération (Pour audit rapide)
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index pour performance des requêtes de solde/historique
CREATE INDEX idx_inkpoints_user ON inkpoints_transactions(user_id);
CREATE INDEX idx_physical_orders_author ON physical_orders(author_id);

-- 6. FONCTION DE TRANSACTION ATOMIQUE (Achat Physique)
CREATE OR REPLACE FUNCTION purchase_physical_work(
  p_work_id UUID,
  p_buyer_id UUID,
  p_shipping_address JSONB
) RETURNS UUID AS $$
DECLARE
  v_work RECORD;
  v_buyer_balance INTEGER;
  v_order_id UUID;
  v_new_balance INTEGER;
BEGIN
  -- A. Verrouiller la ligne du produit pour éviter les race conditions
  SELECT * INTO v_work FROM works WHERE id = p_work_id FOR UPDATE;
  
  -- B. Vérifications Critiques
  IF v_work.stock_quantity < 1 THEN
    RAISE EXCEPTION 'Rupture de stock';
  END IF;
  
  SELECT balance INTO v_buyer_balance FROM profiles WHERE id = p_buyer_id FOR UPDATE;
  IF v_buyer_balance < v_work.price THEN
    RAISE EXCEPTION 'Solde insuffisant';
  END IF;

  -- C. Décrémentation Stock (Immédiat)
  UPDATE works SET stock_quantity = stock_quantity - 1 WHERE id = p_work_id;
  
  -- D. Débit Acheteur
  v_new_balance := v_buyer_balance - v_work.price;
  UPDATE profiles SET balance = v_new_balance WHERE id = p_buyer_id;

  -- E. Enregistrement Transaction Ledger (Debit)
  INSERT INTO inkpoints_transactions (user_id, amount, type, description, balance_after)
  VALUES (p_buyer_id, -v_work.price, 'purchase_physical', 'Commande physique: ' || v_work.title, v_new_balance);

  -- F. Création de la commande (Fonds bloqués par défaut)
  INSERT INTO physical_orders (
    buyer_id, author_id, work_id, amount_total, commission_rate, shipping_address, funds_released
  ) VALUES (
    p_buyer_id, v_work.author_id, p_work_id, v_work.price, 0.15, p_shipping_address, FALSE
  ) RETURNING id INTO v_order_id;

  RETURN v_order_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 7. FONCTION DE LIBÉRATION DES FONDS (Marquer comme expédié)
CREATE OR REPLACE FUNCTION mark_order_shipped(
  p_order_id UUID,
  p_author_id UUID,
  p_tracking_number TEXT
) RETURNS BOOLEAN AS $$
DECLARE
  v_order RECORD;
  v_net_amount INTEGER;
  v_author_balance INTEGER;
BEGIN
  -- Vérifier que c'est bien l'auteur qui valide
  SELECT * INTO v_order FROM physical_orders WHERE id = p_order_id AND author_id = p_author_id;
  
  IF v_order IS NULL THEN
    RAISE EXCEPTION 'Commande introuvable ou accès refusé';
  END IF;

  IF v_order.status = 'shipped' THEN
    RETURN TRUE; -- Déjà fait
  END IF;

  -- Calcul montant net (Total - Commission)
  v_net_amount := FLOOR(v_order.amount_total * (1 - v_order.commission_rate));

  -- 1. Mettre à jour le statut et le tracking
  UPDATE physical_orders 
  SET status = 'shipped', 
      tracking_number = p_tracking_number, 
      funds_released = TRUE,
      updated_at = NOW()
  WHERE id = p_order_id;

  -- 2. Créditer l'auteur (Libération des fonds)
  UPDATE profiles 
  SET balance = balance + v_net_amount 
  WHERE id = p_author_id
  RETURNING balance INTO v_author_balance;

  -- 3. Enregistrement Transaction Ledger (Credit Auteur)
  INSERT INTO inkpoints_transactions (user_id, amount, type, description, related_order_id, balance_after)
  VALUES (p_author_id, v_net_amount, 'payout', 'Vente expédiée: ' || p_order_id, p_order_id, v_author_balance);

  RETURN TRUE;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;