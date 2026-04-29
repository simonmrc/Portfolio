import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { QRCodeCanvas } from 'qrcode.react';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const vcardUrl = `${window.location.origin}/contact.vcf`;

  const socialLinks = [
    { icon: 'GitHub', url: 'https://github.com/simonmrc' },
    { icon: 'LinkedIn', url: 'https://www.linkedin.com/in/simon-m-23910026a' },
  ];

  return (
    <footer className="bg-black/50 border-t border-cyan-500/20 backdrop-blur-md">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-10 md:grid-cols-3 md:items-start">
          {/* Left: QR */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center md:items-start"
          >
            <h3 className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-4">
              Admin Système & Réseau
            </h3>

            <p className="text-sm text-gray-300 mb-3">
              Scannez pour enregistrer mon contact
            </p>

            <div className="rounded-xl bg-white p-3">
              <QRCodeCanvas
                value={vcardUrl}
                size={160}
                fgColor="#1E3A5F"
                level="H"
                includeMargin
              />
            </div>

            <a
              href="/contact.vcf"
              download
              className="mt-3 text-sm text-cyan-400 hover:text-cyan-300"
            >
              Télécharger la vCard
            </a>
          </motion.div>

          {/* Middle: Navigation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-center"
          >
            <h4 className="text-cyan-400 font-semibold mb-4">Navigation</h4>
            <div className="flex flex-col items-center gap-2 text-sm text-gray-300">
              <Link to="/" className="hover:text-cyan-400 transition-colors">Accueil</Link>
              <Link to="/about" className="hover:text-cyan-400 transition-colors">À propos</Link>
              <Link to="/projects" className="hover:text-cyan-400 transition-colors">Projets</Link>
              <Link to="/contact" className="hover:text-cyan-400 transition-colors">Contact</Link>
            </div>
          </motion.div>

          {/* Right: Social */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center md:text-right"
          >
            <h4 className="text-cyan-400 font-semibold mb-4">Réseaux</h4>
            <div className="flex justify-center md:justify-end gap-4">
              {socialLinks.map((link) => (
                <a
                  key={link.icon}
                  href={link.url}
                  className="w-10 h-10 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 flex items-center justify-center transition-colors text-cyan-400"
                  aria-label={link.icon}
                >
                  {link.icon[0]}
                </a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Divider */}
        <div className="mt-10 border-t border-cyan-500/20 pt-8">
          <p className="text-center text-gray-500 text-sm">
            © {currentYear} Simon MARC. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
}
