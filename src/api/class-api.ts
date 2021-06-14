import { Class } from '@/types/class'
import { User } from '@/types/user'
import Axios from 'axios'

/**
 * 创建班级
 * @param params 创建班级需要的参数
 */
export const createClass = (params: CreateClassParams) => {
  return Axios.post<Class>('/classes', params)
}

/**
 * 通过班级id获取班级
 * @param id 班级id
 */
export const getClass = (id: number) => {
  return Axios.get<Class>(`/classes/${id}`)
}

/**
 * 获得该用户id创建的班级
 * @param creatorUserId 创建者用户id
 */
export const getClasses = (creatorUserId: string) => {
  return Axios.get<Class[]>('/classes', { params: { creatorUserId } })
}

/**
 * 通过班级id获取班级成员列表
 * @param id 班级id
 */
export const getClassMember = (id: number) => {
  return Axios.get<User[]>(`/classes/${id}/members`)
}

/**
 * 为班级添加新成员
 * @param classId 班级id
 * @param userId 用户id
 */
export const classAddMember = (classId: number, userId: string) => {
  return Axios.post<void>(`/classes/${classId}/members`, null, { params: { userId } })
}

/**
 * 为班级移除成员
 * @param classId 班级id
 * @param userId 用户id
 */
export const classRemoveMember = (classId: number, userId: string) => {
  return Axios.delete<void>(`/classes/${classId}/members/${userId}`)
}

interface CreateClassParams {
  name: string
  school: string
  department: string
  major: string
  year: number
}
