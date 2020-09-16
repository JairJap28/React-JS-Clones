interface IUserData {
    username: string,
    createAt: any,
    saved: Array<{ username: string, timestamp: any }>
    likes: Array<{ username: string, timestamp: any }>
}

export default IUserData