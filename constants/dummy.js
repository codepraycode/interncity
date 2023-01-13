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
        // placeholder: "enter your email",
        label: "Fullname",
    },
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
    dateofbirth: {
        type: "date",
        // placeholder: "enter your email",
        label: "Date of birth",
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
}
