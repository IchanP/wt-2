declare interface ExtendedError extends Error {
    status: number;
    code: number;
    cause: {
        status: number;
        message: string;
        stack: string;
    }
}
