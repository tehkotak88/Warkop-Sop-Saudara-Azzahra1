import { useRef, useState } from 'react';

import { useRevealOnIntersect } from '../../../hooks/useRevealOnIntersect';
import { SITE_CONFIG } from '../../../config/site';

interface JobPosition {
  id: string;
  title: string;
  icon: string;
  description: string;
}

const JOB_POSITIONS: JobPosition[] = [
  { id: 'kitchen', title: 'Kitchen', icon: '🍳', description: 'Menyiapkan dan memasak hidangan berkualitas tinggi untuk pelanggan kami.' },
  { id: 'barista', title: 'Barista', icon: '☕', description: 'Meracik kopi dan minuman spesial dengan keahlian dan kreativitas.' },
  { id: 'baked', title: 'Baked', icon: '🥐', description: 'Membuat aneka roti dan pastry segar setiap hari.' },
  { id: 'waiters', title: 'Waiters', icon: '🍽️', description: 'Memberikan pelayanan terbaik dan ramah kepada setiap pelanggan.' },
  { id: 'helper', title: 'Helper', icon: '🤝', description: 'Membantu operasional harian agar semua berjalan lancar.' },
  { id: 'juru-parkir', title: 'Juru Parkir', icon: '🅿️', description: 'Mengatur dan menjaga keamanan area parkir pelanggan.' },
  { id: 'security', title: 'Security', icon: '🛡️', description: 'Menjaga keamanan dan kenyamanan lingkungan warkop.' },
];

const REQUIREMENTS = [
  'Pendidikan min SMA Sederajat',
  'Mampu bekerja di bawah tekanan',
  'Siap di tempatkan di outlet mana saja',
  'Disiplin dan bertanggung jawab',
  'Mampu bekerja secara team',
];

const BENEFITS = [
  { icon: '💰', text: 'Gaji Pokok dan Lembur' },
  { icon: '🏆', text: 'Bonus Jabatan' },
  { icon: '🏠', text: 'Mess Karyawan' },
  { icon: '🍱', text: 'Makan Ditanggung' },
  { icon: '👥', text: 'Teman Baru dan Pengalaman' },
];

const Careers = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isVisible = useRevealOnIntersect(sectionRef);
  const [selectedJob, setSelectedJob] = useState<string | null>(null);
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);

  const [selectedOutlet, setSelectedOutlet] = useState<string>(SITE_CONFIG.outlets[0].name);

  const getEmailHref = (jobTitle?: string) => {
    const jobLabel = jobTitle || (selectedJob ? JOB_POSITIONS.find(j => j.id === selectedJob)?.title : undefined);
    const subject = jobLabel
      ? `Lamaran Kerja - Posisi ${jobLabel} (${selectedOutlet})`
      : `Lamaran Kerja - Warkop Azzahra (${selectedOutlet})`;
    const body = jobLabel
      ? `Yth. Tim HRD Warkop Azzahra,\n\nSaya tertarik untuk melamar posisi ${jobLabel} di cabang ${selectedOutlet}.\n\nBerikut saya lampirkan CV saya.\n\nTerima kasih.`
      : `Yth. Tim HRD Warkop Azzahra,\n\nSaya tertarik untuk melamar kerja di cabang ${selectedOutlet}.\n\nBerikut saya lampirkan CV saya.\n\nTerima kasih.`;
    return `mailto:azzahramaroswarkropdansopsaudar@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const handleApplyWhatsApp = (jobTitle?: string) => {
    const outlet = SITE_CONFIG.outlets.find(o => o.name === selectedOutlet) || SITE_CONFIG.outlets[0];
    const message = jobTitle
      ? `Halo, saya tertarik untuk melamar posisi *${jobTitle}* di Warkop Azzahra (Cabang ${selectedOutlet}). Saya ingin mengirimkan CV saya.`
      : `Halo, saya tertarik untuk melamar kerja di Warkop Azzahra (Cabang ${selectedOutlet}). Saya ingin mengetahui posisi yang tersedia.`;
    const url = `https://wa.me/${outlet.whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <section
      id="karir"
      ref={sectionRef}
      className="relative overflow-hidden bg-red-950 py-28 lg:py-36"
    >
      {/* Background decorations */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 -left-40 h-[600px] w-[600px] rounded-full bg-red-900/15 blur-[180px] animate-career-glow-1" />
        <div className="absolute -right-40 -bottom-40 h-[500px] w-[500px] rounded-full bg-yellow-900/10 blur-[150px] animate-career-glow-2" />
        <div className="absolute top-1/2 left-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-800/5 blur-[120px]" />
      </div>

      <div className="container relative z-10 mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="mb-20 text-center">
          <span className="mb-4 inline-block text-[10px] font-bold tracking-[0.5em] text-yellow-400/80 uppercase animate-blur-in">
            Bergabung Bersama Kami
          </span>
          <h2 className="font-serif text-4xl font-bold text-white md:text-6xl lg:text-7xl animate-blur-in delay-100">
            Peluang <span className="bg-gradient-to-r from-yellow-400 to-amber-500 bg-clip-text text-transparent italic">Karir</span>
          </h2>
          <p
            className={`mx-auto mt-6 max-w-2xl text-lg text-white/60 ${
              isVisible ? 'animate-blur-in delay-200' : 'opacity-0'
            }`}
          >
            Jelajahi berbagai posisi yang tersedia dan jadilah bagian dari perjalanan kami dalam menyajikan kopi Nusantara terbaik.
          </p>
        </div>

        {/* Job Position Cards */}
        <div className="mb-20 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7">
          {JOB_POSITIONS.map((job, index) => (
            <button
              key={job.id}
              onClick={() => setSelectedJob(selectedJob === job.id ? null : job.id)}
              className={`group relative overflow-hidden rounded-2xl border p-5 text-center transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_60px_-15px_rgba(153,27,27,0.3)] ${
                selectedJob === job.id
                  ? 'border-red-700/50 bg-red-800/15 shadow-lg shadow-red-900/20'
                  : 'border-stone-700/50 bg-stone-800/30 hover:border-red-700/30'
              } ${isVisible ? 'animate-blur-in' : 'opacity-0'}`}
              style={{ animationDelay: `${300 + index * 100}ms` }}
            >
              <div className="mb-3 text-3xl transition-transform duration-500 group-hover:scale-125 group-hover:animate-pulse">
                {job.icon}
              </div>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">{job.title}</h3>
              {selectedJob === job.id && (
                <p className="mt-3 text-xs leading-relaxed text-stone-300 animate-blur-in">
                  {job.description}
                </p>
              )}
              <div
                className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r from-red-700 to-yellow-400 transition-all duration-500 ${
                  selectedJob === job.id ? 'w-full' : 'w-0 group-hover:w-full'
                }`}
              />
            </button>
          ))}
        </div>

        {/* Requirements & Benefits Grid */}
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Syarat & Ketentuan */}
          <div
            className={`rounded-3xl border border-stone-700/50 bg-stone-800/20 p-8 backdrop-blur-sm md:p-10 ${
              isVisible ? 'animate-blur-in delay-500' : 'opacity-0'
            }`}
          >
            <div className="mb-8 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-800/15 text-red-400">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-serif text-2xl font-bold text-white">
                Syarat & Ketentuan
              </h3>
            </div>
            <ul className="space-y-4">
              {REQUIREMENTS.map((req, index) => (
                <li key={index} className="flex items-start gap-3 group/item">
                  <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-red-800/20 text-xs font-bold text-yellow-400 transition-all group-hover/item:bg-red-800 group-hover/item:text-white group-hover/item:scale-110">
                    ✓
                  </span>
                  <span className="text-stone-300 transition-colors group-hover/item:text-white">{req}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Manfaat & Keuntungan */}
          <div
            className={`rounded-3xl border border-stone-700/50 bg-stone-800/20 p-8 backdrop-blur-sm md:p-10 ${
              isVisible ? 'animate-blur-in delay-700' : 'opacity-0'
            }`}
          >
            <div className="mb-8 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-yellow-500/15 text-yellow-400">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-serif text-2xl font-bold text-white">
                Manfaat & Keuntungan
              </h3>
            </div>
            <ul className="space-y-4">
              {BENEFITS.map((benefit, index) => (
                <li key={index} className="flex items-center gap-4 rounded-xl p-3 transition-all duration-300 hover:bg-white/5 hover:translate-x-2">
                  <span className="text-2xl">{benefit.icon}</span>
                  <span className="font-medium text-stone-300">{benefit.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* CTA Area */}
        <div
          className={`mt-16 text-center ${isVisible ? 'animate-blur-in delay-1000' : 'opacity-0'}`}
        >
          <div className="mx-auto max-w-2xl rounded-3xl border border-red-800/20 bg-gradient-to-r from-red-900/15 via-red-800/5 to-red-900/15 p-10 backdrop-blur-sm">
            <h3 className="mb-4 font-serif text-3xl font-bold text-white">
              Tertarik Bergabung?
            </h3>
            <p className="mb-6 text-stone-400">
              Kirim CV kamu ke email kami atau hubungi via WhatsApp
            </p>

            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <button
                onClick={() => setIsApplyModalOpen(true)}
                className="group inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-red-800 to-red-700 px-8 py-4 font-bold text-white shadow-lg shadow-red-900/30 transition-all duration-300 hover:scale-105 hover:shadow-red-800/50"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Lamar Sekarang
              </button>

              <button
                onClick={() => handleApplyWhatsApp(selectedJob ? JOB_POSITIONS.find(j => j.id === selectedJob)?.title : undefined)}
                className="group inline-flex items-center gap-3 rounded-full border border-green-500/30 bg-green-600/10 px-8 py-4 font-bold text-green-400 transition-all duration-300 hover:scale-105 hover:bg-green-600 hover:text-white"
              >
                <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
                Via WhatsApp
              </button>
            </div>

            <div className="mt-8 flex flex-col items-center gap-2 text-sm text-stone-500">
              <p>
                📧 <a href={getEmailHref()} className="text-yellow-400 hover:text-yellow-300 transition-colors underline underline-offset-2">azzahramaroswarkropdansopsaudar@gmail.com</a>
              </p>
              <p>📞 0895404677117 | 085399218530</p>
            </div>
          </div>
        </div>
      </div>

      {/* Apply Modal */}
      {isApplyModalOpen && (
        <div
          className="fixed inset-0 z-[120] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
          onClick={() => setIsApplyModalOpen(false)}
        >
          <div
            className="relative w-full max-w-lg overflow-hidden rounded-3xl border border-red-900/30 bg-stone-900 p-8 shadow-2xl animate-blur-in"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsApplyModalOpen(false)}
              className="absolute top-4 right-4 rounded-full bg-stone-800 p-2 text-stone-400 transition-colors hover:bg-stone-700 hover:text-white"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="mb-6 text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-red-800/15 text-3xl">
                📋
              </div>
              <h3 className="font-serif text-2xl font-bold text-white">Cara Melamar</h3>
              <p className="mt-2 text-stone-400">Pilih posisi dan kirim CV kamu</p>
            </div>

            <div className="space-y-4">
              <div className="rounded-2xl bg-stone-800/50 p-5">
                <h4 className="mb-3 text-sm font-bold text-yellow-400 uppercase tracking-wider">Langkah 1: Pilih Outlet</h4>
                <select
                  value={selectedOutlet}
                  onChange={(e) => setSelectedOutlet(e.target.value)}
                  className="w-full rounded-xl border border-red-900 bg-red-950/50 px-4 py-3 text-sm text-white transition-all focus:border-yellow-500 focus:outline-none"
                >
                  {SITE_CONFIG.outlets.map((outlet) => (
                    <option key={outlet.name} value={outlet.name}>
                      {outlet.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="rounded-2xl bg-stone-800/50 p-5">
                <h4 className="mb-3 text-sm font-bold text-yellow-400 uppercase tracking-wider">Langkah 2: Pilih Posisi</h4>
                <div className="flex flex-wrap gap-2">
                  {JOB_POSITIONS.map((job) => (
                    <button
                      key={job.id}
                      onClick={() => setSelectedJob(job.id)}
                      className={`rounded-full px-4 py-2 text-xs font-bold transition-all ${
                        selectedJob === job.id
                          ? 'bg-red-800 text-white'
                          : 'bg-stone-700/50 text-stone-300 hover:bg-stone-700'
                      }`}
                    >
                      {job.icon} {job.title}
                    </button>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl bg-stone-800/50 p-5">
                <h4 className="mb-3 text-sm font-bold text-yellow-400 uppercase tracking-wider">Langkah 3: Kirim CV</h4>
                <div className="space-y-3">
                  <a
                    href={getEmailHref(selectedJob ? JOB_POSITIONS.find(j => j.id === selectedJob)?.title : undefined)}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-red-800 to-red-700 px-6 py-3 font-bold text-white transition-all hover:from-red-700 hover:to-red-600"
                  >
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    Kirim via Email
                  </a>
                  <button
                    onClick={() => handleApplyWhatsApp(selectedJob ? JOB_POSITIONS.find(j => j.id === selectedJob)?.title : undefined)}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-green-600 px-6 py-3 font-bold text-white transition-all hover:bg-green-500"
                  >
                    <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                    </svg>
                    Kirim via WhatsApp
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes career-glow-1 {
          0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.15; }
          50% { transform: translate(30px, 20px) scale(1.1); opacity: 0.25; }
        }
        @keyframes career-glow-2 {
          0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.1; }
          50% { transform: translate(-20px, -15px) scale(1.1); opacity: 0.18; }
        }
        .animate-career-glow-1 { animation: career-glow-1 10s ease-in-out infinite; }
        .animate-career-glow-2 { animation: career-glow-2 12s ease-in-out infinite; }
      `}</style>
    </section>
  );
};

export default Careers;
