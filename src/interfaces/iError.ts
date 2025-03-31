export interface iError {
    error: {
        data: {
            errors: string[],
            message: string
        },
        status: number
    }
}