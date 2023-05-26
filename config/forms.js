// ALl forms in app


// Authentication forms
const createAccountFormSchema = {
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

const loginFormSchema = {
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


// User account form
const createOrganizationFormSchema = {
    avatar: {
        type: "image",
        placeholder: "upload a .png, .jpeg or .jpg image",
        label: "Profile photo",
    },
    name: {
        type: "text",
        placeholder: "Enter organization name",
        label: "Organization name",
    },
    email: {
        type: "email",
        placeholder: "Enter official email",
        label: "Official email",
    },
    about: {
        type: "long",
        placeholder: "Enter short description about organization",
        label: "About organization",
        maxLength: 300,
        long: true,
    },
    website: {
        type: "url",
        placeholder: "Enter official website",
        label: "Official website",
    },
    address: {
        type: "text",
        placeholder: "Enter official address",
        label: "Official address",
    },
    city: {
        type: "text",
        placeholder: "Enter residential city",
        label: "City",
    },
    country: {
        type: "text",
        placeholder: "Enter residential country",
        label: "Country",
    },
}

const createSupervisorFormSchema = {
    avatar: {
        type: "image",
        placeholder: "upload a .png, .jpeg or .jpg image",
        label: "Profile photo",
    },
    fullname: {
        type: "text",
        placeholder: "Enter full name",
        label: "Full name",
    },

    email: {
        type: "email",
        placeholder: "Enter official email",
        label: "Official email",
    },
    school: {
        type: "school",
        placeholder: "Select school",
        label: "School",
    },
    department: {
        type: "department",
        placeholder: "Select department",
        label: "School Department",
    },

}

const createStudentFormSchema = {
    avatar: {
        type: "image",
        placeholder: "upload a .png, .jpeg or .jpg image",
        label: "Profile photo",
    },
    fullname: {
        type: "text",
        placeholder: "Enter full name",
        label: "Full name",
    },
    cv: {
        type: "url",
        placeholder: "Enter link to CV",
        label: "CV/Resume",
    },
    phoneNumber: {
        type: "tel",
        placeholder: "Enter phone number",
        label: "Phone number",
    },
    city: {
        type: "text",
        placeholder: "Enter residential city",
        label: "City",
    },
    country: {
        type: "text",
        placeholder: "Enter residential country",
        label: "Country",
    },
    sectors: {
        type: "sector",
        placeholder: "Select sectors",
        label: "Sector",
    },
    school: {
        type: "school",
        placeholder: "Select school",
        label: "School",
    },
    department: {
        type: "department",
        placeholder: "Select department",
        label: "School Department",
    },
    // Duration: number but selected number

}


export {
    createAccountFormSchema,
    loginFormSchema,
    
    createOrganizationFormSchema,
    createSupervisorFormSchema,
    createStudentFormSchema,
}