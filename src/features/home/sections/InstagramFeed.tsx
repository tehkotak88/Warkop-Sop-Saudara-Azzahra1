import { useEffect } from 'react';
import { SITE_CONFIG } from '../../../config/site';

const InstagramFeed = () => {
  const emojiStyle = {
    fontFamily: 'Apple Color Emoji, "Segoe UI Emoji", "Segoe UI Symbol", sans-serif',
  } as const;

  useEffect(() => {
    const videos = document.querySelectorAll<HTMLVideoElement>('video[data-autoplay]');
    videos.forEach((video) => {
      video.muted = true;
      video.play().catch(() => {
        // autoplay may be blocked until user interaction in some browsers
      });
    });
  }, []);

  const posts = [
    // feeds1 = "Sedekah Tiap Jumat" reel (27 Jul 2025) → Post #1 on IG grid
    { id: 1, videoUrl: '/instagram/feeds1.mp4', posterUrl: '/instagram/feeds1.png', likes: '86', comments: '5', type: 'autoplay-video', link: 'https://www.instagram.com/warkopsop_azzahra/' },
    // feeds2 = "Masih Pagi Udah Rame" interior reel (ngemil_lucu, 19 Jul 2025) → Post #2
    { id: 2, videoUrl: '/instagram/feeds2.mp4', posterUrl: '/instagram/feeds2.png', likes: '303', comments: '10', type: 'autoplay-video', link: 'https://www.instagram.com/warkopsop_azzahra/' },
    // feeds3 = "Minza mau buat minuman baru" red cup PHOTO (23 Ags 2025) → Post #3 — this is a PHOTO
    { id: 3, url: '/instagram/feeds3.png', likes: '303', comments: '1', type: 'photo', link: 'https://www.instagram.com/warkopsop_azzahra/' },
    // feeds4 = "Matcha series" reel (warkopsop_azzahra, 23 Sep 2025) → Post #4
    { id: 4, videoUrl: '/instagram/feeds4.mp4', posterUrl: '/instagram/feeds4.png', likes: '26', comments: '1', type: 'autoplay-video', link: 'https://www.instagram.com/warkopsop_azzahra/' },
    // feeds5 = "Pelayanan ramah" jersey collab reel (mbmproductionn, 2 Okt 2025) → Post #5
    { id: 5, videoUrl: '/instagram/feeds5.mp4', posterUrl: '/instagram/feeds5.png', likes: '56', comments: '0', type: 'autoplay-video', link: 'https://www.instagram.com/warkopsop_azzahra/' },
    // feeds6 = "Singgah Belanja Roti Maros" reel (ngemil_lucu) → Post #6 — 7.9K likes
    { id: 6, videoUrl: '/instagram/feeds6.mp4', posterUrl: '/instagram/feeds6.png', likes: '7.9K', comments: '123', type: 'autoplay-video', link: 'https://www.instagram.com/reel/DUe9FgqD2hA/' },
  ];

  return (
    <section id="instagram" className="relative overflow-hidden bg-red-950 py-24">
      <div className="container relative z-10 mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="mb-16 flex flex-col items-center justify-between gap-6 md:flex-row">
          <div className="text-center md:text-left">
            <span className="mb-2 inline-block text-[10px] font-bold tracking-[0.5em] text-yellow-500 uppercase">
              Social Experience
            </span>
            <h2 className="font-serif text-4xl font-bold text-white md:text-5xl">
              Momen <span className="text-white/30 italic">Azzahra</span>
            </h2>
            <p className="mt-3 text-sm text-white/50">
              Bagikan cerita Anda bersama kami menggunakan @warkopsop_azzahra
            </p>
          </div>
          
          <a
            href={SITE_CONFIG.contact.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-4 rounded-full border border-white/10 bg-white/5 px-8 py-4 transition-all hover:border-yellow-500/40 hover:bg-yellow-500/10"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-tr from-yellow-400 to-red-500 text-white shadow-lg">
               <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                 <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.85s-.011 3.584-.069 4.85c-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.069-4.85.069s-3.584-.011-4.85-.069c-3.225-.148-4.771-1.664-4.919-4.919-.058-1.265-.069-1.645-.069-4.85s.011-3.584.069-4.85c.149-3.225 1.664-4.771 4.919-4.919C8.416 2.175 8.796 2.163 12 2.163zm0 5.467a4.37 4.37 0 100 8.74 4.37 4.37 0 000-8.74zM12 15a3 3 0 110-6 3 3 0 010 6zm6.363-8.87a1.2 1.2 0 110-2.4 1.2 1.2 0 010 2.4z" />
               </svg>
            </div>
            <span className="text-xs font-black tracking-[0.2em] text-white uppercase">Follow Us</span>
          </a>
        </div>

        {/* Instagram Grid */}
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-8">
          {posts.map((post) => (
            <a
              key={post.id}
              href={post.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-square overflow-hidden rounded-[2.5rem] border border-white/5 bg-stone-950 shadow-2xl transition-all duration-500 hover:scale-[1.02]"
            >
              {/* Video or Image with Living Animation */}
              <div className="h-full w-full overflow-hidden">
                {post.type === 'autoplay-video' ? (
                  <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="auto"
                    data-autoplay
                    poster={post.posterUrl}
                    className="h-full w-full object-cover transition-transform duration-[10000ms] ease-linear group-hover:scale-125"
                  >
                    <source src={post.videoUrl} type="video/mp4" />
                  </video>
                ) : (
                  <img
                    src={post.url}
                    alt={`Instagram post ${post.id}`}
                    className="h-full w-full object-cover transition-transform duration-[10000ms] ease-linear group-hover:scale-125"
                    style={{
                      animation: 'living-zoom 20s infinite alternate ease-in-out',
                    }}
                  />
                )}
              </div>
              
              {/* Type Indicator (Video/Photo) */}
              {post.type === 'autoplay-video' && (
                <div className="absolute top-6 right-6 z-10 text-white/90">
                   <div className="flex h-10 w-10 items-center justify-center rounded-full bg-black/20 backdrop-blur-md ring-1 ring-white/20">
                     <svg className="h-5 w-5 fill-white" viewBox="0 0 24 24">
                       <path d="M8 5v14l11-7z" />
                     </svg>
                   </div>
                </div>
              )}

              {/* Cinematic Overlay */}
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 opacity-0 backdrop-blur-[2px] transition-all duration-500 group-hover:opacity-100">
                <div className="flex items-center gap-10 text-white scale-90 transition-transform duration-500 group-hover:scale-100">
                  <div className="flex flex-col items-center gap-2">
                    <span className="text-3xl filter drop-shadow-lg" style={emojiStyle}>❤️</span>
                    <span className="text-sm font-black tracking-widest">{post.likes}</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <span className="text-3xl filter drop-shadow-lg" style={emojiStyle}>💬</span>
                    <span className="text-sm font-black tracking-widest">{post.comments}</span>
                  </div>
                </div>
                
                <div className="mt-8 flex items-center gap-2 rounded-full bg-white px-6 py-2 text-[10px] font-black tracking-[0.2em] text-black uppercase transform translate-y-4 transition-all duration-500 group-hover:translate-y-0">
                   View on Instagram
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* Ambient background glows */}
        <div className="pointer-events-none absolute top-1/2 left-0 -translate-x-1/2 h-[500px] w-[500px] rounded-full bg-red-600/5 blur-[150px]" />
        <div className="pointer-events-none absolute bottom-0 right-0 translate-x-1/4 h-[600px] w-[600px] rounded-full bg-yellow-600/5 blur-[180px]" />
      </div>

      <style>{`
        @keyframes living-zoom {
          0% { transform: scale(1) rotate(0deg); }
          50% { transform: scale(1.1) rotate(1deg); }
          100% { transform: scale(1) rotate(0deg); }
        }
      `}</style>
    </section>
  );
};

export default InstagramFeed;
