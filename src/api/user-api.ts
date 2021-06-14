import { getCookieValue } from '@/common/common';
import { Gender, User } from '@/types/user';
import Axios, { AxiosError } from 'axios';

/**
 * 注册
 * @param user user对象包含账号、密码、是否为老师等信息
 */
export const register = (user: CreateUserParams) => {
  return Axios.post<void>('/users', user)
}

/**
 * 登录获取的token保存在cookie中。
 * @param id id
 * @param password 密码
 */
export const logIn = (id: string, password: string) => {
  return Axios.post<void>('/token', { id, password })
}

/**
 * 判断用户名是否已被使用，只有后端返回404时才会返回true。
 * @param id id
 */
export const contains = async (id: string) => {
  try {
    await Axios.get(`/users/${id}`)
    return false
  } catch (error) {
    return (error as AxiosError).response?.status == 404
  }
}

/**
 * 获取用户信息
 * @param id 用户id
 */
export const getUser = (id: string) => {
  return Axios.get<User>(`/users/${id}`)
}

/**
 * 修改用户资料
 * @param id 用户id
 * @param profile 新用户资料
 */
export const updateProfile = (id: string, profile: UpdateProfileParams) => {
  return Axios.put<User>(`/users/${id}`, profile)
}

/** 删除token, 退出登录。 */
export const logOut = async () => {
  document.cookie = `token=;`;
}

/** 判断是否已登录 */
export const hasLoggedIn = async () => {
  let userId = getCookieValue('token')
  return userId != undefined && userId != ''
}

/** 创建用户所需的参数 */
interface CreateUserParams {
  id: string          // 用户名
  password: string    // 密码
  isTeacher: boolean  // 是否为老师
  name: string        // 名字
}

/** 更新用户信息所需要参数 */
interface UpdateProfileParams {
  name: string      // 姓名
  gender: Gender    // 性别
  phone: string     // 手机
  email: string     // 电子邮件
  studentId: string // 学号
  dormitory: string // 宿舍
}
