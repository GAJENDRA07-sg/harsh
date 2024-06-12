import { CustomWindow } from '@/types/types';
import useGetUserInfo from './useGetUserInfo';

const dummyCertificate ='TkEyUFJEMDAwNF4jXmRsSGtFZWltNlA4NEJ3cThOc3U2cVpXYzNtLVhsMS1jeEZpd2lLT0h0OE83bWJCSWV4VXk1M3dJV3lEMHNIb0pEQlJvbWpUc2RhRFNOMDU0cHhlVHZVb0tLTGUxY3V6aFJVRGVhdUJ0ejBSQlFzclpDeHZrNWdLaVEyUEc5RmR2WGVXbXVqQTViTWpaT0l2YmJMVldQZw';
const dummyUrl = '../../../../production/NA2PRD0004/sabacr283185534517346391';
const dummyUserId = 'emplo000000003081309';

const iFrame =
  window.parent.document.querySelector<HTMLIFrameElement>('#workspace');
const splitUrl =
  iFrame?.contentWindow?.location.pathname.split('/') || dummyUrl.split('/');

const customWindow = window.parent.parent as CustomWindow;

const useGetWorkspaceInfo = () => {
  const { userData } = useGetUserInfo();
  const workspaceUrls = {
    contentId: splitUrl[-2],
    contentLocation: splitUrl[-1],
  };

  const userId = customWindow?.Saba?.site?.env?.session?.userId || dummyUserId;
  const apiCertificate =
    customWindow?.Saba?.site?.env?.microapp?.apiCertificate || dummyCertificate;

  console.log('certs',apiCertificate,userId,dummyCertificate,dummyUserId);
  
  return {
    workspaceUrls,
    userId,
    userName: userData?.userName || '',
    apiCertificate,
  };
};

export default useGetWorkspaceInfo;
