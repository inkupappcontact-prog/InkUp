import React, { useState } from 'react';
import LoginScreen_BD from './LoginScreen_BD';
import Dashboard from './Dashboard_BD';
import LandingPage from './LandingPage_BD';
import Reader from './Reader_BD';

const App: React.FC = () => {
  // Gestion de l'état de l'application
  const [view, setView] = useState<'landing' | 'login' | 'dashboard' | 'reader'>('landing');
  
  // État utilisateur connecté
  const [user, setUser] = useState<{ email: string; role: 'reader' | 'author'; balance: number; plan: 'free' | 'premium' } | null>(null);
  
  // Livre en cours de lecture
  const [currentBook, setCurrentBook] = useState<{ title: string; pages: string[] } | null>(null);

  const handleLogin = (email: string, role: 'reader' | 'author') => {
    setUser({
      email,
      role,
      balance: 150, // Solde initial simulé
      plan: 'free', // Par défaut en plan gratuit pour la démo
    });
    setView('dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    setView('landing');
  };

  const openReader = (title: string) => {
      // Simulation de pages pour la démo
      setCurrentBook({
          title,
          pages: [
              'https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?auto=format&fit=crop&q=80&w=800',
              'https://images.unsplash.com/photo-1541963463532-d68292c34b19?auto=format&fit=crop&q=80&w=800',
              'https://images.unsplash.com/photo-1543004218-ee141104e14a?auto=format&fit=crop&q=80&w=800'
          ]
      });
      setView('reader');
  };

  if (view === 'reader' && currentBook) {
      return <Reader title={currentBook.title} pages={currentBook.pages} onClose={() => setView('dashboard')} />;
  }

  // Rendu conditionnel des vues
  if (user && view === 'dashboard') {
     return <Dashboard user={user} onLogout={handleLogout} onRead={openReader} />;
  }

  if (view === 'login') {
     return <LoginScreen_BD onLogin={handleLogin} onBack={() => setView('landing')} />;
  }

  // Par défaut : Landing Page
  return <LandingPage onStart={() => setView('login')} />;
};

export default App;
