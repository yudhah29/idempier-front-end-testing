export interface LoginRes {

    clients: [
        {
            id: number,
            name: string
        }
    ],
    token: string
}