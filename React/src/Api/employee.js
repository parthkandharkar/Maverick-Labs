import { data } from 'autoprefixer'
import instance from './axios'
export const list = () => {
    return instance.get('employees/')
}