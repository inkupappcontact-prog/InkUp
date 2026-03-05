-- Test de création d'utilisateur pour diagnostiquer les problèmes de login
-- Ce script permet de créer un utilisateur de test et de vérifier la connexion

-- Étape 1: Créer un utilisateur de test manuellement
-- NOTE: En production, utilisez l'interface Supabase Auth

-- Étape 2: Vérifier que l'utilisateur a bien été créé avec les bonnes métadonnées
SELECT 
    'Test User Verification' as test_name,
    id,
    email,
    raw_user_meta_data,
    created_at,
    last_sign_in_at
FROM auth.users 
WHERE email = 'test@inkup.com'  -- Remplacer par l'email de test
ORDER BY created_at DESC
LIMIT 1;

-- Étape 3: Vérifier que le profile a été créé automatiquement
SELECT 
    'Profile Verification' as test_name,
    p.id,
    p.role,
    p.artist_name,
    p.created_at,
    u.email
FROM public.profiles p
JOIN auth.users u ON p.id = u.id
WHERE u.email = 'test@inkup.com'  -- Remplacer par l'email de test
LIMIT 1;

-- Étape 4: Vérifier les politiques RLS sur les tables
SELECT 
    'RLS Status' as test_name,
    schemaname,
    tablename,
    rowsecurity,
    forcerlspolicy
FROM pg_tables 
WHERE tablename IN ('users', 'profiles') 
AND schemaname IN ('auth', 'public');

-- Étape 5: Test de la fonction handle_new_user
SELECT 
    'Trigger Function' as test_name,
    proname,
    prosrc,
    prolang,
    prorettype::regtype
FROM pg_proc 
WHERE proname = 'handle_new_user';

-- Étape 6: Vérifier que le trigger est actif
SELECT 
    'Trigger Status' as test_name,
    tgname,
    tgenabled,
    tgdeferrable,
    tginitdeferred,
    tgrelid::regclass as table_name
FROM pg_trigger 
WHERE tgname = 'on_auth_user_created'
AND tgrelid = 'auth.users'::regclass;
