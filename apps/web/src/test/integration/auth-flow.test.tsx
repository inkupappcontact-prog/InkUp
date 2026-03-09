import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useRouter } from 'next/navigation';
import HomePage from '@/app/page';
import { supabase } from '@/lib/supabase';

// Mock dependencies
vi.mock('next/navigation', () => ({
  useRouter: vi.fn(),
}));

vi.mock('@/lib/supabase', () => ({
  supabase: {
    auth: {
      getUser: vi.fn(),
      signOut: vi.fn(),
    },
  },
}));

describe('HomePage - Integration: Auth Flow', () => {
  const mockPush = vi.fn();
  const mockRefresh = vi.fn();

  beforeEach(() => {
    vi.mocked(useRouter).mockReturnValue({
      push: mockPush,
      refresh: mockRefresh,
      replace: vi.fn(),
      back: vi.fn(),
      forward: vi.fn(),
      prefetch: vi.fn(),
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('Authentication States', () => {
    it('should show landing page when user is not authenticated', async () => {
      vi.mocked(supabase.auth.getUser).mockResolvedValueOnce({
        data: { user: null },
        error: null,
      });

      render(<HomePage />);

      await waitFor(() => {
        expect(screen.getByText(/inkup/i)).toBeInTheDocument();
      });
    });

    it('should show dashboard for authenticated reader', async () => {
      vi.mocked(supabase.auth.getUser).mockResolvedValueOnce({
        data: {
          user: {
            id: '123',
            email: 'reader@example.com',
            user_metadata: { role: 'reader' },
          },
        },
        error: null,
      });

      render(<HomePage />);

      await waitFor(() => {
        expect(screen.getByText(/ma bibliothèque/i)).toBeInTheDocument();
      });
    });

    it('should show dashboard for authenticated author', async () => {
      vi.mocked(supabase.auth.getUser).mockResolvedValueOnce({
        data: {
          user: {
            id: '123',
            email: 'author@example.com',
            user_metadata: { role: 'author', artist_name: 'Test Artist' },
          },
        },
        error: null,
      });

      render(<HomePage />);

      await waitFor(() => {
        expect(screen.getByText(/nouveau projet/i)).toBeInTheDocument();
      });
    });
  });

  describe('Logout Flow', () => {
    it('should handle logout correctly', async () => {
      vi.mocked(supabase.auth.getUser).mockResolvedValueOnce({
        data: {
          user: {
            id: '123',
            email: 'user@example.com',
            user_metadata: { role: 'reader' },
          },
        },
        error: null,
      });

      vi.mocked(supabase.auth.signOut).mockResolvedValueOnce({ error: null });

      render(<HomePage />);

      await waitFor(() => {
        expect(screen.getByText(/ma bibliothèque/i)).toBeInTheDocument();
      });

      const logoutButton = screen.getByRole('button', { name: /déconnexion/i });
      await userEvent.click(logoutButton);

      await waitFor(() => {
        expect(supabase.auth.signOut).toHaveBeenCalled();
      });
    });
  });

  describe('Error Handling', () => {
    it('should handle auth error gracefully', async () => {
      vi.mocked(supabase.auth.getUser).mockRejectedValueOnce(
        new Error('Network error')
      );

      render(<HomePage />);

      await waitFor(() => {
        // Should show landing page as fallback
        expect(screen.getByText(/inkup/i)).toBeInTheDocument();
      });
    });
  });
});
