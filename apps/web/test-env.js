// Test des variables d'environnement
console.log('=== Test des variables d\'environnement ===');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

console.log('NEXT_PUBLIC_SUPABASE_URL:', supabaseUrl ? 'Définie' : 'NON DÉFINIE');
console.log('NEXT_PUBLIC_SUPABASE_ANON_KEY:', supabaseAnonKey ? 'Définie' : 'NON DÉFINIE');

if (supabaseUrl) {
  console.log('URL Supabase:', supabaseUrl);
}

if (supabaseAnonKey) {
  console.log('Clé Supabase (premiers caractères):', supabaseAnonKey.substring(0, 10) + '...');
}

if (!supabaseUrl || !supabaseAnonKey) {
  console.log('\n❌ ERREUR: Variables d\'environnement manquantes!');
  console.log('\n📋 Solution:');
  console.log('1. Crée un fichier .env.local dans apps/web/');
  console.log('2. Ajoute ces lignes:');
  console.log('   NEXT_PUBLIC_SUPABASE_URL=votre_url_supabase');
  console.log('   NEXT_PUBLIC_SUPABASE_ANON_KEY=votre_cle_supabase');
  console.log('3. Redémarre le serveur');
} else {
  console.log('\n✅ Variables d\'environnement OK');
}
