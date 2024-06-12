import React, { Fragment, useEffect, useState, useRef } from "react";
import { Menu, Transition, Tab } from "@headlessui/react";
import {
  HiMiniStar,
  HiMagnifyingGlass,
  HiMicrophone,
  HiMiniFunnel,
  HiBars3BottomLeft,
} from "react-icons/hi2";
import { MdPlayCircle } from "react-icons/md";
// import "./index.css";
import Slider from "react-slick";
import { Carausel } from "./carousel_card";
import { useLocation, useNavigate } from "react-router-dom";
import { Channel, ChannelData, Comment } from "@/types/types";
import ComputingImage from "../assets/images/i5.webp"
import PrintingImage from "../assets/images/i6.webp"

import a1 from "../assets/images/a1.webp";
import a2 from "../assets/images/a2.jpg";
import a3 from "../assets/images/a3.jpg";

import HeaderHP from "./HeaderHP";
import { Button } from "./dataEntry";
import { CommentBox } from './CommentBox';
import { AddComment } from "./AddComment";
// import 'slick-carousel/slick/slick.css';
// import 'slick-carousel/slick/slick-theme.css';

function classNames(...classes: String[]) {
  return classes.filter(Boolean).join(" ");
}

function ChannelPage() {


  const navigate = useNavigate()


  const location = useLocation();
  const channel_data: Channel = location.state; // The data passed from the Home component

  let defaultImg = channel_data.name.toLowerCase().includes('computing') ? ComputingImage : PrintingImage;

  const [getSubsUnsubs, setSubsUnsubs] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(channel_data.data[0]);
  const videoRef = useRef(null);


  const handleComment = (comment: Comment) => {
    let comments = selectedVideo.comments ?? [];
    comments.push(comment);
    setSelectedVideo({ ...selectedVideo, comments: comments })

  }
  const handleVideoClick = (action: boolean) => {
    setIsVideoPlaying(action);
  };
  const handleVideo = () => {
    // debugger
    const video = videoRef.current;
    if (video) {
      if (isVideoPlaying) {
        video.pause();
        handleVideoClick(false);
      } else {
        video.play();
        handleVideoClick(true);
      }
    }
  };
  const handleButtonClick = () => {
    setSubsUnsubs((prevSubsUnsubs) => !prevSubsUnsubs);
  };

  useEffect(() => {
    document.title = "Podcast Channel";
  }, []);

  const NextArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", opacity: "1", color: "#0296D6" }}
        onClick={onClick}
      />
    );
  };

  const PrevArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", opacity: "1", color: "#0296D6" }}
        onClick={onClick}
      />
    );
  };

  const goBack = () => {

    navigate(-1);
  }

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 2,
    customPaging: (i) => <div className="custom-dot w-4 h-4 rounded-full" />,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    variableWidth: false,
    centerMode: false,
  };

  return (
    <div className="w-100 h-screen antialiased font-sans bg-gray-100 overflow-hidden overflow-y-auto">
      <div className="container w-100 mx-auto">
        {/* Top Part */}
        <HeaderHP />
        {/* Section */}
        <div className='flex gap-2'>
          <Button
            onClick={goBack}
          // isLoading={isPending}
          >
            Go Back
          </Button>
        </div>
        {/* Video */}
        <section className="relative flex my-6">
          <div className="relative isolate flex flex-col flex-1 justify-center items-center rounded-sm overflow-hidden">
            <video
              ref={videoRef}
              key={selectedVideo.id}
              autoPlay
              className="aspect-video h-full w-fit"
              playsInline
              controls
              poster={selectedVideo.thumbnail ? selectedVideo?.thumbnail : defaultImg}
              onPlay={() => handleVideoClick(true)}
              onPause={() => handleVideoClick(false)}
            >
              <React.Fragment key={selectedVideo.id} >
                <source key={selectedVideo.id} src={selectedVideo.wise_link} type="video/mp4" />
              </React.Fragment>

              Your browser does not support the video tag.
            </video>
            <div
              className={`flex-col absolute top-5 left-5 z-10 ${isVideoPlaying === true ? "hidden" : "flex"
                }`}
            >
              <h5 className="text-white font-semibold leading-normal">
                Episode 1
              </h5>
              <h6 className="text-white font-normal text-xs leading-normal">
                6th Nov. 23 | 5:30pm | 15:00 min
              </h6>
            </div>
            <MdPlayCircle
              className={`absolute top-auto bottom-auto left-auto right-auto m-auto h-16 w-16 fill-white z-10 cursor-pointer ${isVideoPlaying === true ? "hidden" : "flex"
                }`}
              onClick={handleVideo}
            />
          </div>
          {/* Group Detail Information (Right) */}
          <div className="flex flex-col justify-start items-start p-6 min-w-96 bg-gray-200 ml-6 rounded-sm overflow-hidden">
            <h1 className="text-gray-900 font-bold text-2xl">
              Group Detail Information
            </h1>
            {/* Ratings Card */}
            <div className="flex justify-start items-start gap-3 my-6">
              <img
                className="aspect-[977/1058] w-24 h-auto rounded-sm"
                src={defaultImg}
                alt="Video Profile"
              />
              <div className="flex flex-col">
                <h1 className="text-gray-900 font-bold text-md leading-normal w-52">
                  {selectedVideo.title}
                </h1>
                <h4 className="text-gray-800 font-semibold text-xs leading-normal">
                  {channel_data.data.length} Videos
                </h4>
                <div className="flex gap-0 mt-1">
                  <HiMiniStar className="w-4 h-4 fill-yellow-400 stroke-1 stroke-gray-700" />
                  <HiMiniStar className="w-4 h-4 fill-yellow-400 stroke-1 stroke-gray-700" />
                  <HiMiniStar className="w-4 h-4 fill-yellow-400 stroke-1 stroke-gray-700" />
                  <HiMiniStar className="w-4 h-4 fill-yellow-400 stroke-1 stroke-gray-700" />
                  <HiMiniStar className="w-4 h-4 fill-none stroke-1 stroke-gray-700" />
                </div>
                <span className="text-gray-800 font-semibold text-[9px] mt-3">
                  Owner By:
                </span>
                <span className="text-gray-800 font-semibold text-[9px]">
                  Created By:
                </span>
              </div>
            </div>
            {/* Avatars and Subscribe/Unsubscribe */}
            <div className="flex justify-between gap-0 mt-3 w-full">
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  <img
                    className="inline-block h-10 w-10 rounded-full ring-2 ring-white"
                    src={a1}
                    alt="avatar"
                  />
                  <img
                    className="inline-block h-10 w-10 rounded-full ring-2 ring-white"
                    src={a2}
                    alt="avatar"
                  />
                  <img
                    className="inline-block h-10 w-10 rounded-full ring-2 ring-white"
                    src={a3}
                    alt="avatar"
                  />
                </div>
                {/* <span className="font-semibold text-[12px] text-gray-900 leading-none">
                  1333
                  <br />
                  Members
                </span> */}
              </div>
              <button
                type="button"
                className={`font-bold text-xs rounded-sm py-2 px-6 ${getSubsUnsubs === true
                  ? "border-2 border-gray-800 text-gray-800"
                  : "bg-[#0296D6] border-2 border-[#0296D6] text-white"
                  }`}
                onClick={handleButtonClick}
              >
                {getSubsUnsubs === true ? "Unsubscribe" : "Subscribe"}
              </button>
            </div>
            {/* Tags and Description */}
            <span className="text-gray-800 font-semibold text-[12px] mt-6">
              Tags: #ChanelTechTuneUp #LuxuryComputing
            </span>
            <span className="text-gray-800 font-semibold text-[12px] mt-3">
              Folders:
            </span>
            <span className="text-gray-800 font-semibold text-[12px] mt-3">
              Description:
            </span>
            <span className="text-gray-800 font-semibold text-[12px] max-w-xs mt-1">
              {selectedVideo.notes}
            </span>
          </div>
        </section>

        <section>
          <h2 className="text-gray-900 font-bold text-lg">
            Comments
          </h2>
          {selectedVideo.comments?.map((comment, index) => (<CommentBox comment={comment} />))}
          <AddComment handleSubmit={handleComment} />
        </section>

        {/* Section */}
        <section className="relative flex flex-col rounded-sm bg-white py-6 px-8 my-6 shadow-lg">
          <h1 className="text-gray-900 font-bold text-2xl">
            Related Recordings
          </h1>
          {/* Search Bar & Filters */}
          <div className="flex gap-3 w-ful my-6">
            {/* Search Box */}
            <div className="flex flex-1 relative isolate w-auto">
              <input
                type="search"
                className="py-1 pl-10 pr-4 rounded-full ring-0 focus:ring-0 focus:outline-none outline-none border border-gray-800 w-full"
                placeholder="Search for Category, Videos"
              />
              <HiMagnifyingGlass className="absolute left-2 top-0 bottom-0 my-auto stroke-gray-700 w-5 h-5" />
              <HiMicrophone className="absolute right-2 top-0 bottom-0 my-auto fill-[#0296D6] w-5 h-5" />
            </div>
            {/* Filter */}
            <Menu as="div" className="relative">
              <div>
                <Menu.Button className="flex justify-center items-center gap-3 rounded-sm bg-[#0296D6] px-4 py-2 text-sm font-medium text-white">
                  <HiMiniFunnel className="fill-white w-3 h-3 stroke-none" />
                  Filters
                </Menu.Button>
              </div>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="z-10 absolute right-0 mt-2 w-56 origin-top-right rounded-sm bg-white shadow-lg ring-1 ring-[#0296D6] focus:outline-none">
                  <div className="p-3">
                    <h4 className="font-semibold text-sm text-gray-950 mb-3">
                      Select Filter
                    </h4>
                    <Menu.Item
                      as="div"
                      className="flex justify-start items-center gap-4"
                    >
                      <input
                        type="checkbox"
                        id="c1"
                        name="filter"
                        value="1"
                        checked
                      />
                      <label for="c1" className="text-xs">
                        Category 1
                      </label>
                    </Menu.Item>
                    <Menu.Item
                      as="div"
                      className="flex justify-start items-center gap-4 mt-3"
                    >
                      <input type="checkbox" id="c2" name="filter" value="1" />
                      <label for="c2" className="text-xs">
                        Category 2
                      </label>
                    </Menu.Item>
                    <Menu.Item
                      as="div"
                      className="flex justify-start items-center gap-4 mt-3"
                    >
                      <input type="checkbox" id="c3" name="filter" value="1" />
                      <label for="c3" className="text-xs">
                        Category 3
                      </label>
                    </Menu.Item>
                    <Menu.Item
                      as="div"
                      className="flex justify-start items-center gap-4 mt-3"
                    >
                      <input type="checkbox" id="c4" name="filter" value="1" />
                      <label for="c4" className="text-xs">
                        Category 4
                      </label>
                    </Menu.Item>
                    <Menu.Item
                      as="div"
                      className="flex justify-start items-center gap-4 mt-3"
                    >
                      <input type="checkbox" id="c5" name="filter" value="1" />
                      <label for="c5" className="text-xs">
                        Category 5
                      </label>
                    </Menu.Item>
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
            {/* Sort By */}
            <Menu as="div" className="relative">
              <div>
                <Menu.Button className="flex justify-center items-center gap-3 rounded-sm bg-[#0296D6] px-4 py-2 text-sm font-medium text-white">
                  <HiBars3BottomLeft className="fill-white w-4 h-4" />
                  Sort By
                </Menu.Button>
              </div>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="z-10 absolute right-0 mt-2 w-56 origin-top-right rounded-sm bg-white shadow-lg ring-1 ring-[#0296D6] focus:outline-none">
                  <div className="p-3">
                    <h4 className="font-semibold text-sm text-gray-950 mb-3">
                      Sort By
                    </h4>
                    <Menu.Item
                      as="div"
                      className="flex justify-start items-center gap-4"
                    >
                      <input
                        type="radio"
                        id="c6"
                        name="sortby"
                        value="1"
                        checked
                      />
                      <label for="c6" className="text-xs">
                        Date
                      </label>
                    </Menu.Item>
                    <Menu.Item
                      as="div"
                      className="flex justify-start items-center gap-4 mt-3"
                    >
                      <input type="radio" id="c7" name="sortby" value="1" />
                      <label for="c7" className="text-xs">
                        Episode
                      </label>
                    </Menu.Item>
                    <Menu.Item
                      as="div"
                      className="flex justify-start items-center gap-4 mt-3"
                    >
                      <input type="radio" id="c8" name="sortby" value="1" />
                      <label for="c8" className="text-xs">
                        Most Viewed
                      </label>
                    </Menu.Item>
                    <Menu.Item
                      as="div"
                      className="flex justify-start items-center gap-4 mt-3"
                    >
                      <input type="radio" id="c9" name="sortby" value="1" />
                      <label for="c9" className="text-xs">
                        Recent
                      </label>
                    </Menu.Item>
                    <Menu.Item
                      as="div"
                      className="flex justify-start items-center gap-4 mt-3"
                    >
                      <input type="radio" id="c10" name="sortby" value="1" />
                      <label for="c10" className="text-xs">
                        Trending
                      </label>
                    </Menu.Item>
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
          {/* Tabs */}
          <Tab.Group>
            <Tab.List className="flex justify-center items-center border-b border-gray-600">
              <Tab
                className={({ selected }) =>
                  classNames(
                    "text-sm font-medium leading-5 ring-0",
                    "focus:outline-none focus:ring-0 px-8 py-2.5",
                    selected
                      ? "text-[#0296D6] border-b border-[#0296D6]"
                      : "text-gray-800 border-none"
                  )
                }
              >
                All
              </Tab>
              <Tab
                className={({ selected }) =>
                  classNames(
                    "text-sm font-medium leading-5 ring-0",
                    "focus:outline-none focus:ring-0 px-8 py-2.5",
                    selected
                      ? "text-[#0296D6] border-b border-[#0296D6]"
                      : "text-gray-800 border-none"
                  )
                }
              >
                Category 1
              </Tab>
            </Tab.List>
            <Tab.Panels as="div" className="mt-2">
              <Tab.Panel
                className={classNames(
                  "bg-white p-3",
                  "focus:outline-none focus:ring-0"
                )}
              >
                <Slider {...settings}>
                  {channel_data?.data.map(
                    (video, index) => (
                      <div key={index} >
                        <Carausel
                          bgImg={defaultImg}
                          video={video}
                          onClick={setSelectedVideo}
                          subtitle={(new Date(video.publish_date).toLocaleDateString())}
                        /></div>
                    )
                  )}
                </Slider>
              </Tab.Panel>
              <Tab.Panel
                className={classNames(
                  "bg-white p-3",
                  "focus:outline-none focus:ring-0"
                )}
              >
              </Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
        </section>
      </div>
    </div>
  );
}

export default ChannelPage;
