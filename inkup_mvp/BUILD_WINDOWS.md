# Build Windows – Erreur chemin trop long (MSB3491)

Sous Windows, les chemins sont limités à **260 caractères**. Le build du plugin `flutter_secure_storage_windows` dépasse cette limite avec un projet dans un dossier profond.

---

## Solution rapide : lecteur virtuel (sans déplacer le projet)

1. **Fermer** Cursor (ou VS Code).
2. Double-cliquer sur **`scripts\subst_for_windows_build.bat`** (à la racine du projet).
3. **Ouvrir** dans Cursor le dossier **`I:\`** (Fichier → Ouvrir un dossier → choisir le lecteur I:).
4. Lancer le **build Windows** (F5 ou Run → InkUp avec GOOGLE_CLIENT_ID).

Pour supprimer le lecteur virtuel plus tard : exécuter **`scripts\remove_subst.bat`**.

> Si le lecteur I: est déjà utilisé, modifier la variable `DRIVE` dans `scripts\subst_for_windows_build.bat` (par ex. `J:`).

---

## Solution alternative : activer les chemins longs (Windows 10/11)

1. **Clic droit** sur **`scripts\enable_long_paths.reg`** → **Fusionner** (exécuter en tant qu’administrateur si demandé).
2. **Redémarrer** l’ordinateur.
3. Relancer le build Windows depuis votre dossier actuel.

---

## Autre option : déplacer le projet

Copier tout le projet vers un chemin court (ex. **`C:\dev\inkup_mvp`**), puis ouvrir ce dossier dans Cursor et lancer le build Windows.

---

## À propos du warning CMake (Firebase)

Le message sur `cmake_minimum_required` vient du SDK Firebase C++. C’est un **avertissement** uniquement, pas l’erreur qui bloque le build. Il peut être ignoré.
