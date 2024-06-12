
import { useEffect, useState } from 'react';
import { HiArrowUpCircle } from "react-icons/hi2";
import { VideoCard } from "../components/videoCard";
import { Channel, Podcast, VideoData } from '@/types/types';
import { useNavigate } from 'react-router-dom';
import HeaderHP from '@/components/HeaderHP';
import { useApiContext } from '../components/contexts/ApiContext';

interface HomeProps {
  data: VideoData;
}


const Home = ({ data }: HomeProps) => {

  const { addSub, removeSub, channel_subs, userId } = useApiContext();
  const [getViewAllOne, setViewAllOne] = useState(false);
  const [getViewAllTwo, setViewAllTwo] = useState(false);

  let channels = data.channels?.map((channel) => {
    return {
      total_video: data.podcasts?.reduce((n, podcast) => podcast.channel_id === channel.id ? n + 1 : n, 0),
      isSubbed: channel_subs[channel.id + '']?.includes(userId),
      backgroundImage: channel.name.toLowerCase().includes('computing') ? "./images/i5.png" : "./images/i6.png",
      ...channel
    }
  })


  let subbedChannels = channels?.filter(channel => channel.isSubbed)


  const navigate = useNavigate();

  const handleNavigate = (channel_data: Channel) => {
    // debugger
    navigate('/channel', { state: channel_data });
  };

  useEffect(() => {
    document.title = "Welcome to Podcast";
  }, []);

  const handleViewClickOne = () => {
    setViewAllOne((prevSubsUnsubs) => !prevSubsUnsubs);
  };

  const handleViewClickTwo = () => {
    setViewAllTwo((prevSubsUnsubs) => !prevSubsUnsubs);
  };

  const handleSubscribe = (subscribe: Boolean, channel_id) => {
    if (subscribe) {
      return removeSub(channel_id)
    }
    addSub(channel_id)
  }
  return (
    <main>
      <div className="w-100 h-screen antialiased font-sans bg-gray-100 overflow-hidden overflow-y-auto">
        <div className="container w-100 mx-auto">
          {/* Top Part */}
          <HeaderHP />
          {/* Add New Channel */}
          <section className="flex justify-between items-center mx-auto my-6">
            {/* <button
              type="button"
              className="bg-[#0296D6] text-white font-semibold text-sm rounded-sm py-2 px-10"
            >
              + Add New Channel
            </button> */}
          </section>
          {/* My Video Channels */}
          <section className="relative flex bg-white shadow-md rounded-sm my-6">
            {/* main */}
            <div className="flex-1 flex flex-col justify-start items-start p-6">
              {/* Header */}
              <div className="flex justify-between items-center w-full">
                <h1 className="flex-grow text-gray-950 font-bold text-2xl leading-none">
                  My Video Channels
                </h1>
                <div className="flex justify-center items-center">
                  <button
                    className="text-gray-800 font-semibold text-sm leading-none mr-1"
                    onClick={handleViewClickOne}
                  >
                    View All
                  </button>
                  <HiArrowUpCircle
                    className={`w-8 h-8 fill-[#0296D6] p-0 m-0 leading-none ${getViewAllOne === true ? "rotate-0" : "rotate-180"
                      }`}
                  />
                </div>
              </div>
              {/* Videos */}
              <div className="relative flex justify-center items-center gap-5 w-full mt-8">

                {subbedChannels.map((d, index) => {
                  return <VideoCard
                    channelId={d.id + ''}
                    onClick={() => handleNavigate(d)}
                    key={index}
                    bgImg={d.backgroundImage}
                    title={d.name}
                    videos={d.total_video + ""}
                    recordings="0"
                    members="1119"
                    isSubsUnsubs={d.isSubbed}
                    isDisabled={true}
                    handleSubscribe={handleSubscribe}
                  />
                })}
              </div>
              {/* Videos */}
              {/* <div className={`relative justify-center items-center gap-5 w-full mt-8 ${getViewAllOne === true ? "flex" : "hidden"}`}>
                <VideoCard
                  bgImg="./images/i6.png"
                  title="Tech Tune-Up - Printing"
                  videos="102"
                  recordings="0"
                  members="1333"
                  isSubsUnsubs={true}
                />

                <VideoCard
                  bgImg="./images/i5.png"
                  title="Tech Tune-Up - Computing"
                  videos="102"
                  recordings="0"
                  members="1119"
                  isSubsUnsubs={true}
                />
              </div> */}
            </div>
            {/* Image */}
            <div className="flex">
              <img
                src="./images/podcast1.png"
                className="w-auto h-[360px] aspect-[2197/1859]"
                alt="poster"
              />
            </div>
          </section>
          {/* New Video Channels */}
          <section className="relative flex bg-white shadow-md rounded-sm my-6">
            <div className="flex-1 flex flex-col justify-start items-start p-6">
              {/* Header */}
              <div className="flex justify-between items-center w-full">
                <h1 className="flex-grow text-gray-950 font-bold text-2xl leading-none">
                  New Video Channels
                </h1>
                <div className="flex justify-center items-center">
                  <button
                    className="text-gray-800 font-semibold text-sm leading-none mr-1"
                    onClick={handleViewClickTwo}
                  >
                    View All
                  </button>
                  <HiArrowUpCircle
                    className={`w-8 h-8 fill-[#0296D6] p-0 m-0 leading-none ${getViewAllTwo === true ? "rotate-0" : "rotate-180"
                      }`}
                  />
                </div>
              </div>
              {/* Videos */}
              <div className="relative flex justify-center items-center gap-4 w-full mt-8">
                {channels.map((d, index) => {
                  return <VideoCard
                    channelId={d.id + ''}
                    onClick={() => { }}
                    key={index}
                    bgImg={d.backgroundImage}
                    title={d.name}
                    videos={d.total_video + ""}
                    recordings="0"
                    members="1119"
                    isSubsUnsubs={d.isSubbed}
                    isDisabled={false}
                    handleSubscribe={handleSubscribe}
                  />
                })}
              </div>
              {/* Videos */}

            </div>
          </section>
        </div>
      </div>
    </main>
  );
};

export default Home;
