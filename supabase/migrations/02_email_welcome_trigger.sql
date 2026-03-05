-- Trigger pour envoyer l'email de bienvenue automatiquement
CREATE OR REPLACE FUNCTION send_welcome_email_trigger()
RETURNS TRIGGER AS $$
BEGIN
  -- Appeler l'Edge Function pour envoyer l'email de bienvenue
  -- Note: Cette fonction sera appelée via un webhook HTTP depuis l'application
  -- car les triggers PostgreSQL ne peuvent pas appeler directement des Edge Functions
  
  -- Insérer dans une table de queue pour les emails à envoyer
  INSERT INTO public.email_queue (
    user_id,
    email_type,
    user_email,
    user_name,
    user_role,
    artist_name,
    created_at,
    processed
  ) VALUES (
    NEW.id,
    'welcome',
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', 'Explorateur'),
    COALESCE(NEW.raw_user_meta_data->>'role', 'reader'),
    NEW.raw_user_meta_data->>'artist_name',
    NOW(),
    false
  );
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Créer la table email_queue si elle n'existe pas
CREATE TABLE IF NOT EXISTS public.email_queue (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  email_type TEXT NOT NULL,
  user_email TEXT NOT NULL,
  user_name TEXT NOT NULL,
  user_role TEXT,
  artist_name TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  processed BOOLEAN DEFAULT false,
  processed_at TIMESTAMP WITH TIME ZONE,
  error_message TEXT
);

-- Créer un index pour optimiser les requêtes
CREATE INDEX IF NOT EXISTS idx_email_queue_processed ON public.email_queue(processed, created_at);

-- Créer le trigger sur auth.users
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION send_welcome_email_trigger();

-- Donner les permissions nécessaires
GRANT ALL ON public.email_queue TO authenticated;
GRANT ALL ON public.email_queue TO service_role;
