export const studentData = {
    email:"sample@interncity.com",
    password: "letmein",
}

export const authSchema = {
    email: {
        type: "string",
        // placeholder: "enter your email",
        label: "Email",
    },
    password: {
        type: "password",
        // placeholder: "enter your email",
        label: "Email",
    },
}

export const createAccountSchema = {
    fullname: {
        type: "string",
        placeholder: "Enter your full name",
        label: "Fullname",
    },
    email: {
        type: "string",
        placeholder: "Enter your email address",
        label: "Email",
    },
    department: {
        type: "string",
        // placeholder: "enter your email",
        label: "Department",
    },
    institution: {
        type: "string",
        // placeholder: "enter your email",
        label: "Name of institution",
    },
    password: {
        type: "password",
        placeholder: "Enter password",
        label: "Password",
    },
    confirmPassword: {
        type: "password",
        placeholder: "Enter password again",
        label: "Confirm password",
    },
    // dateofbirth: {
    //     type: "date",
    //     // placeholder: "enter your email",
    //     label: "Date of birth",
    // },
    
}
