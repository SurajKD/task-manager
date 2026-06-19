export type Tag = 'frontend' | 'backend' | 'qa'

export type Task = {
  id: string
  text: string
  done: boolean
  tags: Tag[]
  createdAt: string
}

export type Tasks = {
  Suraj: Task[]
  Harsh: Task[]
  Twinkle: Task[]
}

export type TeamMember = 'Suraj' | 'Harsh' | 'Twinkle'
