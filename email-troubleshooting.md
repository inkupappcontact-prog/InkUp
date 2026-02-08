# Problème Email de Confirmation Supabase

## 🔍 **Diagnostic :**

Le problème d'email de confirmation peut venir de plusieurs sources :

### **1. Configuration Supabase Email**
- Allez dans votre dashboard Supabase : https://nuiddjsqqxmkeanxzsfa.supabase.co
- Section **Authentication > Email**
- Vérifiez que les emails sont activés

### **2. Templates Email**
- Vérifiez les templates "Confirm signup" et "Magic Link"
- Assurez-vous qu'ils contiennent le lien de confirmation

### **3. Configuration SMTP**
Pour le développement, Supabase utilise un service email par défaut
- **Rate limiting** : Peut limiter les envois
- **Spam filters** : Peuvent bloquer les emails

## 🛠️ **Solutions :**

### **Solution 1 : Désactiver la confirmation email (développement)**
```typescript
// Dans supabase > Authentication > Settings
// Désactivez "Enable email confirmations"
```

### **Solution 2 : Vérifier les logs Supabase**
```bash
# Vérifier les logs d'envoi d'emails
curl "https://nuiddjsqqxmkeanxzsfa.supabase.co/rest/v1/rpc/get_logs" \
  -H "Authorization: Bearer sb_publishable_VtiTX27Sl-QjYmjbCr6buQ_q_mR8fbE"
```

### **Solution 3 : Utiliser un email de test**
Essayez avec :
- Gmail
- Outlook  
- ProtonMail

### **Solution 4 : Vérifier dossier spam/indésirables**

## 🚀 **Action Immédiate :**

1. **Allez sur votre dashboard Supabase**
2. **Section Authentication > Settings**
3. **Désactivez "Enable email confirmations"** pour le développement
4. **Testez l'inscription**

Une fois désactivé, les utilisateurs pourront s'inscrire sans email de confirmation !
