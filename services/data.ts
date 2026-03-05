import { createClient } from '@supabase/supabase-js';

// Types pour les données de l'application
export interface Comic {
  id: string;
  title: string;
  author: string;
  description?: string;
  cover_url: string;
  price: number;
  category: string;
  has_physical: boolean;
  physical_stock: number;
  physical_price?: number;
  is_mature: boolean;
  file_url?: string;
  author_id: string;
  created_at: string;
  updated_at: string;
}

export interface Purchase {
  id: string;
  user_id: string;
  comic_id: string;
  format: 'digital' | 'physical';
  price: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered';
  shipping_address?: any;
  tracking_number?: string;
  created_at: string;
  updated_at: string;
}

export interface UserProfile {
  id: string;
  user_id: string;
  first_name?: string;
  last_name?: string;
  bio?: string;
  phone?: string;
  address?: string;
  city?: string;
  postal_code?: string;
  country?: string;
  website?: string;
  social_links?: {
    twitter?: string;
    instagram?: string;
    facebook?: string;
  };
  avatar_url?: string;
  created_at: string;
  updated_at: string;
}

export interface AuthorStats {
  id: string;
  author_id: string;
  total_sales: number;
  total_revenue: number;
  total_readers: number;
  average_rating: number;
  comics_count: number;
  updated_at: string;
}

// Service pour les opérations sur les BD
export class ComicService {
  private supabase: any;

  constructor() {
    this.supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );
  }

  // Récupérer toutes les BD
  async getAllComics(): Promise<Comic[]> {
    const { data, error } = await this.supabase
      .from('comics')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  // Récupérer les BD par catégorie
  async getComicsByCategory(category: string): Promise<Comic[]> {
    const { data, error } = await this.supabase
      .from('comics')
      .select('*')
      .eq('category', category)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  // Récupérer les BD d'un auteur
  async getComicsByAuthor(authorId: string): Promise<Comic[]> {
    const { data, error } = await this.supabase
      .from('comics')
      .select('*')
      .eq('author_id', authorId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  // Créer une nouvelle BD
  async createComic(comic: Omit<Comic, 'id' | 'created_at' | 'updated_at'>): Promise<Comic> {
    const { data, error } = await this.supabase
      .from('comics')
      .insert(comic)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  // Mettre à jour une BD
  async updateComic(id: string, updates: Partial<Comic>): Promise<Comic> {
    const { data, error } = await this.supabase
      .from('comics')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  // Supprimer une BD
  async deleteComic(id: string): Promise<void> {
    const { error } = await this.supabase
      .from('comics')
      .delete()
      .eq('id', id);

    if (error) throw error;
  }
}

// Service pour les achats
export class PurchaseService {
  private supabase: any;

  constructor() {
    this.supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );
  }

  // Créer un achat
  async createPurchase(purchase: Omit<Purchase, 'id' | 'created_at' | 'updated_at'>): Promise<Purchase> {
    const { data, error } = await this.supabase
      .from('purchases')
      .insert(purchase)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  // Récupérer les achats d'un utilisateur
  async getUserPurchases(userId: string): Promise<Purchase[]> {
    const { data, error } = await this.supabase
      .from('purchases')
      .select(`
        *,
        comics:comic_id (
          id,
          title,
          author,
          cover_url,
          price,
          category
        )
      `)
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  }

  // Mettre à jour le statut d'un achat
  async updatePurchaseStatus(id: string, status: Purchase['status']): Promise<Purchase> {
    const { data, error } = await this.supabase
      .from('purchases')
      .update({ status })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  // Récupérer les commandes pour les auteurs
  async getAuthorOrders(authorId: string): Promise<Purchase[]> {
    const { data, error } = await this.supabase
      .from('purchases')
      .select(`
        *,
        comics:comic_id (
          id,
          title,
          author,
          price
        ),
        auth:user_id (
          email
        )
      `)
      .eq('comics.author_id', authorId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  }
}

// Service pour les profils utilisateurs
export class UserProfileService {
  private supabase: any;

  constructor() {
    this.supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );
  }

  // Récupérer le profil d'un utilisateur
  async getUserProfile(userId: string): Promise<UserProfile | null> {
    const { data, error } = await this.supabase
      .from('user_profiles')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (error && error.code !== 'PGRST116') throw error;
    return data;
  }

  // Créer ou mettre à jour le profil d'un utilisateur
  async upsertUserProfile(profile: Omit<UserProfile, 'id' | 'created_at' | 'updated_at'>): Promise<UserProfile> {
    const { data, error } = await this.supabase
      .from('user_profiles')
      .upsert(profile)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  // Mettre à jour le profil
  async updateUserProfile(userId: string, updates: Partial<UserProfile>): Promise<UserProfile> {
    const { data, error } = await this.supabase
      .from('user_profiles')
      .update(updates)
      .eq('user_id', userId)
      .select()
      .single();

    if (error) throw error;
    return data;
  }
}

// Singleton services
export const comicService = new ComicService();
export const purchaseService = new PurchaseService();
export const userProfileService = new UserProfileService();
