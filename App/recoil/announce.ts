import {atom, useRecoilValue, useSetRecoilState} from 'recoil';

const announce = atom({
  key: 'announce',
  default: '',
});

const AnnounceState = {
  announce,
  useGet: () => useRecoilValue(announce),
  useSet: () => useSetRecoilState(announce),
};

export default AnnounceState;
