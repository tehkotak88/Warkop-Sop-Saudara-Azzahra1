import HomePage from '../features/home/pages/HomePage';
import MenuPage from '../features/menu/pages/MenuPage';
import DigitalMenuPage from '../features/menu/pages/DigitalMenuPage';
import QRISPage from '../features/menu/pages/QRISPage';
import { useAppNavigation } from '../hooks/useAppNavigation';
import { MenuProvider } from './MenuContext';

const App = () => {
  const { currentPath, navigateToPath, navigateToSection } = useAppNavigation();

  const renderContent = () => {
    switch (currentPath) {
      case '/menu':
        return <MenuPage onNavigateHome={() => navigateToPath('/')} />;
      case '/digital-menu':
        return <DigitalMenuPage onNavigateHome={() => navigateToPath('/')} />;
      case '/qris':
        return <QRISPage onNavigateHome={() => navigateToPath('/')} />;
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
