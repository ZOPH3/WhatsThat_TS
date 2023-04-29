const setUser = (email: string, password: string) => {
    return {
        type: "LOGIN",
        payload: {
            email : email, 
            password : password
        }
    }
}