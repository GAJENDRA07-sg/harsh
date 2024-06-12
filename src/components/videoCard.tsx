import { Channel } from "@/types/types";
import { useEffect, useState } from "react";
import a1 from "../assets/images/a1.webp";
import a2 from "../assets/images/a2.jpg";
import a3 from "../assets/images/a3.jpg";


interface VideoCardProps {
  channelId:string
  bgImg: string;
  title: string;
  videos: string;
  recordings: string;
  members: string;
  isSubsUnsubs: Boolean;
  onClick: Function;
  handleSubscribe: Function;
  isDisabled?:Boolean;
}

export const VideoCard = ({
  channelId,
  bgImg,
  title,
  videos,
  recordings,
  members,
  isSubsUnsubs,
  onClick,
  handleSubscribe,
  isDisabled
}: VideoCardProps) => {
  console.log(videos)



  useEffect(() => {
    document.title = "Welcome to Podcast";
  }, []);

  const handleButtonClick = () => {
    // Toggle the state
    handleSubscribe(isSubsUnsubs,channelId)
  };

  const handleOnCLick = () => {
    onClick()
  }
  return (
    <div onClick={handleOnCLick} className="isolate transition ease-in-out  hover:-translate-y-1 hover:scale-110 duration-300 relative aspect-[977/1058] w-auto h-[240px] rounded-sm overflow-hidden">
      <img
        src={bgImg}
        className="absolute inset-0 w-full h-full object-cover -z-10"
        alt="background"
      />
      <span className="absolute inset-0 w-full h-full bg-gray-950/10 -z-[9]" />
      <div className="flex flex-col justify-between p-4 w-full h-full">
        <div className="flex flex-col gap-1">
          {/* <Link to="/channel" className="font-bold text-sm text-white leading-none truncate mt-2">
            {title}
          </Link> */}
          <h3 className="font-semibold text-[10px] text-white leading-none">
            {videos} videos | {recordings} Recordings
          </h3>
          <div className="flex items-center gap-2 mt-3">
            <div className="flex -space-x-2">
              <img
                className="inline-block h-7 w-7 rounded-full ring-2 ring-white"
                src={a1}
                alt="avatar"
              />
              <img
                className="inline-block h-7 w-7 rounded-full ring-2 ring-white"
                src={a2}
                alt="avatar"
              />
              <img
                className="inline-block h-7 w-7 rounded-full ring-2 ring-white"
                src={a3}
                alt="avatar"
              />
            </div>
            <span className="font-semibold text-[10px] text-white leading-none">
              {members}
              <br />
              Members
            </span>
          </div>
          <div className="flex items-center gap-2 mt-3">
            <span className="font-semibold text-[18px] text-white leading-none">
              {title}
            </span>
          </div>
        </div>
        {/* {isSubsUnsubs === true && ( */}
          <button
            type="button"
            disabled={isDisabled}
            className={`mx-auto font-semibold text-xs rounded-xs py-2 px-6 ${isSubsUnsubs === true
                ? "border-2 border-white text-white"
                : "bg-[#0296D6] border-2 border-[#0296D6] text-white"
              }`}
            onClick={handleButtonClick}
          >
            {isSubsUnsubs === true ? "Unsubscribe" : "Subscribe"}
          </button>
        {/* )} */}
      </div>
    </div>
  );
};
