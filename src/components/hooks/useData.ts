import { VideoData, FolderData, WorkspaceData, WorkspaceId } from '@/types/types';
import { useQuery } from '@tanstack/react-query';
import localData from '../../data/data.json';
import useGetWorkspaceInfo from './useGetWorkspaceInfo';

interface GetFolderParamsBase {
  signal: AbortSignal;
  apiCertificate: string;
}

interface GetFolderIdParams extends GetFolderParamsBase {
  locationId: WorkspaceId;
}

interface GetDataParams extends GetFolderParamsBase {
  locationId: string;
}

interface GetJsonParams extends GetFolderParamsBase {
  contentId: string;
  contentLocation: string;
}

const dummyDomain = {
  id: '',
  displayName: '',
};

const getFolderId = async ({
  signal,
  apiCertificate,
  locationId,
}: GetFolderIdParams) => {
  const fetchUrl = `https://hpi-api.sabacloud.com/v1/content/?q=(content_location%3D%3D${locationId.contentLocation})&f=(folder_id)&includeDetails=true`;
  const response = await fetch(fetchUrl, {
    signal,
    headers: {
      sabaCertificate: apiCertificate,
    },
  });

  const workspaceData: WorkspaceData = await response.json();

  console.log('workspace data', workspaceData);

  const { url, securityDomain } = workspaceData?.results?.[0] || {};
  const { id, displayName } = workspaceData?.results?.[0]?.folder_id || {};

  return { id, displayName, url, securityDomain };
};

const getData = async ({
  signal,
  apiCertificate,
  locationId,
}: GetDataParams) => {
  const url = `https://hpi-api.sabacloud.com/v1/content/?q=(folder_id%3D%3D${locationId})&includeDetails=true&count=500`;
  const response = await fetch(url, {
    signal,
    headers: {
      sabaCertificate: apiCertificate,
    },
  });

  const folderData: FolderData = await response.json();
  console.log('folder data', folderData);

  const data = folderData?.results?.find(
    (result) => result.file_display_name === 'data.json'
  );

  return { dataLocation: data?.content_location, dataFileId: data?.id };
};

const getJson = async ({
  signal,
  apiCertificate,
  contentId,
  contentLocation,
}: GetJsonParams) => {
  const baseUrl = window.location.origin;
  console.log({ baseUrl });
  const url = `${baseUrl}/production/${contentId}/${contentLocation}/content.json`;
  const response = await fetch(url, {
    signal,
    headers: {
      sabaCertificate: apiCertificate,
    },
  });

  const jsonData: VideoData = await response.json();

  console.log('json data', jsonData);


  return jsonData;
};

const useData = () => {
  const { apiCertificate, workspaceUrls } = useGetWorkspaceInfo();

  console.log('api certs', apiCertificate, workspaceUrls);
  const { data, isLoading, isError } = useQuery({
    queryKey: ['data'],
    queryFn: async ({ signal }) => {
      const { id, displayName, securityDomain } = await getFolderId({
        signal,
        apiCertificate,
        locationId: workspaceUrls,
      });

      const dataUrl = await getData({
        signal,
        apiCertificate,
        locationId: id,
      });

      if (!workspaceUrls.contentId || !dataUrl.dataLocation) return null;

      const jsonData = await getJson({
        signal,
        apiCertificate,
        contentId: workspaceUrls.contentId,
        contentLocation: dataUrl.dataLocation,
      });

      return {
        jsonData,
        dataFileId: dataUrl.dataFileId,
        displayName,
        securityDomain,
        id,
      };
    },
    retry: false,
  });

  return {
    workspaceData: data?.jsonData || (localData as VideoData),
    dataFileId: data?.dataFileId || '',
    folderName: data?.displayName || '',
    folderSecurityDomain: data?.securityDomain || dummyDomain,
    folderId: data?.id || '',
    isLoadingData: isLoading,
    isErrorData: isError,
  };
};

export default useData;
