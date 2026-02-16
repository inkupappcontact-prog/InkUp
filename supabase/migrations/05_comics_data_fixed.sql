-- Création des tables pour les données de l'application (version mise à jour)
-- Cette migration est conçue pour être appliquée après la migration initiale

-- Table pour les bandes dessinées
CREATE TABLE IF NOT EXISTS public.comics (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  author TEXT NOT NULL,
  description TEXT,
  cover_url TEXT,
  price INTEGER DEFAULT 0,
  category TEXT,
  has_physical BOOLEAN DEFAULT false,
  physical_stock INTEGER DEFAULT 0,
  physical_price INTEGER,
  is_mature BOOLEAN DEFAULT false,
  file_url TEXT,
  author_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table pour les achats/transactions
CREATE TABLE IF NOT EXISTS public.purchases (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  comic_id UUID REFERENCES public.comics(id) ON DELETE CASCADE,
  format TEXT NOT NULL CHECK (format IN ('digital', 'physical')),
  price INTEGER NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'shipped', 'delivered')),
  shipping_address JSONB,
  tracking_number TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table pour les bibliothèques personnelles
CREATE TABLE IF NOT EXISTS public.user_libraries (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  comic_id UUID REFERENCES public.comics(id) ON DELETE CASCADE,
  format TEXT NOT NULL CHECK (format IN ('digital', 'physical')),
  purchased_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, comic_id, format)
);

-- Table pour les profils utilisateurs étendus
CREATE TABLE IF NOT EXISTS public.user_profiles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE,
  first_name TEXT,
  last_name TEXT,
  bio TEXT,
  phone TEXT,
  address TEXT,
  city TEXT,
  postal_code TEXT,
  country TEXT DEFAULT 'France',
  website TEXT,
  social_links JSONB,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table pour les statistiques des auteurs
CREATE TABLE IF NOT EXISTS public.author_stats (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  author_id UUID REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE,
  total_sales INTEGER DEFAULT 0,
  total_revenue INTEGER DEFAULT 0,
  total_readers INTEGER DEFAULT 0,
  average_rating DECIMAL(3,2) DEFAULT 0,
  comics_count INTEGER DEFAULT 0,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index pour optimiser les performances
CREATE INDEX IF NOT EXISTS idx_comics_author_id ON public.comics(author_id);
CREATE INDEX IF NOT EXISTS idx_comics_category ON public.comics(category);
CREATE INDEX IF NOT EXISTS idx_comics_price ON public.comics(price);
CREATE INDEX IF NOT EXISTS idx_purchases_user_id ON public.purchases(user_id);
CREATE INDEX IF NOT EXISTS idx_purchases_status ON public.purchases(status);
CREATE INDEX IF NOT EXISTS idx_user_libraries_user_id ON public.user_libraries(user_id);

-- Trigger pour mettre à jour les timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Appliquer le trigger aux tables pertinentes (uniquement si elles n'existent pas déjà)
DROP TRIGGER IF EXISTS update_comics_updated_at ON public.comics;
CREATE TRIGGER update_comics_updated_at BEFORE UPDATE ON public.comics
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_purchases_updated_at ON public.purchases;
CREATE TRIGGER update_purchases_updated_at BEFORE UPDATE ON public.purchases
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_user_profiles_updated_at ON public.user_profiles;
CREATE TRIGGER update_user_profiles_updated_at BEFORE UPDATE ON public.user_profiles
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Données de démonstration (uniquement si la table est vide)
INSERT INTO public.comics (title, author, description, cover_url, price, category, has_physical, physical_stock, physical_price) 
SELECT 
  'Le Secret de l''Encre', 'Moebius II', 'Une aventure épique dans les méandres du temps et de l''encre.', 'https://images.unsplash.com/photo-1580136608260-42d1c4101a92?auto=format&fit=crop&q=80&w=400', 45, 'Sci-Fi', true, 12, 2500
WHERE NOT EXISTS (SELECT 1 FROM public.comics LIMIT 1);

INSERT INTO public.comics (title, author, description, cover_url, price, category, has_physical, physical_stock, physical_price) 
VALUES 
  ('Nuit de Plomb', 'Tardi Fan', 'Un thriller noir dans les rues de Paris occupée.', 'https://images.unsplash.com/photo-1618519764620-7403abdbf951?auto=format&fit=crop&q=80&w=400', 0, 'Noir', false, 0, NULL),
  ('Ligne d''Horizon', 'Hergé Legacy', 'Une aventure classique avec des personnages inoubliables.', 'https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?auto=format&fit=crop&q=80&w=400', 60, 'Aventure', true, 5, 3000),
  ('Cyanure & Co', 'Franquin Jr', 'Des aventures humoristiques qui vous feront rire aux éclats.', 'https://images.unsplash.com/photo-1543004218-ee141104e14a?auto=format&fit=crop&q=80&w=400', 30, 'Humour', false, 0, NULL),
  ('Ether Eternel', 'Uderzo Tribute', 'Un voyage fantastique dans un monde magique.', 'https://images.unsplash.com/photo-1541963463532-d68292c34b19?auto=format&fit=crop&q=80&w=400', 50, 'Fantaisie', true, 0, 2800),
  ('Bruit de Fond', 'Giraud Style', 'Un western moderne avec des personnages complexes.', 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=400', 25, 'Western', false, 0, NULL)
ON CONFLICT DO NOTHING;
