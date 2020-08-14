import request from './config'

export const apiRecordGetAll = (params) => request.get('records', { params })

export const apiRecordGet = (id) => request.get(`records/${id}`)

export const apiRecordPost = (data) => request.post('records', data)

export const apiRecordPut = (id, data) => request.put(`records/${id}`, data)

export const apiRecordDelete = (id) => request.delete(`records/${id}`)

// type
export const apiRecordTypeGetAll = (params) => request.get('record_types', { params })

export const apiRecordTypeGet = (id) => request.get(`record_types/${id}`)

export const apiRecordTypePost = (data) => request.post('record_types', data)

export const apiRecordTypePut = (id, data) => request.put(`record_types/${id}`, data)

export const apiRecordTypeDelete = (id) => request.delete(`record_types/${id}`)
