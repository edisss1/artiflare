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
            objects: any[]
            version: string
        }
    }
    meta: {
        arg: string
        requestId: string
        requestStatus: string
    }
}
