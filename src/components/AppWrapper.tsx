import ExpertMap from './ExpertMap';
import Header from './Header';
import NavigationTabs from './NavigationTabs';
import WhatIsIt from './WhatIsIt';
import { useApiContext } from './contexts/ApiContext';
import { useCallback, useEffect, useState } from 'react';
import Home from '../pages/Home';
import { HashRouter, Route, Routes } from 'react-router-dom';
import ChannelPage from '../pages/ChannelPage';
import AdminPopover from './admin/AdminPopover';

const AppWrapper = () => {
  const { isOwner, data } = useApiContext();
  const [adminPanelOpen, setIsAdminPanelOpen] = useState(false);
  // debugger

  useEffect(() => {
    document.title = "Welcome to Podcast";
  }, []);
  const handleKeydown = useCallback(
    (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === ',') {
        console.log("is Owner");
        if (isOwner) {
        setIsAdminPanelOpen(!adminPanelOpen);
        }
      }
    },
    [adminPanelOpen, isOwner]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeydown);

    return () => {
      window.removeEventListener('keydown', handleKeydown);
    };
  }, [handleKeydown]);

  return (
    <main>
      {/* <section>
        <Header
          backgroundImage='bg-header'
          title='Poly Technical Expert Program'
          description='To help our customers and partners to acquire and demonstrate technical competency on Poly solutions, Poly University offers a training and certification program that provides a flexible, modular approach to learning.'
        />
      </section>
      <section className='bg-backgroundGray'>
        <WhatIsIt />
        <ExpertMap />
      </section>
      <section>
        <NavigationTabs />
      </section> */}
      <HashRouter>
      <Routes>
        <Route path="/" element={<Home data={data}/>} />
        <Route path="/index.html" element={<Home data={data} />} />
        <Route path="index.html" element={<Home data={data}/>} />
        <Route path="/channel" element={<ChannelPage />} />
      </Routes>
    </HashRouter>



      <AdminPopover
        setIsAdminPanelOpen={setIsAdminPanelOpen}
        open={adminPanelOpen}
      />
    </main>
  );
};

export default AppWrapper;
