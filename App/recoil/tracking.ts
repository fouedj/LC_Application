import {atom, useRecoilValue, useSetRecoilState} from 'recoil';

const visitor_id = atom({
  key: 'visitor_id',
  default: '',
});

const VisitorIdState = {
  visitor_id,
  useGet: () => useRecoilValue(visitor_id),
  useSet: () => useSetRecoilState(visitor_id),
};

export default VisitorIdState;
