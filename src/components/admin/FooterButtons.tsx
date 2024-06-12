import {  VideoData } from '@/types/types';
import { Button, Link } from '../dataEntry';
import useImportData from '../hooks/useImportData';

interface FooterButtonsProps {
  data: VideoData;
}

interface NoteProps {
  variant: 'error' | 'success';
  children: React.ReactNode;
}

const Note = ({ variant, children }: NoteProps) => {
  let variantClasses = '';

  switch (variant) {
    case 'error':
      variantClasses = 'bg-red-200 text-red-600';
      break;
    case 'success':
      variantClasses = 'bg-green-200 text-green-600';
  }

  return (
    <div
      className={`mr-auto flex items-center px-4 py-2 font-goodHeadlineMedium ${variantClasses}`}
    >
      {children}
    </div>
  );
};

const FooterButtons = ({ data }: FooterButtonsProps) => {
  const { mutateAsync, isSuccess, isPending, isError } = useImportData();

  const handleImportData = () => {
    mutateAsync();
  };

  return (
    <div className='flex justify-end gap-4 px-4 py-4'>
      {isSuccess ? (
        <Note variant='success'>Data saved successfully on server.</Note>
      ) : null}
      {isError ? (
        <Note variant='error'>
          Failed to save data on server, upload manually or try again later.
        </Note>
      ) : null}
      <Link
        href={`data:text/json;charset=utf-8,${encodeURIComponent(
          JSON.stringify(data)
        )}`}
        download='filename.json'
        label='Download'
      />
      <Button
        onClick={handleImportData}
        isLoading={isPending}
      >
        Publish
      </Button>
    </div>
  );
};

export default FooterButtons;
