import Axios from 'axios';
import {BASE_API} from '../shared/constant/app'
const Http=Axios.create({
    baseURL: BASE_API
})
export default Http