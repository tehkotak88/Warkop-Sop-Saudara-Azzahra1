import HomePage from '../features/home/pages/HomePage';
import MenuPage from '../features/menu/pages/MenuPage';
import QRPage from '../features/menu/pages/QRPage';
import { useAppNavigation } from '../hooks/useAppNavigation';
import { MenuProvider } from './MenuContext';

const App = () => {
  const { currentPath, navigateToPath, navigateToSection } = useAppNavigation();

  const renderContent = () => {
    switch (currentPath) {
      case '/menu':
        return <MenuPage onNavigateHome={() => navigateToPath('/')} />;
      case '/qr':
        return <QRPage onNavigateHome={() => navigateToPath('/')} />;
      default:
        return <HomePage onNavigate={navigateToSection} />;
    }
  };

  return (
    <MenuProvider>
      {renderContent()}
    </MenuProvider>
  );
};

export default App;
