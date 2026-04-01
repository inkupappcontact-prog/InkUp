/* eslint-disable @typescript-eslint/no-require-imports */
// Test simple pour vérifier la connexion Supabase
// Usage: SUPABASE_URL=... SUPABASE_KEY=... node test-supabase.js
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Variables manquantes: SUPABASE_URL et SUPABASE_KEY requis');
  console.error('   Exemple: SUPABASE_URL=https://xxx.supabase.co SUPABASE_KEY=xxx node test-supabase.js');
  process.exit(1);
}

console.log('🔍 Test connexion Supabase...');
console.log('URL:', supabaseUrl);
console.log('Key length:', supabaseKey.length);

const supabase = createClient(supabaseUrl, supabaseKey);

// Test simple
supabase.auth
  .getSession()
  .then((result) => {
    console.log('✅ getSession réussi:', result);
  })
  .catch((error) => {
    console.error('❌ Erreur getSession:', error);
  });

// Test d'inscription simple
supabase.auth
  .signUp({
    email: 'test@example.com',
    password: 'test123456',
    options: {
      data: {
        full_name: 'Test User',
        role: 'reader',
      },
    },
  })
  .then((result) => {
    console.log('✅ signUp résultat:', result);
  })
  .catch((error) => {
    console.error('❌ Erreur signUp:', error);
  });
