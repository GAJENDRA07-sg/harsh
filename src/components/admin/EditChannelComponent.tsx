import {
  Channel,
  Course,
  CourseCategory,
  CourseCode,
  CourseType,
  EnrollmentType,
  VideoData,
} from '@/types/types';
import { useCallback, useState } from 'react';
import { useApiContext } from '../contexts/ApiContext';
import { Button, TextField } from '../dataEntry';
import ListComponent from '../dataEntry/ListComponent';
import SwitchComponent from '../dataEntry/SwitchComponent';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import Note from '../Note';
// import InboxIcon from '@mui/icons-material/Inbox';
// import DraftsIcon from '@mui/icons-material/Drafts';

interface EditChannelComponentProps {
  data: VideoData;
}



const EditChannelComponent = ({data}:EditChannelComponentProps) => {
  const { setData } = useApiContext();

  const [selected, setSelected] = useState(0);
  let [channel, setChannel] = useState({})
  let [saved, setIsSaved] = useState(false)
  let [isEdit, handleIsEdit] = useState(false)
  let [toggle, handleToggle] = useState(false)
  let [index, handleIndex] = useState(-1);


  // let channel = channels[selected]


  const handleEdit = (index) => {
    // debugger
    setChannel(data.channels[index]);
    handleIsEdit(true);
    handleToggle(true)
    handleIndex(index);
  }

  const handleAddNew = () => {
    setChannel({});
    handleIsEdit(false);
    handleIndex(-1);
    handleToggle(true)
  }

  const handleCancel = () => {
    handleToggle(!toggle)
  }

  return (
    <>
      {toggle ?<Edit channel={channel} index={index} isEdit={isEdit} handleCancel={handleCancel} /> : (<section className='p-2'>
        <section className="flex justify-between items-center mx-auto my-6">
          <button
            type="button"
            onClick={handleAddNew}
            className="bg-hpBlue text-white font-semibold text-sm rounded-sm py-2 px-10 transition ease-in-out delay-150 bg-blue-500 hover:bg-grey-800 duration-100"
          >
            + Add New Channel
          </button>
        </section>
        <section className='flex h-full flex-row overflow-hidden '>
          <table className="min-w-full divide-y divide-gray-200 dark:divide-neutral-700">
            <thead>
              <tr>
                <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">Name</th>
                <th scope="col" className="px-6 py-3 text-end text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-neutral-700">
              {data.channels.map((channel,index) => (
                <tr className='hover:text-hpBlue hover:bg-gray-200'>
                  <td className="px-6 py-4 whitespace-nowrap text-lg font-medium">{channel.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-end text-sm font-medium">
                    <button type="button" onClick={()=>handleEdit(index)} className="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-blue-600 hover:text-blue-800 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-500 dark:hover:text-blue-400">Edit</button>
                  </td>

                </tr>))}

            </tbody>
          </table>
        </section>
      </section>)}
    </>
  );
};






interface EditProps {
  channel: Channel;
  index: Number;
  isEdit: Boolean;
  handleCancel: Function

}
const Edit = ({ channel, index, isEdit, handleCancel }: EditProps) => {
  let { data, setData } = useApiContext();
  let [saved, setIsSaved] = useState(false);






  const handleAdd = () => {
    const dataCopy: VideoData = JSON.parse(JSON.stringify(data));
    if (isEdit) {
      dataCopy.channels[index] = channel;
    }
    else {
      channel.id = data.channels?.length;
      dataCopy.channels?.unshift(channel)
    }
    setIsSaved(true);
    setData({ ...dataCopy });
    handleCancel();
  }


  const handleChange = (value: string, propertyName: string) => {
    // debugger
    // const dataCopy: Channel[] = JSON.parse(JSON.stringify(data));
    switch (propertyName) {
      case 'name':
        channel.name = value;
        break;
      default:
        break;
    }
  };



  return (
    <section className='flex h-full overflow-hidden'>
      <div className='flex-1 border-r py-2'>
        {/* <div className='mb-4 px-4 font-goodHeadlineMedium text-2xl uppercase text-lava text-opacity-100'>
                  {channel.name}
              </div> */}
        <fieldset className='flex h-full flex-col gap-4 overflow-auto px-4'>
          <div className='flex gap-2'>
            <TextField
              label='Title'
              value={channel?.name || ''}
              propertyName='name'
              onChange={handleChange}
            />
            {/* <TextField
                          label='Link'
                          value={channel?.link || ''}
                          propertyName='link'
                          onChange={handleChange}
                      /> */}
          </div>
          <div className='flex gap-2'>
            <Button
              onClick={handleAdd}
            // isLoading={isPending}
            >
              Add
            </Button>
            <Button className='border-yellow-800 text-yellow-600 hover:bg-yellow-200 hover:text-slate-900'
              onClick={handleCancel}
            // isLoading={isPending}
            >
              cancel
            </Button>
          </div>
          {/* <TextField
                      label='Internal Link'
                      // value={link || ''}
                      propertyName='link'
                      onChange={handleChange}
                  />
                  <TextField
                      label='Partner Link'
                      // value={partnerLink || ''}
                      propertyName='partnerLink'
                      onChange={handleChange}
                  /> */}
          <div>
            {saved && <Note variant='success'>Data saved successfully on server.</Note>}
          </div>
        </fieldset>
      </div>
    </section>
  );
};

export default EditChannelComponent;
