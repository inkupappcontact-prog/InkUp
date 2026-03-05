import { createClient } from '@supabase/supabase-js';

// Configuration pour l'email de bienvenue
export const EMAIL_CONFIG = {
  from: 'contact@inkup.com', // Adresse professionnelle configurée
  fromName: 'InkUp - La plateforme BD',
  replyTo: 'support@inkup.com',
};

// Service d'envoi d'emails de bienvenue
export class WelcomeEmailService {
  private supabase: any;

  constructor() {
    this.supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY! // Clé service pour les emails
    );
  }

  /**
   * Envoyer l'email de bienvenue après l'inscription
   */
  async sendWelcomeEmail(userEmail: string, userName: string, userRole: string, artistName?: string) {
    try {
      // Utiliser le service d'email de Supabase
      const { data, error } = await this.supabase.auth.admin.invokeEmailAction({
        type: 'signup',
        email: userEmail,
        options: {
          data: {
            user_name: userName,
            user_role: userRole,
            artist_name: artistName,
          },
        },
      });

      if (error) {
        console.error('Erreur envoi email bienvenue:', error);
        return { success: false, error: error.message };
      }

      return { success: true, data };
    } catch (error) {
      console.error('Erreur service email bienvenue:', error);
      return { success: false, error: 'Erreur interne' };
    }
  }

  /**
   * Traiter la queue d'emails en attente
   */
  async processEmailQueue() {
    try {
      // Récupérer les emails non traités
      const { data: pendingEmails, error } = await this.supabase
        .from('email_queue')
        .select('*')
        .eq('processed', false)
        .order('created_at', { ascending: true })
        .limit(10);

      if (error) {
        console.error('Erreur récupération queue emails:', error);
        return;
      }

      // Traiter chaque email
      for (const email of pendingEmails || []) {
        const result = await this.sendWelcomeEmail(
          email.user_email,
          email.user_name,
          email.user_role,
          email.artist_name
        );

        // Marquer comme traité
        await this.supabase
          .from('email_queue')
          .update({
            processed: true,
            processed_at: new Date().toISOString(),
            error_message: result.success ? null : result.error,
          })
          .eq('id', email.id);
      }
    } catch (error) {
      console.error('Erreur traitement queue emails:', error);
    }
  }
}

// Singleton pour le service
export const welcomeEmailService = new WelcomeEmailService();
