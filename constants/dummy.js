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

export const CompanyLists = [
    {
        id: 1,
        logo: 'google',
        name: 'Google inc.',
        about: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas.',
        website:'sample.com',
        employee_size: 132231,
        specialization: "Search technology, Web computing, Software and Online advertising",
        headOffice: {
            Town: 'Ikeja',
            city: 'Lagos',
            country: 'Uniter states'
        },
        type: "Multinational company",
        established: 1998,
        gallery:null,
        
    },
    {
        id: 2,
        logo: 'twitter',
        name: 'Twitter inc.',
        about: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas.',
        website:'sample.com',
        employee_size: 132231,
        specialization: "Search technology, Web computing, Software and Online advertising",
        headOffice: {
            Town: 'Ikeja',
            city: 'Lagos',
            country: 'Uniter states'
        },
        type: "Multinational company",
        established: 1998,
        gallery:null,
    },
    {
        id: 3,
        logo: 'dribble',
        name: 'Dribble inc.',
        about: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas.',
        website:'sample.com',
        employee_size: 132231,
        specialization: "Search technology, Web computing, Software and Online advertising",
        // industry:'Technology',
        headOffice: {
            Town: 'Ikeja',
            city: 'Lagos',
            country: 'Uniter states'
        },
        type: "Multinational company",
        established: 1998,
        gallery:null,
    }

]


export const JobsLists = [
    {
        id: 1,
        companyId: 1,
        title: 'Cyber security intern',
        tags:[
            'paid',
            'internship',
            'entry-level',
        ],
        location:{
            Town: 'Ikeja',
            city: 'Lagos',
            country: 'Uniter states'
        }
    },
    {
        id: 2,
        companyId: 3,
        title: 'Penetration tester',
        tags:[
            'paid',
            'internship',
            'entry-level',
        ],
        location:{
            Town: 'Ikeja',
            city: 'Lagos',
            country: 'Uniter states'
        }
    },
    {
        id: 3,
        companyId: 2,
        title: 'Security Research Intern',
        tags:[
            'paid',
            'internship',
            'entry-level',
        ],
        location:{
            Town: 'Ikeja',
            city: 'Lagos',
            country: 'Uniter states'
        }
    },
    {
        id: 4,
        companyId: 3,
        title: 'Security Research Internee',
        tags:[
            'paid',
            'internship',
            'entry-level',
        ],
        location:{
            Town: 'Ikeja',
            city: 'Lagos',
            country: 'Uniter states'
        }
    },
    {
        id: 6,
        companyId: 3,
        title: 'Security Research Internee',
        tags:[
            'paid',
            'internship',
            'entry-level',
        ],
        location:{
            Town: 'Ikeja',
            city: 'Lagos',
            country: 'Uniter states'
        }
    }
]