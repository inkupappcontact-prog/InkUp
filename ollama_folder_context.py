import os
import requests
import json

# --- CONFIGURATION ---
OLLAMA_API_URL = "http://localhost:11434/api/chat"
# Utilisation de r"" pour le chemin Windows
DOSSIER_CIBLE = r"C:\Users\bloui\Desktop\micro_entreprise\projets\projets app de service\app InkUp"
EXTENSIONS_AUTORISEES = [".dart", ".yaml", ".json", ".txt"]

# Initialisation de la mémoire (Historique de conversation)
historique = []

def lire_fichiers(dossier):
    fichiers = []
    for racine, _, noms_fichiers in os.walk(dossier):
        for nom_fichier in noms_fichiers:
            if any(nom_fichier.endswith(ext) for ext in EXTENSIONS_AUTORISEES):
                chemin_complet = os.path.join(racine, nom_fichier)
                try:
                    with open(chemin_complet, "r", encoding="utf-8") as f:
                        fichiers.append((nom_fichier, f.read()))
                except Exception as e:
                    print(f"Erreur lecture {nom_fichier}: {e}")
    return fichiers

def envoyer_a_ollama_stream(prompt, model_name, afficher_entete=True):
    global historique
    
    # Ajouter le message utilisateur à l'historique
    historique.append({"role": "user", "content": prompt})
    
    payload = {
        "model": model_name,
        "messages": historique,
        "stream": True 
    }
    
    try:
        response = requests.post(OLLAMA_API_URL, json=payload, stream=True)
        response.raise_for_status()
        
        full_response = ""
        if afficher_entete:
            print(f"\n--- Réponse de {model_name} ---\n")
        
        for line in response.iter_lines():
            if line:
                chunk = json.loads(line.decode('utf-8'))
                if "message" in chunk:
                    content = chunk["message"].get("content", "")
                    print(content, end="", flush=True)
                    full_response += content
                if chunk.get("done"):
                    break
        
        print("\n\n" + "-"*30)
        
        # Mémoriser la réponse de l'IA
        historique.append({"role": "assistant", "content": full_response})
        return full_response

    except Exception as e:
        print(f"\nErreur : {e}")
        return ""

# --- 1. CHARGEMENT ET ANALYSE INITIALE ---
print(f"Lecture des fichiers dans : {DOSSIER_CIBLE}...")
fichiers_lus = lire_fichiers(DOSSIER_CIBLE)
print(f"{len(fichiers_lus)} fichiers chargés.\n")

# Préparation du gros prompt technique avec le code
prompt_initial = "Voici mon projet Flutter InkUp. Analyse le code et l'UX :\n\n"
for nom, contenu in fichiers_lus:
    prompt_initial += f"FICHIER: {nom}\n{contenu}\n---\n"

prompt_initial += "\nFais une analyse technique rapide et propose des idées UX."

print("=== ANALYSE INITIALE EN COURS ===")
envoyer_a_ollama_stream(prompt_initial, "qwen2.5-coder:7b")

# --- 2. MODE CHAT INTERACTIF ---
print("\n[INFO] Mode Chat activé.")
print("[INFO] L'IA a ton code en mémoire. Tu peux lui demander des modifications ou de nouvelles fonctions.")
print("[INFO] Tape 'quitter' pour fermer le programme.\n")

while True:
    question = input("Ta question (ou 'quitter') > ")
    
    if question.lower() in ["quitter", "exit", "stop", "q"]:
        print("Fin de la session. Bon code !")
        break
    
    if question.strip() == "":
        continue

    # On utilise Qwen par défaut pour le chat car il est meilleur en code
    envoyer_a_ollama_stream(question, "qwen2.5-coder:7b", afficher_entete=False)