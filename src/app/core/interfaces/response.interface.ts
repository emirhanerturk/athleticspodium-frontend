
export interface IResponse {
    success: boolean,
    data?: any
    error?: {
        code: number,
        message: string,
        fatal?: boolean
    } | {
        code: number,
        message: string
    }[]
}
