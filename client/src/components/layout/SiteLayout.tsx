import { Outlet } from 'react-router-dom';

import Navigation from './Navigation';

import Footer from './Footer';

import NeuralBackground from '../effects/NeuralBackground';

// import AIChatbot from '../ui/AIChatbot';



const SiteLayout = () => {

  return (

    <div className="min-h-screen relative">

      <NeuralBackground />

      <Navigation />

      <main>

        {/* این بخش مهم است: صفحات فرزند در اینجا رندر می‌شوند */}

        <Outlet />

      </main>

      <Footer />

      {/* <AIChatbot /> */}

    </div>

  );

};



export default SiteLayout;
