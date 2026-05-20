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
              <a
                href={`https://wa.me/${SITE_CONFIG.contact.whatsappNumber}?text=${encodeURIComponent(SITE_CONFIG.contact.whatsappMessage)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-yellow-400 hover:text-yellow-300 transition-colors font-semibold"
              >
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
                {SITE_CONFIG.contact.displayPhone}
              </a>
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
