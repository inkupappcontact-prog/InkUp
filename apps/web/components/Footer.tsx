'use client';

import React, { useState } from 'react';
import { Mail, MapPin, Facebook, Twitter, Instagram, Github } from 'lucide-react';
import { LEGAL_INFO } from '../../../constants/legal';
import LegalModal from './LegalModal';

type LegalType = 'cgu' | 'cgv' | 'privacy' | 'mentions' | null;

const linkStyle: React.CSSProperties = {
  color: '#4B5563',
  background: 'none',
  border: 'none',
  padding: 0,
  margin: 0,
  font: 'inherit',
  fontSize: '0.875rem',
  cursor: 'pointer',
  textAlign: 'left',
  display: 'inline',
  textTransform: 'none',
  letterSpacing: 'normal',
  boxShadow: 'none',
  textDecoration: 'none',
};

const LegalLink: React.FC<{ onClick: () => void; children: React.ReactNode }> = ({ onClick, children }) => (
  <button
    onClick={onClick}
    style={linkStyle}
    onMouseEnter={e => (e.currentTarget.style.color = '#2563EB')}
    onMouseLeave={e => (e.currentTarget.style.color = '#4B5563')}
  >
    {children}
  </button>
);

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const [legalModal, setLegalModal] = useState<LegalType>(null);

  const openModal = (type: LegalType) => setLegalModal(type);
  const closeModal = () => setLegalModal(null);

  const colTitleStyle: React.CSSProperties = {
    fontFamily: "'Bangers', cursive",
    fontSize: '1.1rem',
    letterSpacing: '0.05em',
    color: '#111111',
    marginBottom: '0.75rem',
    textTransform: 'uppercase',
  };

  const navLinkStyle: React.CSSProperties = {
    color: '#4B5563',
    fontSize: '0.875rem',
    textDecoration: 'none',
    display: 'block',
    lineHeight: '1.75rem',
  };

  return (
    <footer style={{ background: '#FFFFFF', borderTop: '4px solid #111111' }}>
      {/* Main grid */}
      <div style={{ maxWidth: '1152px', margin: '0 auto', padding: '3rem 1.5rem 2rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '2rem' }}>

          {/* Colonne 1 — Marque */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
              <div style={{ width: 36, height: 36, background: '#2563EB', borderRadius: 6, border: '2px solid #111', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ color: '#fff', fontWeight: 900, fontSize: '1rem' }}>I</span>
              </div>
              <span style={{ fontFamily: "'Bangers', cursive", fontSize: '1.5rem', color: '#111111', letterSpacing: '0.05em' }}>InkUp</span>
            </div>
            <p style={{ color: '#6B7280', fontSize: '0.85rem', lineHeight: '1.5', marginBottom: '1rem' }}>
              La plateforme qui reconnecte auteurs et lecteurs de bandes dessinées.
            </p>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              {[Facebook, Twitter, Instagram, Github].map((Icon, i) => (
                <a key={i} href="#" style={{ width: 34, height: 34, background: '#111', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', flexShrink: 0 }}
                  onMouseEnter={e => (e.currentTarget.style.background = '#2563EB')}
                  onMouseLeave={e => (e.currentTarget.style.background = '#111')}
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Colonne 2 — Découvrir */}
          <div>
            <p style={colTitleStyle}>Découvrir</p>
            {['Catalogue', 'Nouveautés', 'Meilleures ventes', 'Gratuit', 'Auteurs'].map(item => (
              <a key={item} href="#" style={navLinkStyle}
                onMouseEnter={e => (e.currentTarget.style.color = '#2563EB')}
                onMouseLeave={e => (e.currentTarget.style.color = '#4B5563')}
              >{item}</a>
            ))}
          </div>

          {/* Colonne 3 — Support */}
          <div>
            <p style={colTitleStyle}>Support</p>
            <a href="mailto:contact@inkup.com" style={navLinkStyle}
              onMouseEnter={e => (e.currentTarget.style.color = '#2563EB')}
              onMouseLeave={e => (e.currentTarget.style.color = '#4B5563')}
            >Contact</a>
            <a href="mailto:contact@inkup.com" style={navLinkStyle}
              onMouseEnter={e => (e.currentTarget.style.color = '#2563EB')}
              onMouseLeave={e => (e.currentTarget.style.color = '#4B5563')}
            >Signaler un problème</a>
          </div>

          {/* Colonne 4 — Légal */}
          <div>
            <p style={colTitleStyle}>Légal</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
              <LegalLink onClick={() => openModal('cgu')}>Conditions d'utilisation</LegalLink>
              <LegalLink onClick={() => openModal('cgv')}>Conditions de vente</LegalLink>
              <LegalLink onClick={() => openModal('privacy')}>Politique de confidentialité</LegalLink>
              <LegalLink onClick={() => openModal('mentions')}>Mentions légales</LegalLink>
            </div>
          </div>
        </div>

        {/* Séparateur + infos légales */}
        <div style={{ borderTop: '1px solid #D1D5DB', marginTop: '2.5rem', paddingTop: '2rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
          <div>
            <p style={{ fontWeight: 700, color: '#111', fontSize: '0.875rem', marginBottom: '0.5rem' }}>Informations légales</p>
            <p style={{ color: '#6B7280', fontSize: '0.8rem', lineHeight: '1.6' }}>
              <strong>Éditeur :</strong> {LEGAL_INFO.entrepreneur}, Entrepreneur individuel<br />
              <strong>SIREN :</strong> {LEGAL_INFO.siren}<br />
              <strong>TVA :</strong> {LEGAL_INFO.vat_mention}
            </p>
          </div>
          <div>
            <p style={{ fontWeight: 700, color: '#111', fontSize: '0.875rem', marginBottom: '0.5rem' }}>Contact</p>
            <a href="mailto:contact@inkup.com" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#6B7280', fontSize: '0.8rem', textDecoration: 'none', marginBottom: '0.3rem' }}
              onMouseEnter={e => (e.currentTarget.style.color = '#2563EB')}
              onMouseLeave={e => (e.currentTarget.style.color = '#6B7280')}
            >
              <Mail size={14} /> contact@inkup.com
            </a>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#6B7280', fontSize: '0.8rem' }}>
              <MapPin size={14} /> {LEGAL_INFO.address}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div style={{ borderTop: '1px solid #D1D5DB', marginTop: '2rem', paddingTop: '1.5rem', textAlign: 'center' }}>
          <p style={{ color: '#9CA3AF', fontSize: '0.8rem' }}>
            © {currentYear} InkUp. Tous droits réservés.{' '}
            <span style={{ margin: '0 0.4rem', color: '#D1D5DB' }}>|</span>
            <LegalLink onClick={() => openModal('mentions')}>Mentions légales</LegalLink>
            <span style={{ margin: '0 0.4rem', color: '#D1D5DB' }}>|</span>
            <LegalLink onClick={() => openModal('privacy')}>Confidentialité</LegalLink>
            <span style={{ margin: '0 0.4rem', color: '#D1D5DB' }}>|</span>
            <LegalLink onClick={() => openModal('cgu')}>CGU</LegalLink>
            <span style={{ margin: '0 0.4rem', color: '#D1D5DB' }}>|</span>
            <LegalLink onClick={() => openModal('cgv')}>CGV</LegalLink>
          </p>
          <p style={{ color: '#D1D5DB', fontSize: '0.75rem', marginTop: '0.5rem' }}>
            Made with ❤️ for comic book lovers
          </p>
        </div>
      </div>

      {legalModal && <LegalModal type={legalModal} onClose={closeModal} />}
    </footer>
  );
};

export default Footer;
