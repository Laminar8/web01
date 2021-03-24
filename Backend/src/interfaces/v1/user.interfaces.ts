export interface Users {
  username: string
  email: string
  password: string
  people: { name: string; gender?: string; birth?: number; face?: string; favorite: boolean }[]
}

export interface Chat {
  userId: string
  author: string
  comments: { text: string }[]
  date: string
  tags: { tag: string }[]
}
