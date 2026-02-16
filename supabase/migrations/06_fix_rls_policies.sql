-- Correction des politiques RLS et du trigger pour l'authentification
-- Cette migration corrige les problèmes d'insertion lors du signup

-- Supprimer l'ancien trigger
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

-- Supprimer l'ancienne fonction
DROP FUNCTION IF EXISTS public.handle_new_user();

-- Créer une nouvelle fonction qui utilise les métadonnées utilisateur
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  -- Utiliser les métadonnées utilisateur pour déterminer le rôle
  DECLARE
    user_role TEXT;
    artist_name TEXT;
  BEGIN
    -- Récupérer le rôle depuis les métadonnées, par défaut 'reader'
    user_role := COALESCE((new.raw_user_meta_data->>'role'), 'reader');
    
    -- Insérer dans la table profiles avec le bon rôle
    INSERT INTO public.profiles (id, role)
    VALUES (new.id, user_role);
    
    RETURN NEW;
  END;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Recréer le trigger
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- Mettre à jour les politiques RLS pour permettre l'insertion automatique
DROP POLICY IF EXISTS "Users can insert own profile" ON profiles;
DROP POLICY IF EXISTS "Users can view own profile" ON profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON profiles;

-- Nouvelles politiques plus permissives
CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Service role can insert profiles" ON profiles
  FOR INSERT WITH CHECK (true);

-- Ajouter une colonne artist_name à la table profiles si elle n'existe pas
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'profiles' 
        AND column_name = 'artist_name'
    ) THEN
        ALTER TABLE profiles ADD COLUMN artist_name TEXT;
    END IF;
END $$;

-- Mettre à jour la fonction pour gérer artist_name
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  -- Utiliser les métadonnées utilisateur pour déterminer le rôle et artist_name
  DECLARE
    user_role TEXT;
    user_artist_name TEXT;
  BEGIN
    -- Récupérer le rôle depuis les métadonnées, par défaut 'reader'
    user_role := COALESCE((new.raw_user_meta_data->>'role'), 'reader');
    
    -- Récupérer artist_name depuis les métadonnées
    user_artist_name := new.raw_user_meta_data->>'artist_name';
    
    -- Insérer dans la table profiles avec le bon rôle et artist_name
    INSERT INTO public.profiles (id, role, artist_name)
    VALUES (new.id, user_role, user_artist_name);
    
    RETURN NEW;
  END;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
