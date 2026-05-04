import { useState } from 'react';

import { SITE_CONFIG } from '../../../config/site';

const Contact = () => {
  const [isCareerModalOpen, setIsCareerModalOpen] = useState(false);
  const [isCareerImageError, setIsCareerImageError] = useState(false);
  const whatsappUrl = `https://wa.me/${SITE_CONFIG.contact.whatsappNumber}?text=${encodeURIComponent(
    SITE_CONFIG.contact.whatsappMessage,
  )}`;

  const contactInfo = [
    {
      icon: '📍',
      title: 'Alamat',
      lines: [SITE_CONFIG.contact.address, SITE_CONFIG.contact.addressLine2],
    },
    {
      icon: '🕐',
      title: 'Jam Operasional',
      lines: [SITE_CONFIG.contact.openingDays, SITE_CONFIG.contact.openingHours],
    },
    {
      icon: '📱',
      title: 'Kontak Outlet WhatsApp',
      lines: SITE_CONFIG.outlets ? SITE_CONFIG.outlets.map(o => `${o.name}: ${o.phone}`) : [SITE_CONFIG.contact.displayPhone],
    },
  ];

  return (
    <section id="kontak" className="relative overflow-hidden bg-red-950 py-28 lg:py-36">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-20 left-[30%] h-[500px] w-[500px] rounded-full bg-red-900/8 blur-[180px]" />
        <div className="absolute -bottom-20 right-[20%] h-[400px] w-[400px] rounded-full bg-yellow-900/5 blur-[150px]" />
      </div>

      <div className="container relative z-10 mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="mb-20 text-center animate-blur-in">
          <span className="mb-4 inline-block text-[10px] font-bold tracking-[0.5em] text-yellow-400/70 uppercase">
            Hubungi Kami
          </span>
          <h2 className="font-serif text-4xl font-bold text-white md:text-6xl lg:text-7xl">
            Kunjungi{' '}
            <span className="text-white/30 italic">Kami</span>
          </h2>
        </div>

        <div className="grid gap-12 lg:grid-cols-2">
          {/* Left - Info Cards */}
          <div className="space-y-6">
            {contactInfo.map((info, i) => (
              <div
                key={i}
                className="group rounded-2xl border border-stone-800 bg-stone-900/40 p-6 backdrop-blur-sm transition-all duration-300 hover:border-red-800/30 hover:bg-stone-900/60"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-yellow-500/10 text-xl transition-all group-hover:bg-yellow-500/20 group-hover:scale-105">
                    {info.icon}
                  </div>
                  <div>
                    <h3 className="mb-2 text-sm font-bold tracking-wider text-white/80 uppercase">
                      {info.title}
                    </h3>
                    <p className="text-sm text-white/60 leading-relaxed">{info.lines.join(', ')}</p>
                  </div>
                </div>
              </div>
            ))}

            {/* CTA Buttons */}
            <div className="flex flex-col gap-3 pt-4 sm:flex-row">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-1 items-center justify-center gap-3 rounded-xl bg-green-600 px-6 py-4 font-bold text-white transition-all hover:bg-green-500 hover:shadow-[0_0_25px_rgba(22,163,74,0.3)]"
              >
                <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
                Pesan via WhatsApp
              </a>

              <button
                onClick={() => {
                  setIsCareerImageError(false);
                  setIsCareerModalOpen(true);
                }}
                className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-yellow-400/20 bg-yellow-400/5 px-6 py-4 font-bold text-yellow-400 transition-all hover:border-yellow-400/40 hover:bg-yellow-400/10"
              >
                💼 Info Karir
              </button>
            </div>

            {/* Social */}
            <div className="flex items-center gap-4 pt-2">
              <span className="text-xs font-bold tracking-wider text-white/60 uppercase">Follow:</span>
              <a
                href={SITE_CONFIG.contact.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-red-900 text-white/50 transition-all hover:border-yellow-400/30 hover:bg-yellow-400/10 hover:text-yellow-400"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.85s-.011 3.584-.069 4.85c-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.069-4.85.069s-3.584-.011-4.85-.069c-3.225-.148-4.771-1.664-4.919-4.919-.058-1.265-.069-1.645-.069-4.85s.011-3.584.069-4.85c.149-3.225 1.664-4.771 4.919-4.919C8.416 2.175 8.796 2.163 12 2.163zm0 5.467a4.37 4.37 0 100 8.74 4.37 4.37 0 000-8.74zM12 15a3 3 0 110-6 3 3 0 010 6zm6.363-8.87a1.2 1.2 0 110-2.4 1.2 1.2 0 010 2.4z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Right - Map */}
          <div className="overflow-hidden rounded-2xl border border-stone-800 shadow-2xl shadow-red-950/10">
            <iframe
              src={SITE_CONFIG.contact.mapsEmbedUrl}
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: '450px' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="grayscale-[50%] transition-all duration-500 hover:grayscale-0"
              title="Lokasi Warkop Azzahra"
            />
          </div>
        </div>
      </div>

      {/* Career Modal */}
      {isCareerModalOpen && (
        <div
          className="fixed inset-0 z-[120] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          onClick={() => setIsCareerModalOpen(false)}
        >
          <div
            className="relative w-full max-w-4xl overflow-hidden rounded-2xl border border-stone-800 bg-stone-900 shadow-2xl animate-blur-in"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsCareerModalOpen(false)}
              className="absolute top-3 right-3 z-10 rounded-full bg-stone-800 p-2 text-stone-400 transition-colors hover:bg-stone-700 hover:text-white"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            {!isCareerImageError ? (
              <img
                src={SITE_CONFIG.assets.careerPoster}
                alt="Poster lowongan kerja"
                className="max-h-[85vh] w-full object-contain"
                onError={() => setIsCareerImageError(true)}
              />
            ) : (
              <div className="p-12 text-center">
                <p className="text-lg font-bold text-yellow-300">Poster career belum ditemukan.</p>
                <p className="mt-2 text-sm text-stone-400">
                  Simpan file poster ke <code className="rounded bg-stone-800 px-2 py-1">public/asset/image.png</code>
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default Contact;
