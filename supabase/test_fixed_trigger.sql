-- Test du trigger corrigé avec les métadonnées
-- Ce script simule l'insertion pour vérifier que tout fonctionne

-- Test 1: Vérifier que le trigger est bien configuré
SELECT 
    'Trigger Status' as test_name,
    tgname,
    tgenabled,
    proname as function_name
FROM pg_trigger t
JOIN pg_proc p ON t.tgfoid = p.oid
JOIN pg_class c ON c.oid = t.tgrelid
WHERE c.relname = 'users' 
AND c.relnamespace = (SELECT oid FROM pg_namespace WHERE nspname = 'auth')
AND t.tgname = 'on_auth_user_created';

-- Test 2: Vérifier la structure de la table profiles
SELECT 
    'Profiles Table Structure' as test_name,
    column_name,
    data_type,
    is_nullable
FROM information_schema.columns 
WHERE table_name = 'profiles' 
AND table_schema = 'public'
ORDER BY ordinal_position;

-- Test 3: Vérifier les politiques RLS
SELECT 
    'RLS Policies' as test_name,
    policyname,
    permissive,
    cmd,
    with_check
FROM pg_policies 
WHERE tablename = 'profiles' 
AND schemaname = 'public';

-- Test 4: Simuler l'insertion avec des métadonnées (test manuel)
-- NOTE: Ceci est un exemple de ce que le trigger devrait traiter
SELECT 
    'Expected Metadata Structure' as test_name,
    json_build_object(
        'full_name', 'testuser',
        'role', 'author',
        'artist_name', 'Test Artist'
    ) as example_metadata;

-- Test 5: Vérifier si la fonction handle_new_user existe et est correcte
SELECT 
    'Function Check' as test_name,
    proname,
    prosrc,
    prolang
FROM pg_proc 
WHERE proname = 'handle_new_user';
