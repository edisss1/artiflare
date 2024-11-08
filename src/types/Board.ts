export interface Board {
  id?: string
  boardTitle: string
  userUID: string
  createdAt: string | null
  updatedAt: string | null
  createdBy: string | null
  modifiedBy: string | null
  data: {}
}
