export interface BoardData {
  type: string
  payload: {
    createdAt: string
    createdBy: string
    modifiedBy: string
    title: string
    updatedAt: string
    userUID: string
    data: {
      objects: any[] // Define this further based on your object structure
      version: string
    }
  }
  meta: {
    arg: string
    requestId: string
    requestStatus: string
  }
}
