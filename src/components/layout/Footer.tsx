import { SITE_CONFIG } from '../../config/site';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-red-950 pt-20 pb-8">
      {/* Top decorative border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-800/30 to-transparent" />

      <div className="container mx-auto px-6 lg:px-12">
        {/* Main Footer Content */}
        <div className="mb-16 grid gap-12 md:grid-cols-3">
          {/* Brand */}
          <div className="md:col-span-1">
            <h2 className="mb-4 font-serif text-3xl font-bold text-white">
              Warkop <span className="text-red-700 italic">Azzahra</span>
            </h2>
            <p className="text-sm leading-relaxed text-white/60">
              {SITE_CONFIG.copy.footerDescription}
            </p>
            <div className="mt-6 flex items-center gap-3">
              <div className="h-px w-8 bg-red-800/30" />
              <div className="h-1.5 w-1.5 rounded-full bg-yellow-500/50" />
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-1">
            <h3 className="mb-4 text-xs font-bold tracking-[0.3em] text-yellow-400/80 uppercase">
              Menu Cepat
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {['Menu', 'Promo', 'Karir', 'Reservasi', 'Kontak'].map((link) => (
                <a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  className="text-sm text-white/60 transition-colors hover:text-yellow-400"
                >
                  {link}
                </a>
              ))}
            </div>
          </div>

          {/* Contact Info */}
          <div className="md:col-span-1">
            <h3 className="mb-4 text-xs font-bold tracking-[0.3em] text-yellow-400/80 uppercase">
              Kontak
            </h3>
            <div className="space-y-2 text-sm text-white/60">
              <p>{SITE_CONFIG.contact.displayPhone}</p>
              <p>{SITE_CONFIG.contact.address}</p>
              <p>{SITE_CONFIG.contact.openingDays}</p>
              <p>{SITE_CONFIG.contact.openingHours}</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-red-900 pt-8">
          <div className="flex flex-col items-center justify-between gap-3 text-[11px] text-yellow-400 md:flex-row font-bold tracking-widest uppercase">
            <p>&copy; {currentYear} {SITE_CONFIG.brandName}. All Rights Reserved.</p>
            <p>Crafted with ❤️ in Makassar</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
