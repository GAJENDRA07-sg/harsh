/* eslint-disable @typescript-eslint/no-unused-vars */
import { useApiContext } from '../contexts/ApiContext';
import { Popover, PopoverContent } from '../utility/Popover';
import { Tab, TabPanels, TabPanel, TabGroup, TabList } from '@headlessui/react';
import TabListItem from './TabListItem';
// import TabPanel from './TabPanel';
import EditChannelComponent from './EditChannelComponent';
import EditPodcastComponent from './EditPodcastComponent';
import FooterButtons from './FooterButtons';
import AdminPanelHeader from './AdminPanelHeader';

interface AdminPopoverProps {
  open: boolean;
  setIsAdminPanelOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const AdminPopover = ({ open, setIsAdminPanelOpen }: AdminPopoverProps) => {
  const { data, channels } = useApiContext();

  console.log(data);



  const handleCloseAdminPanel = () => {
    setIsAdminPanelOpen(false);
  };

  return (
    <Popover
      open={open}
      modal
      fixed
    >
      <PopoverContent className='fixed left-0 top-0 flex h-full w-full items-start overflow-hidden rounded-xl bg-black bg-opacity-10 py-8 backdrop-blur-md'>
        <div className='relative mx-auto flex max-h-[800px]  w-full max-w-[1200px] flex-col bg-white bg-opacity-90 shadow-2xl'>
          <AdminPanelHeader onClose={handleCloseAdminPanel} />

          <div className='flex h-[80vh] overflow-hidden border-b border-t border-black border-opacity-10'>
            <TabGroup className='flex w-full'>
              <TabList className='flex=col flex max-w-[200px] flex-col overflow-auto border-r border-black border-opacity-10'>
                <TabListItem
                  // key={code}
                  label={"Categories"}
                />
                {/* <TabListItem
                  // key={code}
                  label={"Sub Categories"}
                /> */}
                <TabListItem
                  // key={code}
                  label={"Podcast"}
                />
              </TabList>
              <TabPanels className='flex-1'>
                <TabPanel>
                  <EditChannelComponent
                    data={data}
                  />
                </TabPanel>
                <TabPanel className='h-full'>
                  <EditPodcastComponent
                    key={channels[0].name}
                  // channel={channels[0]}
                  />
                </TabPanel>
                {/* <TabPanel>
                  <EditChannelComponent
                    key={data[0].name}
                    // channel={data[0]}
                  />
                </TabPanel> */}

              </TabPanels>
            </TabGroup>
          </div>
          <FooterButtons data={data} />
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default AdminPopover;
