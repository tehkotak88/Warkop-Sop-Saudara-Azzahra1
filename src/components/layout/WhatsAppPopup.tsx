import { useState, useEffect } from 'react';

import { SITE_CONFIG } from '../../config/site';

const WhatsAppPopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [showPulse, setShowPulse] = useState(true);

  // Show the button after a short delay for smooth entrance
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  // Auto-hide pulse after some time
  useEffect(() => {
    const timer = setTimeout(() => setShowPulse(false), 10000);
    return () => clearTimeout(timer);
  }, []);

  const quickMessages = [
    {
      id: 'menu',
      icon: '📋',
      label: 'Tanya Menu',
      message: 'Halo Warkop Azzahra! Saya ingin menanyakan menu yang tersedia hari ini.',
    },
    {
      id: 'order',
      icon: '🛒',
      label: 'Pesan Makanan',
      message: 'Halo, saya ingin memesan makanan/minuman dari Warkop Azzahra.',
    },
    {
      id: 'reservasi',
      icon: '📍',
      label: 'Reservasi Tempat',
      message: 'Halo, saya ingin melakukan reservasi tempat di Warkop Azzahra.',
    },
    {
      id: 'karir',
      icon: '💼',
      label: 'Info Lowongan',
      message: 'Halo, saya tertarik dengan lowongan kerja di Warkop Azzahra. Bisa info lebih lanjut?',
    },
    {
      id: 'lainnya',
      icon: '💬',
      label: 'Pertanyaan Lain',
      message: 'Halo Warkop Azzahra, saya ingin bertanya.',
    },
  ];

  const handleSendMessage = (message: string) => {
    const url = `https://wa.me/${SITE_CONFIG.contact.whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
    setIsOpen(false);
  };

  return (
    <>
      {/* Floating WhatsApp Button */}
      <div
        className={`fixed right-6 bottom-6 z-[100] transition-all duration-700 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
        }`}
      >
        {/* Pulse Ring */}
        {showPulse && !isOpen && (
          <>
            <span className="absolute inset-0 rounded-full bg-green-500 opacity-30 animate-wa-ping" />
            <span className="absolute inset-0 rounded-full bg-green-500 opacity-20 animate-wa-ping delay-500" />
          </>
        )}

        {/* Tooltip */}
        {!isOpen && (
          <div className="absolute bottom-full right-0 mb-3 whitespace-nowrap rounded-xl bg-stone-900 px-4 py-2 text-sm font-medium text-white shadow-xl animate-wa-tooltip">
            <span>Ada yang bisa kami bantu? 👋</span>
            <div className="absolute -bottom-1 right-6 h-2 w-2 rotate-45 bg-stone-900" />
          </div>
        )}

        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`relative flex h-16 w-16 items-center justify-center rounded-full shadow-2xl transition-all duration-500 ${
            isOpen
              ? 'rotate-90 bg-stone-800 shadow-stone-900/50'
              : 'bg-green-500 shadow-green-500/40 hover:scale-110 hover:bg-green-600 hover:shadow-green-500/60'
          }`}
          aria-label={isOpen ? 'Tutup menu WhatsApp' : 'Buka menu WhatsApp'}
        >
          {isOpen ? (
            <svg className="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="h-8 w-8 fill-white" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
            </svg>
          )}
        </button>
      </div>

      {/* Popup Card */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-[99] bg-black/20 backdrop-blur-[2px] md:bg-transparent md:backdrop-blur-0"
            onClick={() => setIsOpen(false)}
          />

          {/* Card */}
          <div className="fixed right-6 bottom-24 z-[101] w-[340px] max-w-[calc(100vw-3rem)] animate-wa-popup overflow-hidden rounded-3xl border border-stone-200 bg-white shadow-[0_30px_80px_-10px_rgba(0,0,0,0.25)]">
            {/* Header */}
            <div className="relative bg-gradient-to-r from-green-600 to-green-500 px-6 py-5 text-white">
              <div className="pointer-events-none absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Y2lyY2xlIGN4PSIyMCIgY3k9IjIwIiByPSIxIiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMSkiLz48L3N2Zz4=')] opacity-50" />
              <div className="relative flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
                  <svg className="h-7 w-7 fill-white" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-bold">Warkop Azzahra</h3>
                  <div className="flex items-center gap-2 text-sm text-green-100">
                    <span className="inline-block h-2 w-2 rounded-full bg-green-300 animate-pulse" />
                    Online sekarang
                  </div>
                </div>
              </div>
            </div>

            {/* Chat Bubble */}
            <div className="bg-stone-50 px-6 py-4">
              <div className="inline-block rounded-2xl rounded-tl-none bg-white px-4 py-3 text-sm text-stone-700 shadow-sm">
                Halo! 👋 Selamat datang di <strong>Warkop Azzahra</strong>. 
                Silakan pilih topik di bawah atau ketik pesan langsung.
              </div>
            </div>

            {/* Quick Action Buttons */}
            <div className="px-4 pb-4">
              <p className="mb-3 px-2 text-xs font-bold text-stone-400 uppercase tracking-wider">
                Pilih Topik
              </p>
              <div className="space-y-2">
                {quickMessages.map((msg, index) => (
                  <button
                    key={msg.id}
                    onClick={() => handleSendMessage(msg.message)}
                    className="group flex w-full items-center gap-3 rounded-xl border border-stone-100 bg-white px-4 py-3 text-left text-sm font-medium text-stone-700 transition-all duration-300 hover:border-green-200 hover:bg-green-50 hover:shadow-md"
                    style={{ animationDelay: `${index * 80}ms` }}
                  >
                    <span className="text-lg transition-transform duration-300 group-hover:scale-125">
                      {msg.icon}
                    </span>
                    <span className="flex-1">{msg.label}</span>
                    <svg
                      className="h-4 w-4 text-stone-300 transition-all duration-300 group-hover:translate-x-1 group-hover:text-green-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                ))}
              </div>

              {/* Phone info */}
              <div className="mt-4 text-center text-xs text-stone-400">
                <p>
                  📞 {SITE_CONFIG.contact.displayPhone}
                </p>
              </div>
            </div>
          </div>
        </>
      )}

      <style>{`
        @keyframes wa-ping {
          0% { transform: scale(1); opacity: 0.3; }
          100% { transform: scale(2.2); opacity: 0; }
        }
        .animate-wa-ping {
          animation: wa-ping 2s cubic-bezier(0, 0, 0.2, 1) infinite;
        }
        
        @keyframes wa-popup {
          0% { opacity: 0; transform: translateY(20px) scale(0.95); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        .animate-wa-popup {
          animation: wa-popup 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        @keyframes wa-tooltip {
          0%, 100% { opacity: 1; transform: translateY(0); }
          50% { opacity: 0.9; transform: translateY(-3px); }
        }
        .animate-wa-tooltip {
          animation: wa-tooltip 3s ease-in-out infinite;
          animation-delay: 3s;
        }

        .delay-500 {
          animation-delay: 500ms;
        }
      `}</style>
    </>
  );
};

export default WhatsAppPopup;
