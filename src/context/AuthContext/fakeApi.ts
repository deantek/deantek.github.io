import { UserType } from '../../types/UserType'
export const userDetail: UserType = {
  id: 1,
  name: 'Игорь',
  email: 'example@example.com',
  password: 'password2021',
}

export const getUser = (userData: { email: string; password: string }) => {
  return new Promise<UserType>((resolve, reject) =>
    setTimeout(() => {
      if (userData.email === 'example@example.com' && userData.password === 'password2021')
        return resolve(userDetail)
      return reject('Нет такого юзера')
    }, 2000),
  )
}

export const getRequest = () => {
  return new Promise<string>((resolve) =>
    setTimeout(() => {
      return resolve('done')
    }, 2000),
  )
}
