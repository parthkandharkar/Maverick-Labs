import instance from './axios'
export const login = (data) => {
    return instance.post('employees/userlogin/', data)
}

export const logout = (data) => {
    return instance.post('employees/userlogout/', data)
}

export const details = () => {
    return instance.get('employees/details/')
}

export const partial_update = (employeeId,data) => {
    return instance.patch(`employees/${employeeId}/`,data)
}

export const password = (data) => {
    return instance.post('employees/password/',data)
}