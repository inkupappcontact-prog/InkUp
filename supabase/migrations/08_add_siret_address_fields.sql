-- Ajouter les champs SIRET et adresse à la table profiles
ALTER TABLE profiles 
ADD COLUMN siret VARCHAR(14),
ADD COLUMN address TEXT;

-- Mettre à jour la fonction handle_new_user avec search_path et gestion SIRET/adresse
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS public.handle_new_user();

-- Créer la nouvelle fonction avec search_path défini
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
    INSERT INTO public.profiles (id, role, artist_name, siret, address)
    VALUES (
      new.id, 
      user_role, 
      CASE 
        WHEN user_artist_name IS NOT NULL AND user_artist_name != 'null' AND user_artist_name != '' 
        THEN user_artist_name 
        ELSE NULL 
      END,
      new.raw_user_meta_data->>'siret',
      new.raw_user_meta_data->>'address'
    );
    
    RETURN NEW;
  EXCEPTION
    WHEN OTHERS THEN
      -- En cas d'erreur, logger l'erreur mais ne pas bloquer la création de l'utilisateur
      RAISE WARNING 'Erreur lors de la création du profile pour l utilisateur %: %', new.id, SQLERRM;
      RETURN NEW;
  END;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Recréer le trigger
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- Mettre à jour les politiques RLS pour inclure les nouveaux champs
DROP POLICY IF EXISTS "Users can view own profile" ON profiles;
CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

DROP POLICY IF EXISTS "Users can update own profile" ON profiles;
CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

-- Politique pour l'insertion par le service role
DROP POLICY IF EXISTS "Service role can insert profiles" ON profiles;
CREATE POLICY "Service role can insert profiles" ON profiles
  FOR INSERT WITH CHECK (true);
