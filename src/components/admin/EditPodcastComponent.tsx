import {
    Podcast,
    CourseType,
    EnrollmentType,
    VideoData,
} from '@/types/types';
import { useCallback, useState } from 'react';
import { useApiContext } from '../contexts/ApiContext';
import { Button, TextField } from '../dataEntry';
import ListComponent from '../dataEntry/ListComponent';
import SwitchComponent from '../dataEntry/SwitchComponent';
import { Alert } from '@mui/material';
import { MdPodcasts } from 'react-icons/md';
import Note from '../Note';

const enrollmentTypeOptions: EnrollmentType[] = [
    'Course',
    'Course with exam',
    'Exam',
];

const typeOptions: CourseType[] = [
    'Certification',
    'E-learning',
    'Instructor-Led',
    'Virtual Instructor-Led',
];

const EditPodcastComponent = () => {
    const { data, setData, channels } = useApiContext();
    let [podcast, setPodcast] = useState({});
    let [saved, setIsSaved] = useState(false);
    let [isEdit, handleIsEdit] = useState(false);
    let [toggle, handleToggle] = useState(false);
    let [index, handleIndex] = useState(-1);
    let [searchQuery, setSearchQuery] = useState('');
    let [filteredSuggestions, setFilteredSuggestions] = useState([]);

    const handleEdit = (index) => {
        setPodcast(data.podcasts[index]);
        handleIsEdit(true);
        handleToggle(true);
        handleIndex(index);
    };

    const handleAddNew = () => {
        setPodcast({});
        handleIsEdit(false);
        handleIndex(-1);
        handleToggle(true);
    };

    const handleCancel = () => {
        handleToggle(!toggle);
    };

    const handleDelete = (index) => {
        data.podcasts.splice(index, 1);
        setData({ ...data });
    };

    const handleSearchChange = (e) => {
        const query = e.target.value;
        setSearchQuery(query);

        if (query.length > 0) {
            const suggestions = data.podcasts.filter(podcast =>
                podcast.title.toLowerCase().includes(query.toLowerCase())
            );
            setFilteredSuggestions(suggestions);
        } else {
            setFilteredSuggestions([]);
        }
    };

    const handleSuggestionClick = (index) => {
        handleEdit(index);
        setSearchQuery('');
        setFilteredSuggestions([]);
    };

    return (
        <>
            {toggle ? (
                <Edit podcast={podcast} index={index} isEdit={isEdit} handleCancel={handleCancel} />
            ) : (
                <section className='p-2'>
                    <section className="flex justify-between items-center mx-auto my-6">
                        <button
                            onClick={handleAddNew}
                            type="button"
                            className="bg-hpBlue text-white font-semibold text-sm rounded-sm py-2 px-10 transition ease-linear delay-150 hover:bg-blue-500 duration-50"
                        >
                            + Add New Podcast
                        </button>
                        <div className="relative">
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={handleSearchChange}
                                placeholder="Search Podcasts"
                                className="px-4 py-2 border rounded-lg wd-100"
                            />
                            {filteredSuggestions.length > 0 && (
                                <ul className="absolute z-10 bg-white border rounded-lg mt-1 w-full">
                                    {filteredSuggestions.map((suggestion, index) => (
                                        <li
                                            key={index}
                                            onClick={() => handleSuggestionClick(index)}
                                            className="px-4 py-2 cursor-pointer hover:bg-gray-200"
                                        >
                                            {suggestion.title}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </section>
                    <section className='flex h-full flex-row overflow-scroll '>
                        <table className="table-auto min-w-full divide-y divide-gray-100 ">
                            <thead>
                                <tr>
                                    <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">Name</th>
                                    <th scope="col" className="px-6 py-3 text-end text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 dark:divide-neutral-700 overflow-auto">
                                {data.podcasts?.map((podcast, index) => (
                                    <tr key={index + 'td'} className='hover:text-hpBlue hover:bg-gray-200'>
                                        <td className="px-6 py-2 whitespace-nowrap text-sm font-medium">{podcast.title}</td>
                                        <td className="px-6 py-2 whitespace-nowrap text-end text-sm font-medium">
                                            <button type="button" onClick={() => handleEdit(index)} className="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-blue-600 hover:text-hpBlue">Edit</button>|
                                            <button type="button" onClick={() => handleDelete(index)} className="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-blue-600 hover:text-blue-800 disabled:opacity-50 disabled:pointer-events-none">Delete</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </section>
                </section>
            )}
        </>
    );
};

interface EditProps {
    podcast: Podcast;
    index: Number;
    isEdit: Boolean;
    handleCancel: Function;
}

const Edit = ({ podcast, index, isEdit, handleCancel }: EditProps) => {
    let { channels, data, setData } = useApiContext();
    let [saved, setIsSaved] = useState(false);

    const handleAdd = () => {
        const requiredFields = ['title', 'link', 'length', 'video_id', 'publish_date', 'channel'];
        const allFieldsFilled = requiredFields.every(field => podcast[field] && podcast[field].trim() !== '');

        if (allFieldsFilled) {
            const dataCopy: VideoData = JSON.parse(JSON.stringify(data));
            if (isEdit) {
                dataCopy.podcasts[index] = podcast;
            } else {
                dataCopy.podcasts?.unshift(podcast);
            }
            setIsSaved(true);
            setData({ ...dataCopy });
            handleCancel();
        } else {
            alert('Please fill in all required fields.');
        }
    };

    const handleChange = (value: string, propertyName: string) => {
        const updatedPodcast = { ...podcast, [propertyName]: value };
        setPodcast(updatedPodcast);
    };

    return (
        <section className='flex h-full overflow-hidden'>
            <div className='flex-1 border-r py-2'>
                <fieldset className='flex h-full flex-col gap-4 overflow-auto px-4'>
                    <div className='flex gap-2'>
                        <TextField
                            label='Title'
                            value={podcast?.title || ''}
                            propertyName='title'
                            onChange={handleChange}
                        />
                        <TextField
                            label='Link'
                            value={podcast?.link || ''}
                            propertyName='link'
                            onChange={handleChange}
                        />
                    </div>
                    <div className='flex gap-2'>
                        <TextField
                            label='Duration'
                            value={podcast?.length || ''}
                            propertyName='length'
                            onChange={handleChange}
                        />
                        <TextField
                            label='Video Id'
                            value={podcast?.video_id || ''}
                            propertyName='video_id'
                            onChange={handleChange}
                        />
                    </div>
                    <div className='flex gap-2'>
                        <TextField
                            label='Publish Date'
                            value={podcast?.publish_date || ''}
                            propertyName='publish_date'
                            onChange={handleChange}
                        />
                        <TextField
                            label='Thumbnail Link'
                            propertyName='thumbnail'
                            onChange={handleChange}
                        />
                    </div>
                    <div className='flex gap-2'>
                        <ListComponent
                            label='Channel'
                            value={podcast.channel}
                            optionKey='name'
                            options={channels}
                            propertyName='channel'
                            onChange={handleChange}
                        />
                        <TextField
                            label='Tags'
                            propertyName='tags'
                            onChange={handleChange}
                        />
                    </div>
                    <div className='flex gap-2'>
                        <TextField
                            label='Description'
                            propertyName='description'
                            onChange={handleChange}
                        />
                    </div>
                    <div className='flex gap-2'>
                        <Button onClick={handleAdd}>Publish</Button>
                        <Button className='border-yellow-800 text-yellow-600 hover:bg-yellow-200 hover:text-slate-900' onClick={handleCancel}>Cancel</Button>
                    </div>
                    <div>
                        {saved && <Note variant='success'>Data saved successfully on server.</Note>}
                    </div>
                </fieldset>
            </div>
        </section>
    );
};

export default EditPodcastComponent;


