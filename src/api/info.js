import request from './config'

export const apiDashboardGet = (params) => request.get('dashboard', { params })

export const apiStatisticGet = (params) => request.get('statistic', { params })
