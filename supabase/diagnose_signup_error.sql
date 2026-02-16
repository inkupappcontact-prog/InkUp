-- Diagnostic de l'erreur 'DATABASE ERROR SAVING NEW USER'
-- Ce script vérifie les problèmes courants d'insertion

-- 1. Vérifier la structure de la table profiles
SELECT 
    'Table Structure' as check_type,
    column_name,
    data_type,
    is_nullable,
    column_default
FROM information_schema.columns 
WHERE table_name = 'profiles' 
AND table_schema = 'public'
ORDER BY ordinal_position;

-- 2. Vérifier les contraintes sur la table profiles
SELECT 
    'Constraints' as check_type,
    constraint_name,
    constraint_type,
    check_clause
FROM information_schema.table_constraints tc
LEFT JOIN information_schema.check_constraints cc ON tc.constraint_name = cc.constraint_name
WHERE tc.table_name = 'profiles' 
AND tc.table_schema = 'public';

-- 3. Vérifier les politiques RLS actives
SELECT 
    'RLS Policies' as check_type,
    policyname,
    permissive,
    roles,
    cmd,
    qual,
    with_check
FROM pg_policies 
WHERE tablename = 'profiles' 
AND schemaname = 'public';

-- 4. Vérifier si le trigger est correctement configuré
SELECT 
    'Trigger Info' as check_type,
    tgname,
    tgenabled,
    tgdeferrable,
    tginitdeferred,
    proname as function_name,
    prosrc as function_source
FROM pg_trigger t
JOIN pg_proc p ON t.tgfoid = p.oid
JOIN pg_class c ON c.oid = t.tgrelid
WHERE c.relname = 'users' 
AND c.relnamespace = (SELECT oid FROM pg_namespace WHERE nspname = 'auth')
AND t.tgname = 'on_auth_user_created';

-- 5. Vérifier les erreurs récentes dans les logs (si disponible)
SELECT 
    'Recent Errors' as check_type,
    current_timestamp as check_time,
    'Manual verification needed' as note;
