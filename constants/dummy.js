export const studentData = {
    email:"sample@interncity.com",
    password: "letmein",
}

export const authSchema = {
    email: {
        type: "string",
        placeholder: "Enter your email address",
        label: "Email",
    },
    password: {
        type: "password",
        placeholder: "Enter your password",
        label: "Password",
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


export const profileInfoSchema = {
    institution: {
        type: "string",
        placeholder: "Select your institution",
        label: "School of study",
    },
    // department: {
    //     type: "select",
    //     placeholder: "Select your department",
    //     label: "Department",
    // },
    course: {
        type: "string",
        placeholder: "Select your course",
        label: "Course",
    },
    iTLocation: {
        type: "string",
        placeholder: "Select preferred IT location",
        label: "Preferred IT location",
    },
    duration: {
        type: "string",
        placeholder: "Set duration",
        label: "Duration",
    },
    workspace: {
        type: "radio",
        placeholder: "workspace Type",
        label: "Workspace Type",
    },
}