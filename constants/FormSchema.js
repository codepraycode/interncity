
export const LoginFormSchema = {
    email: {
        type: "email",
        placeholder: "Enter your email address",
        label: "Email",
    },
    password: {
        type: "password",
        placeholder: "Enter your password",
        label: "Password",
    },
}
export const CreateAccountFormSchema = {
    type: {
        type: "string",
        placeholder: "What should you be addressed as?",
        label: "Account type",
    },
    email: {
        type: "email",
        placeholder: "Enter your email address",
        label: "Email",
    },
    password: {
        type: "password",
        placeholder: "Enter your password",
        label: "Password",
    },
    confirmPassword: {
        type: "password",
        placeholder: "Enter your password",
        label: "Password",
    },
}