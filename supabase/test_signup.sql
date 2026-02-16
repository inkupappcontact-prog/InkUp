-- Test d'insertion d'utilisateur pour vérifier les politiques RLS
-- Ce script simule l'insertion lors du signup

-- Test 1: Vérifier si le trigger fonctionne correctement
-- Simuler l'insertion dans auth.users (ceci est juste pour le test)
-- En réalité, Supabase gère cette insertion automatiquement

-- Test 2: Vérifier la structure des métadonnées attendues
SELECT 
    'Test metadata structure' as test_name,
    json_build_object(
        'full_name', 'testuser',
        'role', 'author',
        'artist_name', 'Test Artist'
    ) as expected_metadata;

-- Test 3: Vérifier si les politiques RLS permettent l'insertion
SELECT 
    'RLS Policies Check' as test_name,
    count(*) as policy_count
FROM pg_policies 
WHERE tablename = 'profiles' 
AND schemaname = 'public';

-- Test 4: Vérifier si la table profiles a les bonnes colonnes
SELECT 
    column_name,
    data_type,
    is_nullable,
    column_default
FROM information_schema.columns 
WHERE table_name = 'profiles' 
AND table_schema = 'public'
ORDER BY ordinal_position;

-- Test 5: Vérifier si le trigger handle_new_user existe et est correct
SELECT 
    'Trigger Check' as test_name,
    proname as function_name,
    prosrc as function_source
FROM pg_proc p
JOIN pg_trigger t ON t.tgfoid = p.oid
JOIN pg_class c ON c.oid = t.tgrelid
WHERE c.relname = 'users' 
AND c.relnamespace = (SELECT oid FROM pg_namespace WHERE nspname = 'auth')
AND t.tgname = 'on_auth_user_created';
