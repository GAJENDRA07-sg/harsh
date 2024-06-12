import { Button } from '../dataEntry';
import CloseIcon from '../icons/CloseIcon';
import PreviousIcon from '../icons/PreviousIcon';

interface HeaderProps {
  onClose: () => void;
}

const AdminPanelHeader = ({ onClose }: HeaderProps) => {
  return (
    <>
      <header className='flex justify-between px-4 py-4'>
        <div className='flex items-center'>
          <Button
            className='h-8 w-8 px-0 py-0 mr-8 mt-0'
            onClick={onClose}
          >
            <PreviousIcon />
          </Button>
          <div>
            <h1 className='font-goodHeadlineXcond text-3xl uppercase text-black'>
              Podcast Managment
            </h1>
            <p className='text-black text-opacity-70'>
              Here you can add and edit videos, channels
            </p>
          </div>
        </div>
        <div>
          <Button
            className='h-8 w-8 px-0 py-0'
            onClick={onClose}
          >
            <CloseIcon />
          </Button>
        </div>
      </header>
      <div className='px-4 pb-2 font-goodHeadlineMedium uppercase tracking-wider text-indigo'>
        Setting
      </div>
    </>
  );
};

export default AdminPanelHeader;
