import {atom, selector, useRecoilValue, useSetRecoilState} from 'recoil';
import {decodeToken} from '../utils/Token';
type TUser = {
  accessToken: string | null;
  refreshToken: string | null;
  status: boolean | null;
};
const connectedUser = atom<TUser>({
  key: 'connectedUser',
  default: {
    accessToken: '',
    refreshToken: '',
    status: true,
  },
});

const userSelector = selector({
  key: 'userSelector',
  //to convert the token to json object to recuperate email address
  get: ({get}) => {
    const token = get(connectedUser)?.accessToken;
    if (!token) {
      return null;
    }
    const tokenDecoded = decodeToken(token);
    if (!tokenDecoded || !tokenDecoded?.username) {
      return null;
    }
    return tokenDecoded;
  },
});
const connectedSelector = selector({
  key: 'connectedSelector',
  //to recuperate the status of user is connected or not with bolean value
  get: ({get}) => {
    const token = get(connectedUser)?.accessToken;
    if (!token) {
      return null;
    }
    let tokenDecoded = decodeToken(token);

    return !!tokenDecoded?.username;
  },
});
type TAccounActivePage = 'ACCOUNT' | 'LOGIN';
const accountTabPageActive = atom<TAccounActivePage>({
  key: 'loginStatePage',
  default: 'ACCOUNT',
});

const UserState = {
  userSelector,
  connectedUser,
  useGet: () => useRecoilValue(connectedUser),
  useSet: () => useSetRecoilState(connectedUser),
  useIsConnectedUser: () => useRecoilValue(connectedSelector),
  useGetDecodedUser: () => useRecoilValue(userSelector),
  //to delete the locals Token
  useInisializeState: () => {
    const setToken = useSetRecoilState(connectedUser);
    return () => {
      setToken({accessToken: null, refreshToken: null, status: false});
    };
  },
  useGetActiveAccountTabPage: () => useRecoilValue(accountTabPageActive),
  useSetActiveAccountTabPage: () => useSetRecoilState(accountTabPageActive),
};

export default UserState;
