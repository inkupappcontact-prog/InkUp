-- Vérification des politiques RLS et de la structure de la table profiles
SELECT 
    schemaname,
    tablename,
    rowsecurity,
    forcerlspolicy
FROM pg_tables 
WHERE tablename = 'profiles' AND schemaname = 'public';

-- Vérification des politiques RLS sur profiles
SELECT 
    schemaname,
    tablename,
    policyname,
    permissive,
    roles,
    cmd,
    qual,
    with_check
FROM pg_policies 
WHERE tablename = 'profiles' AND schemaname = 'public';

-- Vérification des triggers sur auth.users
SELECT 
    tgname,
    tgrelid::regclass,
    tgfoid::regproc,
    tgtype,
    tgenabled,
    tgisinternal,
    tgconstrrelid::regclass,
    tgconstrindid,
    tgdeferrable,
    tginitdeferred
FROM pg_trigger 
WHERE tgrelid = 'auth.users'::regclass;

-- Vérification de la structure de la table profiles
SELECT 
    column_name,
    data_type,
    is_nullable,
    column_default
FROM information_schema.columns 
WHERE table_name = 'profiles' 
AND table_schema = 'public'
ORDER BY ordinal_position;
