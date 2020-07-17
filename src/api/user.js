import request from './config'

const getAll = (params) => request.get('users', { params })
const getOne = (id) => request.get(`users/${id}`)
const create = (data) => request.post('users', data)
const updateOne = (id, data) => request.put(`users/${id}`, data)
const deleteOne = (id) => request.delete(`users/${id}`)

export default {
  getAll,
  getOne,
  create,
  updateOne,
  deleteOne
}
