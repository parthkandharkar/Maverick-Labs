import instance from './axios'
export const list = (data) => {
    return instance.get('clients/', data)
}