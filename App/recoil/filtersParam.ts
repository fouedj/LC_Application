import {atom, useRecoilValue, useSetRecoilState} from 'recoil';

const announce = atom({
  key: 'filtersParam',
  default: '',
});

const useGetFiltersParam = () => {
  return useRecoilValue(announce);
};
const useSetFiltersParam = () => {
  return useSetRecoilState(announce);
};

export {useGetFiltersParam, useSetFiltersParam};
