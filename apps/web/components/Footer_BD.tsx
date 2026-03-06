import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-black border-t-4 border-[#2563EB] py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="font-['Bangers'] text-xl text-[#2563EB] mb-4">InkUp</h3>
            <p className="text-white text-sm">
              La plateforme de bande dessinée qui reconnecte auteurs et lecteurs.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-white mb-4 uppercase">Découvrir</h4>
            <ul className="space-y-2 text-white text-sm">
              <li><a href="#" className="hover:text-[#2563EB] transition-colors">Catalogue</a></li>
              <li><a href="#" className="hover:text-[#2563EB] transition-colors">Nouveautés</a></li>
              <li><a href="#" className="hover:text-[#2563EB] transition-colors">Auteurs</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white mb-4 uppercase">Légal</h4>
            <ul className="space-y-2 text-white text-sm">
              <li><a href="#" className="hover:text-[#2563EB] transition-colors">CGU</a></li>
              <li><a href="#" className="hover:text-[#2563EB] transition-colors">CGV</a></li>
              <li><a href="#" className="hover:text-[#2563EB] transition-colors">Confidentialité</a></li>
              <li><a href="#" className="hover:text-[#2563EB] transition-colors">Mentions légales</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white mb-4 uppercase">Contact</h4>
            <ul className="space-y-2 text-white text-sm">
              <li><a href="mailto:contact@inkup.com" className="hover:text-[#2563EB] transition-colors">contact@inkup.com</a></li>
              <li><a href="mailto:privacy@inkup.com" className="hover:text-[#2563EB] transition-colors">privacy@inkup.com</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-[#2563EB]/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center text-white text-sm">
            <p>© 2026 InkUp - Tous droits réservés</p>
            <p className="mt-2 md:mt-0">
              SIRET: 993 076 116 00017 - TVA non applicable, art. 293 B du CGI
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
