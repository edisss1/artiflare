export function handleAuthError(code: string | undefined) {
    switch (code) {
        case "auth/email-already-in-use":
            return "This email is already in use. Please try logging in."
        case "auth/invalid-email":
            return "Invalid email format. Please enter a valid email address."
        case "auth/weak-password":
            return "Password should be at least 6 characters."
        case "auth/user-not-found":
            return "No account found with this email. Please sign up."
        case "auth/wrong-password":
            return "Incorrect password. Please try again."
        case "auth/invalid-credentials":
            return "Invalid credentials. Please try again."
        default:
            return undefined
    }
}
