export interface Users {
  username: string
  email: string
  password: string
}

export interface Chat {
  userId: string
  author: string
  comments: { text: unknown }[]
}
