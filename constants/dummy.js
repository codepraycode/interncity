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
export const updatePasswordSchema = {
    password: {
        type: "password",
        placeholder: "Enter your current password",
        label: "Current password",
    },
    updatePassword: {
        type: "password",
        placeholder: "Enter your new password",
        label: "New Password",
    },
    confirmPassword: {
        type: "password",
        placeholder: "Enter your new password again",
        label: "Confirm new Password",
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
        role: 'Cyber security intern',
        duration: 'Jan - Apr (3 months)',
        pay: '#2500/mo',
        about: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas.',
        deadline: ' 25th Jan, 2021',
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
        role: 'Penetration tester',
        duration: 'Jan - Apr (3 months)',
        pay: null,
        about: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas.',
        deadline: ' 25th Jan, 2021',
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
        role: 'Security Research Intern',
        duration: 'Jan - Apr (3 months)',
        pay: null,
        about: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas.',
        deadline: ' 25th Jan, 2021',
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
        role: 'Security Research Internee',
        duration: 'Jan - Apr (3 months)',
        pay: '#2500/mo',
        about: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas.',
        deadline: ' 25th Jan, 2021',
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
        role: 'Security Research Internee',
        duration: 'Jan - Apr (3 months)',
        pay: '#2500/mo',
        about: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas.',
        deadline: ' 25th Jan, 2021',
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


export const OranizationNotificationsList = [
    {
        id: 1,
        role: 'New Application',
        description: 'A student from FUTA just applied for Backend intern position',
        time: '2 minutes ago',
        data:{
            jobId: 1
        }
    },
    {
        id: 2,
        role: 'Application Offer',
        description: 'A student just accepted your offer',
        time: '2 minutes ago',
        unread: true,
        data:{
            jobId: 3
        }
    },
    {
        id: 3,
        role: 'Application Offer',
        description: 'A student from FUTA just accepted your offer',
        time: '2 minutes ago',
        data:{
            jobId: 2
        }
    }
]

export const StudentNotificationsList = [
    {
        id: 1,
        role: 'Application submitted',
        description: 'Your application for Backend Intern has been submitted',
        time: '2 minutes ago',
        data:{
            jobId: 1
        }
    },
    {
        id: 2,
        role: 'Job Offer',
        description: 'Google has offered you the position of Backend inter.',
        time: '2 minutes ago',
        unread: true,
        data:{
            jobId: 3
        }
    },
    {
        id: 3,
        role: 'Application submitted',
        description: 'Your application for Software engineer intern has been submitted',
        time: '2 minutes ago',
        data:{
            jobId: 2
        }
    }
]


export const InternLists = [
    {
        id: 1,
        fullname:"Lorem Ipsum Agar",
    },
    {
        id: 2,
        fullname:"Lorem Ipsum Agar",
    },
    {
        id: 3,
        fullname:"Lorem Ipsum Agar",
    },
    {
        id: 4,
        fullname:"Lorem Ipsum Agar",
    },
    {
        id: 5,
        fullname:"Lorem Ipsum Agar",
    },
    {
        id: 6,
        fullname:"Lorem Ipsum Agar",
    },
    {
        id: 7,
        fullname:"Lorem Ipsum Agar",
    },
    {
        id: 8,
        fullname:"Lorem Ipsum Agar",
    }
]