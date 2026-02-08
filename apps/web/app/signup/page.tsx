'use client';

import { useEffect } from 'react';
import LoginScreen from '@/components/LoginScreen';

export default function SignupPage() {
  useEffect(() => {
    // Forcer le mode inscription sur le LoginScreen
    const loginScreen = document.querySelector('[data-login-screen]');
    if (loginScreen) {
      // Le composant gérera le mode inscription via son état interne
      console.log('Mode inscription activé');
    }
  }, []);

  return <LoginScreen initialMode="signup" />;
}