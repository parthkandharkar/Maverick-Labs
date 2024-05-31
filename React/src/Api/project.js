import instance from './axios'
export const create = (data) => {
    return instance.post('projects/', data)
}

export const list = () => {
    return instance.get('projects/',)
}


export const partial_update = (ProjectID,data) => {
    return instance.patch(`projects/${ProjectID}/`,data)
}


export const destroy = (Id) => {
    return instance.delete(`projects/${Id}/`)
}


export const delete1 = (data) => {
    return instance.post('projects/delete1/',data)
}