export interface User {
  id: string
  isTeacher: boolean
  avatar: string
  name: string
  gender: Gender
  phone: string
  email: string
  studentId: string
  dormitory: string
  classId: number
  className: string
  school: string
  department: string
  major: string
  year: number
}

export enum Gender {
  SECRET = 0,
  MALES = 1,
  FEMALE = 2,
  OTHER = 3,
}

export const genderStrings = ['保密', '男', '女', '其他',]

export const stringToGender = (str: string): Gender => {
  return genderStrings.indexOf(str)
}

export const genderToString = (gender: Gender) => {
  return genderStrings[gender]
}
