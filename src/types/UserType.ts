export type UserType = {
  id: number
  name: string
  email: string
  password: string
  promocode?: string
}

export type AuthUserType = UserType | null
