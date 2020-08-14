import request from './config'

export const apiAccountGetAll = (params) => request.get('accounts', { params })

export const apiAccountGet = (id) => request.get(`accounts/${id}`)

export const apiAccountPost = (data) => request.post('accounts', data)

export const apiAccountPut = (id, data) => request.put(`accounts/${id}`, data)

export const apiAccountDelete = (id) => request.delete(`accounts/${id}`)
