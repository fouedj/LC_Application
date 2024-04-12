import {atom, useRecoilValue, useSetRecoilState} from 'recoil';

const network = atom({
  key: 'network',
  default: null || true,
});

const NetworkState = {
  network,
  useGetNetworkState: () => useRecoilValue(network),
  useSetNetworkState: () => useSetRecoilState(network),
};

export default NetworkState;
