
export interface IResponse {
    success: boolean,
    data?: any
    error?: IError|IError[]
}

export interface IError {
    code: number,
    message: string,
    fatal?: boolean,
}
