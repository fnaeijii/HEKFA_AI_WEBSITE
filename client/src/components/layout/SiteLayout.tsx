import { Outlet } from 'react-router-dom';
import Navigation from './Navigation';
import Footer from './Footer';
import NeuralBackground from '../effects/NeuralBackground';
import { LayoutProvider } from '@/contexts/LayoutContext';
// import AIChatbot from '../ui/AIChatbot';

const SiteLayout = () => {
  return (
    <div className="min-h-screen relative">
      <LayoutProvider>
      <NeuralBackground />
      <Navigation />
      <main>
        {/* این بخش مهم است: صفحات فرزند در اینجا رندر می‌شوند */}
        <Outlet />
      </main>
      <Footer />
      {/* <AIChatbot /> */}
      </LayoutProvider>
    </div>
  );
};

export default SiteLayout;
