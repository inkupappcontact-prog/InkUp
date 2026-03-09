import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LoginScreen from '@/components/LoginScreen';
import { supabase } from '@/lib/supabase';

describe('LoginScreen - Critical Path: Authentication', () => {
  const mockPush = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Form Validation', () => {
    it('should display error when email is empty', async () => {
      render(<LoginScreen />);
      
      const submitButton = screen.getByRole('button', { name: /entrer dans la case/i });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText(/manquant/i)).toBeInTheDocument();
      });
    });

    it('should display error when password is empty', async () => {
      render(<LoginScreen />);
      
      const emailInput = screen.getByLabelText(/email/i);
      await userEvent.type(emailInput, 'test@example.com');
      
      const submitButton = screen.getByRole('button', { name: /entrer dans la case/i });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText(/secret/i)).toBeInTheDocument();
      });
    });

    it('should require artist name for author signup', async () => {
      render(<LoginScreen initialMode="signup" />);
      
      // Switch to author type
      const authorRadio = screen.getByLabelText(/auteur/i);
      fireEvent.click(authorRadio);

      const emailInput = screen.getByLabelText(/email/i);
      const passwordInput = screen.getByLabelText(/mot de passe/i);
      
      await userEvent.type(emailInput, 'author@example.com');
      await userEvent.type(passwordInput, 'password123');

      const submitButton = screen.getByRole('button', { name: /signer le contrat/i });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText(/c'est votre signature/i)).toBeInTheDocument();
      });
    });
  });

  describe('Login Flow', () => {
    it('should call signInWithPassword with correct credentials', async () => {
      const mockSignIn = vi.mocked(supabase.auth.signInWithPassword);
      mockSignIn.mockResolvedValueOnce({
        data: { user: { id: '123', email: 'test@example.com', user_metadata: { role: 'reader' } } },
        error: null,
      });

      render(<LoginScreen />);

      const emailInput = screen.getByLabelText(/email/i);
      const passwordInput = screen.getByLabelText(/mot de passe/i);
      
      await userEvent.type(emailInput, 'test@example.com');
      await userEvent.type(passwordInput, 'password123');

      const submitButton = screen.getByRole('button', { name: /entrer dans la case/i });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(mockSignIn).toHaveBeenCalledWith({
          email: 'test@example.com',
          password: 'password123',
        });
      });
    });

    it('should handle login error gracefully', async () => {
      const mockSignIn = vi.mocked(supabase.auth.signInWithPassword);
      mockSignIn.mockResolvedValueOnce({
        data: { user: null },
        error: { message: 'Invalid login credentials' },
      });

      render(<LoginScreen />);

      const emailInput = screen.getByLabelText(/email/i);
      const passwordInput = screen.getByLabelText(/mot de passe/i);
      
      await userEvent.type(emailInput, 'test@example.com');
      await userEvent.type(passwordInput, 'wrongpassword');

      const submitButton = screen.getByRole('button', { name: /entrer dans la case/i });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText(/email ou mot de passe incorrect/i)).toBeInTheDocument();
      });
    });
  });

  describe('Signup Flow', () => {
    it('should create user account successfully', async () => {
      const mockSignUp = vi.mocked(supabase.auth.signUp);
      mockSignUp.mockResolvedValueOnce({
        data: { 
          user: { 
            id: '123', 
            email: 'new@example.com',
            user_metadata: { role: 'reader' }
          } 
        },
        error: null,
      });

      render(<LoginScreen initialMode="signup" />);

      const emailInput = screen.getByLabelText(/email/i);
      const passwordInput = screen.getByLabelText(/mot de passe/i);
      
      await userEvent.type(emailInput, 'new@example.com');
      await userEvent.type(passwordInput, 'password123');

      const submitButton = screen.getByRole('button', { name: /signer le contrat/i });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(mockSignUp).toHaveBeenCalled();
      });
    });

    it('should handle user already exists error', async () => {
      const mockSignUp = vi.mocked(supabase.auth.signUp);
      mockSignUp.mockResolvedValueOnce({
        data: { user: null },
        error: { message: 'User already registered' },
      });

      render(<LoginScreen initialMode="signup" />);

      const emailInput = screen.getByLabelText(/email/i);
      const passwordInput = screen.getByLabelText(/mot de passe/i);
      
      await userEvent.type(emailInput, 'existing@example.com');
      await userEvent.type(passwordInput, 'password123');

      const submitButton = screen.getByRole('button', { name: /signer le contrat/i });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText(/cet email est déjà utilisé/i)).toBeInTheDocument();
      });
    });
  });

  describe('Role-based Redirects', () => {
    it('should redirect reader to home after login', async () => {
      const mockSignIn = vi.mocked(supabase.auth.signInWithPassword);
      mockSignIn.mockResolvedValueOnce({
        data: { 
          user: { 
            id: '123', 
            email: 'reader@example.com',
            user_metadata: { role: 'reader' }
          } 
        },
        error: null,
      });

      render(<LoginScreen />);

      const emailInput = screen.getByLabelText(/email/i);
      const passwordInput = screen.getByLabelText(/mot de passe/i);
      
      await userEvent.type(emailInput, 'reader@example.com');
      await userEvent.type(passwordInput, 'password123');

      const submitButton = screen.getByRole('button', { name: /entrer dans la case/i });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(mockPush).toHaveBeenCalledWith('/');
      });
    });

    it('should redirect author to dashboard after login', async () => {
      const mockSignIn = vi.mocked(supabase.auth.signInWithPassword);
      mockSignIn.mockResolvedValueOnce({
        data: { 
          user: { 
            id: '123', 
            email: 'author@example.com',
            user_metadata: { role: 'author' }
          } 
        },
        error: null,
      });

      render(<LoginScreen />);

      const emailInput = screen.getByLabelText(/email/i);
      const passwordInput = screen.getByLabelText(/mot de passe/i);
      
      await userEvent.type(emailInput, 'author@example.com');
      await userEvent.type(passwordInput, 'password123');

      const submitButton = screen.getByRole('button', { name: /entrer dans la case/i });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(mockPush).toHaveBeenCalledWith('/dashboard');
      });
    });
  });
});
