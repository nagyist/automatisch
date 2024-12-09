import useLicense from './useLicense';

export default function useSupportAuthClient() {
  const { data: license } = useLicense();

  return false;

  return license?.data.verified === true;
}
