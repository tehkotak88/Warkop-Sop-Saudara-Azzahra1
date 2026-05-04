import { SITE_CONFIG } from '../../config/site';

const Footer = () => {
  return (
    <footer className="border-t border-stone-800 bg-stone-900 pt-16 pb-8 text-stone-400">
      <div className="container mx-auto px-6">
        <div className="mb-12 flex flex-col items-center text-center">
          <h2 className="mb-6 text-4xl font-bold text-white font-serif">
            Warkop <span className="italic text-red-700">Azzahra</span>
          </h2>
          <p className="mb-8 max-w-2xl text-lg leading-relaxed text-stone-500">
            {SITE_CONFIG.copy.footerDescription}
          </p>
          <div className="flex items-center gap-2">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-red-800" />
            <div className="h-2 w-2 rounded-full bg-yellow-400" />
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-red-800" />
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center justify-between border-t border-stone-800 pt-8 text-center text-sm md:flex-row px-6">
        <p>
          &copy; {new Date().getFullYear()} {SITE_CONFIG.brandName}. All Rights
          Reserved.
        </p>
        <p className="mt-2 text-stone-600 md:mt-0">
          Crafted with ❤️ in Makassar
        </p>
      </div>
    </footer>
  );
};

export default Footer;
