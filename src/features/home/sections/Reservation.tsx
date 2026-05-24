import { useState } from 'react';

import { SITE_CONFIG } from '../../../config/site';

const Reservation = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    date: '',
    time: '',
    guests: '2',
    notes: '',
    outlet: SITE_CONFIG.outlets[0].name as string,
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const selectedOutlet = SITE_CONFIG.outlets.find(o => o.name === formData.outlet) || SITE_CONFIG.outlets[0];

    const message = `*RESERVASI TEMPAT*\n*Warkop Azzahra*\n\n${'━'.repeat(40)}\n\n`
      + `*Outlet:* ${formData.outlet}\n`
      + `*Nama:* ${formData.name}\n`
      + `*No. HP:* ${formData.phone}\n`
      + `*Tanggal:* ${formData.date}\n`
      + `*Jam:* ${formData.time}\n`
      + `*Jumlah Tamu:* ${formData.guests} orang\n`
      + `*Catatan:* ${formData.notes || '-'}\n\n`
      + `${'━'.repeat(40)}\n\n`
      + `Mohon konfirmasi ketersediaan tempat kami.\nTerima kasih!`;

    const url = `https://wa.me/${selectedOutlet.whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
    setIsSubmitted(true);

    setTimeout(() => setIsSubmitted(false), 5000);
  };

  // Get tomorrow's date as the minimum selectable date
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split('T')[0];

  return (
    <section id="reservasi" className="relative overflow-hidden bg-red-950 py-32">
      {/* Background decorations */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-20 -right-40 h-[500px] w-[500px] rounded-full bg-red-100/40 blur-[150px]" />
        <div className="absolute -bottom-20 -left-40 h-[400px] w-[400px] rounded-full bg-yellow-100/40 blur-[120px]" />
      </div>

      <div className="container relative z-10 mx-auto px-6 lg:px-12">
        <div className="mb-20 text-center">
          <span className="mb-4 inline-block text-[10px] font-bold tracking-[0.5em] text-yellow-400/80 uppercase animate-blur-in">
            Book Your Table
          </span>
          <h2 className="font-serif text-5xl font-bold leading-tight text-white md:text-7xl animate-blur-in delay-100">
            Reservasi{' '}
            <span className="bg-gradient-to-r from-yellow-400 to-amber-500 bg-clip-text text-transparent italic">Tempat</span>
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-white/60 animate-blur-in delay-200">
            Pastikan meja tersedia untuk kamu dan teman-teman. Reservasi langsung via WhatsApp.
          </p>
        </div>

        <div className="mx-auto max-w-3xl">
          <div className="overflow-hidden rounded-[2.5rem] border border-red-900 bg-red-900/20 backdrop-blur-sm shadow-[0_40px_80px_-20px_rgba(250,204,21,0.08)]">
            {/* Header decoration */}
            <div className="relative bg-gradient-to-r from-red-900 via-red-800 to-red-900 px-8 py-10 text-center md:px-12">
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-yellow-500/10 to-transparent" />
              <div className="relative">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-yellow-400/20 text-3xl">
                  📍
                </div>
                <h3 className="font-serif text-2xl font-bold text-white">
                  Warkop <span className="text-yellow-300 italic">Azzahra</span>
                </h3>
                <p className="mt-2 text-sm text-red-200/70">
                  Silakan pilih cabang / outlet terdekat Anda
                </p>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6 p-8 md:p-12">
              <div className="grid gap-6 md:grid-cols-3">
                <div className="md:col-span-1">
                  <label htmlFor="res-outlet" className="mb-2 block text-sm font-bold text-white/80 uppercase tracking-wider">
                    Pilih Outlet
                  </label>
                  <select
                    id="res-outlet"
                    name="outlet"
                    value={formData.outlet}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-red-900 bg-red-950/50 px-5 py-4 text-white transition-all focus:border-yellow-500 focus:bg-red-950 focus:ring-4 focus:ring-yellow-500/20 focus:outline-none"
                  >
                    {SITE_CONFIG.outlets.map((outlet) => (
                      <option key={outlet.name} value={outlet.name}>
                        {outlet.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="res-name" className="mb-2 block text-sm font-bold text-white/80 uppercase tracking-wider">
                    Nama Lengkap
                  </label>
                  <input
                    id="res-name"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Masukkan nama Anda"
                    className="w-full rounded-xl border border-red-900 bg-red-950/50 px-5 py-4 text-white placeholder-white/30 transition-all focus:border-yellow-500 focus:bg-red-950 focus:ring-4 focus:ring-yellow-500/20 focus:outline-none"
                  />
                </div>

                <div>
                  <label htmlFor="res-phone" className="mb-2 block text-sm font-bold text-white/80 uppercase tracking-wider">
                    No. HP / WhatsApp
                  </label>
                  <input
                    id="res-phone"
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    placeholder="08xx xxxx xxxx"
                    className="w-full rounded-xl border border-red-900 bg-red-950/50 px-5 py-4 text-white placeholder-white/30 transition-all focus:border-yellow-500 focus:bg-red-950 focus:ring-4 focus:ring-yellow-500/20 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid gap-6 md:grid-cols-3">
                <div>
                  <label htmlFor="res-date" className="mb-2 block text-sm font-bold text-white/80 uppercase tracking-wider">
                    Tanggal
                  </label>
                  <input
                    id="res-date"
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                    min={minDate}
                    className="w-full rounded-xl border border-red-900 bg-red-950/50 px-5 py-4 text-white placeholder-white/30 transition-all focus:border-yellow-500 focus:bg-red-950 focus:ring-4 focus:ring-yellow-500/20 focus:outline-none"
                  />
                </div>

                <div>
                  <label htmlFor="res-time" className="mb-2 block text-sm font-bold text-white/80 uppercase tracking-wider">
                    Jam
                  </label>
                  <input
                    id="res-time"
                    type="time"
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                    required
                    min="08:00"
                    max="22:00"
                    className="w-full rounded-xl border border-red-900 bg-red-950/50 px-5 py-4 text-white placeholder-white/30 transition-all focus:border-yellow-500 focus:bg-red-950 focus:ring-4 focus:ring-yellow-500/20 focus:outline-none"
                  />
                </div>

                <div>
                  <label htmlFor="res-guests" className="mb-2 block text-sm font-bold text-white/80 uppercase tracking-wider">
                    Jumlah Tamu
                  </label>
                  <select
                    id="res-guests"
                    name="guests"
                    value={formData.guests}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-red-900 bg-red-950/50 px-5 py-4 text-white transition-all focus:border-yellow-500 focus:bg-red-950 focus:ring-4 focus:ring-yellow-500/20 focus:outline-none"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 15, 20, 25, 30].map((n) => (
                      <option key={n} value={n.toString()}>
                        {n} orang
                      </option>
                    ))}
                    <option value="30+">30+ orang</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="res-notes" className="mb-2 block text-sm font-bold text-white/80 uppercase tracking-wider">
                  Catatan Tambahan (Opsional)
                </label>
                <textarea
                  id="res-notes"
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  rows={3}
                  placeholder="Contoh: Area outdoor, acara ulang tahun, dll."
                  className="w-full resize-none rounded-xl border border-red-900 bg-red-950/50 px-5 py-4 text-white placeholder-white/30 transition-all focus:border-yellow-500 focus:bg-red-950 focus:ring-4 focus:ring-yellow-500/20 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitted}
                className={`group flex w-full items-center justify-center gap-3 rounded-2xl px-8 py-5 text-lg font-bold transition-all duration-500 ${
                  isSubmitted
                    ? 'bg-green-500 text-white'
                    : 'bg-gradient-to-r from-yellow-500 to-amber-600 text-stone-900 hover:from-yellow-400 hover:to-amber-500 hover:shadow-[0_20px_60px_-15px_rgba(250,204,21,0.4)]'
                }`}
              >
                {isSubmitted ? (
                  <>
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                    Dialihkan ke WhatsApp!
                  </>
                ) : (
                  <>
                    <svg className="h-6 w-6 fill-current transition-transform duration-300 group-hover:scale-110" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                    </svg>
                    Reservasi via WhatsApp
                  </>
                )}
              </button>

              <p className="text-center text-xs text-white/50">
                Jam operasional: {SITE_CONFIG.contact.openingDays}, {SITE_CONFIG.contact.openingHours}
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Reservation;
