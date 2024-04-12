import {atom, useRecoilValue, useSetRecoilState} from 'recoil';
type TError = {
  error: any;
  screen: string;
  url: string;
};
const error = atom<TError>({
  key: 'error',
  default: {
    error: null,
    url: '',
    screen: '',
  },
});
export const useInitError = () => {
  const setError = useSetRecoilState(error);
  return () => {
    setError({error: null, url: '', screen: ''});
  };
};
const ErrorState = {
  error,
  useGet: () => useRecoilValue(error),
  useSet: () => useSetRecoilState(error),
};

export default ErrorState;
