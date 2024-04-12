import axios from 'axios';
import {ApiBaseUrl} from '../config/constants';

export default axios.create({
  baseURL: ApiBaseUrl?.refreshTokenApi,
});
