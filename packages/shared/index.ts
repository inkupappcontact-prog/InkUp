export type Profile = {
  id: string;
  role: 'reader' | 'author';
  balance: number;
  user_type?: 'reader' | 'author'; // Legacy compatibility
  artist_name?: string | null; // For authors
  created_at: string;
  updated_at: string;
};

export type Work = {
  id: string;
  author_id: string;
  title: string | null;
  pages_urls: string[];
  description?: string | null;
  price?: number;
  published?: boolean;
  created_at: string;
  updated_at: string;
};

export type Purchase = {
  id: string;
  user_id: string;
  work_id: string;
  amount: number;
  status: 'pending' | 'completed' | 'failed';
  created_at: string;
  updated_at?: string;
};

export type AuthUser = {
  id: string;
  email?: string;
  user_metadata?: Record<string, any> & {
    full_name?: string;
    role?: 'reader' | 'author';
    artist_name?: string;
  };
};

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: Profile;
        Insert: Omit<Profile, 'id' | 'created_at' | 'updated_at'> & { id?: string };
        Update: Partial<Omit<Profile, 'id' | 'created_at' | 'updated_at'>>;
      };
      works: {
        Row: Work;
        Insert: Omit<Work, 'id' | 'created_at' | 'updated_at'> & { id?: string };
        Update: Partial<Omit<Work, 'id' | 'created_at' | 'updated_at'>>;
      };
      purchases: {
        Row: Purchase;
        Insert: Omit<Purchase, 'id' | 'created_at'> & { id?: string };
        Update: Partial<Omit<Purchase, 'id' | 'created_at'>>;
      };
    };
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};
