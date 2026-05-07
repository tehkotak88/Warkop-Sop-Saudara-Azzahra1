import { SITE_CONFIG } from '../../../config/site';

const InstagramFeed = () => {
  const posts = [
    { id: 1, url: 'C:\\Users\\asusn\\.gemini\\antigravity\\brain\\fd1e0deb-55d3-40e3-a1c2-c188c39aa70d\\ig_post_1_nature_1778179871834.png', likes: '1.5k', comments: '62' },
    { id: 2, url: 'C:\\Users\\asusn\\.gemini\\antigravity\\brain\\fd1e0deb-55d3-40e3-a1c2-c188c39aa70d\\ig_post_2_gowa_1778179885916.png', likes: '920', comments: '41' },
    { id: 3, url: 'C:\\Users\\asusn\\.gemini\\antigravity\\brain\\fd1e0deb-55d3-40e3-a1c2-c188c39aa70d\\ig_post_3_eid_1778179900544.png', likes: '2.1k', comments: '85' },
    { id: 4, url: 'C:\\Users\\asusn\\.gemini\\antigravity\\brain\\fd1e0deb-55d3-40e3-a1c2-c188c39aa70d\\ig_post_4_lunch_1778179914129.png', likes: '1.2k', comments: '56' },
    { id: 5, url: 'C:\\Users\\asusn\\.gemini\\antigravity\\brain\\fd1e0deb-55d3-40e3-a1c2-c188c39aa70d\\ig_post_5_rugidong_1778179929552.png', likes: '3.4k', comments: '150' },
    { id: 6, url: 'C:\\Users\\asusn\\.gemini\\antigravity\\brain\\fd1e0deb-55d3-40e3-a1c2-c188c39aa70d\\ig_post_6_branding_yellow_1778179944484.png', likes: '850', comments: '12' },
  ];

  return (
    <section id="instagram" className="relative overflow-hidden bg-red-950 py-24">
      <div className="container relative z-10 mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="mb-16 flex flex-col items-center justify-between gap-6 md:flex-row">
          <div className="text-center md:text-left">
            <span className="mb-2 inline-block text-[10px] font-bold tracking-[0.5em] text-yellow-500 uppercase">
              Social Media
            </span>
            <h2 className="font-serif text-4xl font-bold text-white md:text-5xl">
              Ikuti Perjalanan <span className="text-white/30 italic">Kami</span>
            </h2>
            <p className="mt-3 text-sm text-white/50">
              Bagikan momen favoritmu bersama kami di Instagram
            </p>
          </div>
          
          <a
            href={SITE_CONFIG.contact.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-3 rounded-full border border-yellow-500/20 bg-yellow-500/5 px-8 py-4 transition-all hover:border-yellow-500/40 hover:bg-yellow-500/10"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-500" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.85s-.011 3.584-.069 4.85c-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.069-4.85.069s-3.584-.011-4.85-.069c-3.225-.148-4.771-1.664-4.919-4.919-.058-1.265-.069-1.645-.069-4.85s.011-3.584.069-4.85c.149-3.225 1.664-4.771 4.919-4.919C8.416 2.175 8.796 2.163 12 2.163zm0 5.467a4.37 4.37 0 100 8.74 4.37 4.37 0 000-8.74zM12 15a3 3 0 110-6 3 3 0 010 6zm6.363-8.87a1.2 1.2 0 110-2.4 1.2 1.2 0 010 2.4z" />
            </svg>
            <span className="text-xs font-bold tracking-widest text-white uppercase">@warkopsop_azzahra</span>
          </a>
        </div>

        {/* Instagram Grid */}
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-6">
          {posts.map((post) => (
            <a
              key={post.id}
              href={SITE_CONFIG.contact.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-square overflow-hidden rounded-2xl border border-white/5 bg-stone-900 shadow-2xl"
            >
              <img
                src={post.url}
                alt={`Instagram post ${post.id}`}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-red-950/60 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <div className="flex items-center gap-6 text-white">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">❤️</span>
                    <span className="text-sm font-bold">{post.likes}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xl">💬</span>
                    <span className="text-sm font-bold">{post.comments}</span>
                  </div>
                </div>
                <div className="mt-4 rounded-full bg-white/10 px-4 py-1.5 text-[10px] font-bold tracking-widest uppercase">
                  View on Instagram
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* Decorative elements */}
        <div className="absolute top-1/2 left-0 -translate-x-1/2 h-[300px] w-[300px] rounded-full bg-red-900/10 blur-[100px]" />
        <div className="absolute bottom-0 right-0 translate-x-1/4 h-[400px] w-[400px] rounded-full bg-yellow-900/5 blur-[120px]" />
      </div>
    </section>
  );
};

export default InstagramFeed;
