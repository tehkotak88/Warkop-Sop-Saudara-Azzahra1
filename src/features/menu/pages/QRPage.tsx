import MenuQRSection from '../components/MenuQRSection';

const QRPage = ({ onNavigateHome }: { onNavigateHome: () => void }) => {
  return (
    <div className="min-h-screen bg-red-950 px-6 py-20">
      <div className="container mx-auto max-w-2xl">
        <button
          onClick={onNavigateHome}
          className="mb-8 flex items-center gap-2 text-sm font-bold text-yellow-400/70 transition-colors hover:text-yellow-400"
        >
          ← Kembali ke Beranda
        </button>
        <MenuQRSection />
      </div>
    </div>
  );
};

export default QRPage;
