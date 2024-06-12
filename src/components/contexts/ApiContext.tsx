/* eslint-disable @typescript-eslint/no-unused-vars */
import { VideoData, Course, SecurityDomain, WorkspaceId, Podcast, Channel, ChannelSubs } from '@/types/types';
import React, { useEffect, useState } from 'react';
import { createContext, useContext } from 'react';
import useGetWorkspaceInfo from '../hooks/useGetWorkspaceInfo';
import useIsOwner from '../hooks/useIsOwner';
import useIsPartner from '../hooks/useIsPartner';
import useData from '../hooks/useData';
import { Loader } from '../Loader';

interface ApiContextType {
  isPartner: boolean;
  isOwner: boolean;
  dataFileId: string;
  data: VideoData;
  setData: React.Dispatch<React.SetStateAction<VideoData>>;
  addSub: React.Dispatch<any>;
  removeSub: React.Dispatch<any>;
  channels: Channel[];
  channel_subs: ChannelSubs;
  workspaceId: WorkspaceId;
  userId: string;
  userName: string;
  apiCertificate: string;
  folderName: string;
  folderSecurityDomain: SecurityDomain;
  folderId: string;
}

const ApiContext = createContext<ApiContextType | null>(null);

export const useApiContext = () => {
  const apiContext = useContext(ApiContext);

  if (!apiContext) {
    throw new Error(
      'useApiContext has to be used within <ApiContext.Provider>'
    );
  }

  return apiContext;
};

export const ApiProvider = ({ children }: { children: React.ReactNode }) => {
  const { workspaceUrls, userId, apiCertificate, userName } =
    useGetWorkspaceInfo();
  const { isOwner, isLoadingOwner } = { isOwner: true, isLoadingOwner: false }//useIsOwner();
  // const { isPartner, isLoadingPartner } ={ isPartner:true, isLoadingPartner:false }  //useIsPartner();
  // const { isOwner, isLoadingOwner } = useIsOwner();
  const { isPartner, isLoadingPartner } = useIsPartner();
  const {
    workspaceData,
    dataFileId,
    folderName,
    folderSecurityDomain,
    folderId,
    isLoadingData,
  } = useData();
  const [data, setData] = useState<VideoData>({});
  const [channels, setchannels] = useState<Channel[]>([]);
  const [channel_subs, setSubs] = useState<ChannelSubs>({});

  const addSub = (channel_id: string) => {

    let ar = channel_subs[channel_id] ?? [];
    channel_subs[channel_id] = ar;
    ar.push(userId)
    setData({ ...data, channel_subs: { ...data.channel_subs, ...channel_subs } })
  }

  const removeSub = (channel_id: string) => {

    let ar = channel_subs[channel_id] ?? [];
    ar = ar.filter((a => a != userId))
    channel_subs[channel_id] = ar;
    setData({ ...data, channel_subs: { ...data.channel_subs, ...channel_subs } })
  }

  useEffect(() => {
    setData(workspaceData);
    if (workspaceData.channels) {
      setchannels(workspaceData.channels);
      setSubs(workspaceData?.channel_subs);
    }
  }, [workspaceData]);

  return (
    <ApiContext.Provider
      value={{
        isPartner,
        dataFileId,
        data,
        setData,
        addSub,
        removeSub,
        isOwner,
        channels,
        channel_subs,
        workspaceId: workspaceUrls,
        userId,
        userName,
        apiCertificate,
        folderName,
        folderSecurityDomain,
        folderId,
      }}
    >
      {isLoadingData || isLoadingOwner || isLoadingPartner ? (
        <Loader />
      ) : (
        children
      )}
    </ApiContext.Provider>
  );
};
