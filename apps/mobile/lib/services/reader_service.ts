import { createClient } from '@supabase/supabase-js';
import { Database, Profile, Work, Purchase } from '@shared/types';

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient<Database>(supabaseUrl, supabaseKey);

export const readerService = {
  async getWorks(): Promise<{ data: Work[] | null; error: any }> {
    const { data, error } = await supabase
      .from('works')
      .select('*');
    return { data, error };
  },

  async getWorkById(id: string): Promise<{ data: Work | null; error: any }> {
    const { data, error } = await supabase
      .from('works')
      .select('*')
      .eq('id', id)
      .single();
    return { data, error };
  },

  async checkPurchase(workId: string, userId: string): Promise<{ data: Purchase | null; error: any }> {
    const { data, error } = await supabase
      .from('purchases')
      .select('*')
      .eq('work_id', workId)
      .eq('user_id', userId)
      .single();
    return { data, error };
  },

  async getWorkPages(workId: string): Promise<{ data: string[] | null; error: any }> {
    const { data: work } = await supabase
      .from('works')
      .select('pages_urls')
      .eq('id', workId)
      .single();

    if (!work?.pages_urls) {
      return { data: null, error: new Error('No pages found') };
    }

    const pages: string[] = [];
    for (const url of work.pages_urls) {
      const { data } = supabase.storage
        .from('works')
        .getPublicUrl(url);
      pages.push(data.publicUrl);
    }
    return { data: pages, error: null };
  }
};
