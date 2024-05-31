import { data } from 'autoprefixer'
import instance from './axios'
export const list = (data) => {
    return instance.get('stints/', data)
}

export const create = (data) => {
    return instance.post('stints/',data)
}


export const partial_update = (StintID,data) => {
    return instance.patch(`stints/${StintID}/`,data)
}

export const destroy = (Id) => {
    return instance.delete(`stints/${Id}/`)
}

export const delete1 = (data) => {
    return instance.post('stints/delete1/',data)
}