import request from './config'

export const apiUserGetAll = (params) => request.get('users', { params })

export const apiUserGet = (id) => request.get(`users/${id}`)

export const apiUserPost = (data) => request.post('users', data)

export const apiUserPut = (id, data) => request.put(`users/${id}`, data)

export const apiUserDelete = (id) => request.delete(`users/${id}`)
