-- Diagnostic de l'erreur "Invalid login credentials"
-- Ce script vérifie les problèmes courants de connexion

-- 1. Vérifier si l'utilisateur existe dans auth.users
SELECT 
    'User Check' as check_type,
    count(*) as user_count,
    array_agg(email) as existing_emails
FROM auth.users 
WHERE email IN (
    -- Ajouter ici les emails à tester
    'test@example.com',
    'user@test.com'
);

-- 2. Vérifier la structure de la table auth.users
SELECT 
    'Auth Users Structure' as check_type,
    column_name,
    data_type,
    is_nullable
FROM information_schema.columns 
WHERE table_name = 'users' 
AND table_schema = 'auth'
ORDER BY ordinal_position;

-- 3. Vérifier les politiques RLS sur auth.users
SELECT 
    'Auth RLS Policies' as check_type,
    policyname,
    permissive,
    roles,
    cmd,
    qual
FROM pg_policies 
WHERE tablename = 'users' 
AND schemaname = 'auth';

-- 4. Vérifier si les profils existent pour les utilisateurs
SELECT 
    'Profiles Check' as check_type,
    u.email,
    u.created_at as user_created,
    p.role,
    p.artist_name,
    p.created_at as profile_created
FROM auth.users u
LEFT JOIN public.profiles p ON u.id = p.id
WHERE u.email IN (
    'test@example.com',
    'user@test.com'
);

-- 5. Vérifier les métadonnées des utilisateurs
SELECT 
    'User Metadata' as check_type,
    email,
    raw_user_meta_data,
    created_at
FROM auth.users 
WHERE email IN (
    'test@example.com',
    'user@test.com'
);

-- 6. Vérifier les erreurs récentes (logs système si disponibles)
SELECT 
    'System Check' as check_type,
    current_timestamp as check_time,
    'Manual verification needed for login issues' as note;
