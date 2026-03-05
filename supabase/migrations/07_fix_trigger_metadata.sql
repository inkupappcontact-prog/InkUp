-- Correction du trigger pour gérer correctement raw_user_meta_data
-- Le problème vient probablement de l'accès aux métadonnées

-- Supprimer l'ancien trigger et fonction
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS public.handle_new_user();

-- Créer une nouvelle fonction plus robuste
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  -- Utiliser raw_user_meta_data pour accéder aux métadonnées lors de l'insertion
  DECLARE
    user_role TEXT DEFAULT 'reader';
    user_artist_name TEXT DEFAULT NULL;
    user_full_name TEXT DEFAULT NULL;
  BEGIN
    -- Récupérer les métadonnées depuis raw_user_meta_data
    IF new.raw_user_meta_data IS NOT NULL THEN
      user_role := COALESCE((new.raw_user_meta_data->>'role'), 'reader');
      user_artist_name := new.raw_user_meta_data->>'artist_name';
      user_full_name := new.raw_user_meta_data->>'full_name';
    END IF;
    
    -- Insérer dans la table profiles avec les bonnes valeurs
    -- Gérer les valeurs NULL pour artist_name
    INSERT INTO public.profiles (id, role, artist_name)
    VALUES (
      new.id, 
      user_role, 
      CASE 
        WHEN user_artist_name IS NOT NULL AND user_artist_name != 'null' AND user_artist_name != '' 
        THEN user_artist_name 
        ELSE NULL 
      END
    );
    
    RETURN NEW;
  EXCEPTION
    WHEN OTHERS THEN
      -- En cas d'erreur, logger l'erreur mais ne pas bloquer la création de l'utilisateur
      RAISE WARNING 'Erreur lors de la création du profile pour l utilisateur %: %', new.id, SQLERRM;
      RETURN NEW;
  END;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Recréer le trigger
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- Ajouter une politique plus permissive pour l'insertion
DROP POLICY IF EXISTS "Service role can insert profiles" ON profiles;
CREATE POLICY "Service role can insert profiles" ON profiles
  FOR INSERT WITH CHECK (true);

-- Politique pour permettre aux utilisateurs de voir leur propre profile
DROP POLICY IF EXISTS "Users can view own profile" ON profiles;
CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

-- Politique pour permettre aux utilisateurs de mettre à jour leur profile
DROP POLICY IF EXISTS "Users can update own profile" ON profiles;
CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);
