import React from 'react';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Github } from 'lucide-react';
import ComicButton from './ui/ComicButton';
import { LEGAL_INFO } from '../../../constants/legal';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t-4 border-black">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo et description */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#2563EB] rounded-lg flex items-center justify-center border-2 border-black">
                <span className="text-white font-bold text-xl">I</span>
              </div>
              <span className="font-['Bangers'] text-2xl">InkUp</span>
            </div>
            <p className="text-gray-600 font-['Comic Neue']">
              La plateforme qui reconnecte auteurs et lecteurs de bandes dessinées.
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-10 h-10 bg-black text-white rounded-lg flex items-center justify-center hover:bg-[#2563EB] transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-black text-white rounded-lg flex items-center justify-center hover:bg-[#2563EB] transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-black text-white rounded-lg flex items-center justify-center hover:bg-[#2563EB] transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-black text-white rounded-lg flex items-center justify-center hover:bg-[#2563EB] transition-colors">
                <Github className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Liens rapides */}
          <div className="space-y-4">
            <h3 className="font-['Bangers'] text-xl">Découvrir</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 hover:text-[#2563EB] transition-colors">Catalogue</a></li>
              <li><a href="#" className="text-gray-600 hover:text-[#2563EB] transition-colors">Nouveautés</a></li>
              <li><a href="#" className="text-gray-600 hover:text-[#2563EB] transition-colors">Meilleures ventes</a></li>
              <li><a href="#" className="text-gray-600 hover:text-[#2563EB] transition-colors">Gratuit</a></li>
              <li><a href="#" className="text-gray-600 hover:text-[#2563EB] transition-colors">Auteurs</a></li>
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h3 className="font-['Bangers'] text-xl">Support</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 hover:text-[#2563EB] transition-colors">Aide</a></li>
              <li><a href="#" className="text-gray-600 hover:text-[#2563EB] transition-colors">Contact</a></li>
              <li><a href="#" className="text-gray-600 hover:text-[#2563EB] transition-colors">FAQ</a></li>
              <li><a href="#" className="text-gray-600 hover:text-[#2563EB] transition-colors">Signaler un problème</a></li>
              <li><a href="#" className="text-gray-600 hover:text-[#2563EB] transition-colors">Statut du service</a></li>
            </ul>
          </div>

          {/* Légal */}
          <div className="space-y-4">
            <h3 className="font-['Bangers'] text-xl">Légal</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 hover:text-[#2563EB] transition-colors">CGU/CGV</a></li>
              <li><a href="#" className="text-gray-600 hover:text-[#2563EB] transition-colors">Politique de confidentialité</a></li>
              <li><a href="#" className="text-gray-600 hover:text-[#2563EB] transition-colors">Mentions légales</a></li>
              <li><a href="#" className="text-gray-600 hover:text-[#2563EB] transition-colors">Cookies</a></li>
              <li><a href="#" className="text-gray-600 hover:text-[#2563EB] transition-colors">Licences</a></li>
            </ul>
          </div>
        </div>

        {/* Barre de séparation */}
        <div className="border-t-2 border-black mt-8 pt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Mentions légales */}
            <div className="space-y-2">
              <h4 className="font-bold">Informations légales</h4>
              <div className="text-sm text-gray-600 space-y-1">
                <p><strong>Éditeur :</strong> {LEGAL_INFO.entrepreneur}, Entrepreneur individuel</p>
                <p><strong>SIREN :</strong> {LEGAL_INFO.siren}</p>
                <p><strong>TVA :</strong> {LEGAL_INFO.vat_mention}</p>
              </div>
            </div>

            {/* Contact */}
            <div className="space-y-2">
              <h4 className="font-bold">Contact</h4>
              <div className="space-y-2">
                <a href="mailto:contact@inkup.com" className="flex items-center gap-2 text-sm text-gray-600 hover:text-[#2563EB] transition-colors">
                  <Mail className="w-4 h-4" />
                  contact@inkup.com
                </a>
                <a href="tel:+33612345678" className="flex items-center gap-2 text-sm text-gray-600 hover:text-[#2563EB] transition-colors">
                  <Phone className="w-4 h-4" />
                  +33 6 12 34 56 78
                </a>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <MapPin className="w-4 h-4" />
                  {LEGAL_INFO.address}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t-2 border-black mt-8 pt-8 text-center">
          <p className="text-sm text-gray-600">
            © {currentYear} InkUp. Tous droits réservés. | 
            <a href="#" className="hover:text-[#2563EB] transition-colors ml-1">Mentions légales</a> | 
            <a href="#" className="hover:text-[#2563EB] transition-colors ml-1">Politique de confidentialité</a> | 
            <a href="#" className="hover:text-[#2563EB] transition-colors ml-1">CGU/CGV</a>
          </p>
          <p className="text-xs text-gray-500 mt-2">
            Made with ❤️ for comic book lovers
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
