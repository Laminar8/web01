export interface Users {
  username: string
  email: string
  password: string
}

export interface Chat {
  userId: string
  author: string
  comments: { text: string }[]
  date: string
  tags: { tag: string }[]
  people: { name: string; birth?: number; image?: string; group?: string; notes?: string; favorite: boolean }[]
}

export interface People {
  userId: string
  people: { name: string; birth?: number; image?: string; group?: string; notes?: string; favorite: boolean }[]
}
