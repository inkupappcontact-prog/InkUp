// Test simple pour vérifier la connexion Supabase
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://nuiddjsqqxmkeanxzsfa.supabase.co';
const supabaseKey = 'sb_publishable_VtiTX27Sl-QjYmjbCr6buQ_q_mR8fbE';

console.log('🔍 Test connexion Supabase...');
console.log('URL:', supabaseUrl);
console.log('Key length:', supabaseKey.length);

const supabase = createClient(supabaseUrl, supabaseKey);

// Test simple
supabase.auth.getSession()
  .then(result => {
    console.log('✅ getSession réussi:', result);
  })
  .catch(error => {
    console.error('❌ Erreur getSession:', error);
  });

// Test d'inscription simple
supabase.auth.signUp({
  email: 'test@example.com',
  password: 'test123456',
  options: {
    data: {
      full_name: 'Test User',
      role: 'reader'
    }
  }
})
  .then(result => {
    console.log('✅ signUp résultat:', result);
  })
  .catch(error => {
    console.error('❌ Erreur signUp:', error);
  });
