/**
 * Page du lecteur de BD pour InkUp.
 * Affiche le composant Reader pour naviguer dans une BD.
 * Choix technique : Page Next.js utilisant un composant partagé pour la réutilisabilité.
 */

import Reader from '@/shared/components/Reader';

export default function ReaderPage() {
  return <Reader />;
}
