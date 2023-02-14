import { useContext, useEffect, useMemo, useState } from 'react';
import AppContext from '../app/context';
import Intern, { Application } from '../app/models/Intern';
import { JSONLog } from '../app/utils';
import useProfile from './useProfile';

const useApplications = (organizationId=null)=>{

    const { applications:{data:applications} } = useContext(AppContext);

    const data = useMemo(()=>{
        return applications.filter((each)=> each.organization === organizationId);
    },[organizationId])

    const updateViewed = async (id)=>{

        let error;

        try{
            await Intern.update({
                id,
                viewed: new Date(),
            })
        }catch(err){
            error = err;
        }

        return error;
    }

    return {data, updateViewed};
}


const useApplication = (applicationId)=>{

    const { 
        applications:{data:applications},
        departments:{data:departments},
        schools:{data:schools},
        userProfile
    } = useContext(AppContext);

    const [student, setStudent] = useState(null);
    const [job, setJob] = useState(null);

    // Get student info
    // Get Job
    // Create application object

    const application = useMemo(()=>{
        const applicationData = applications.find((each)=> each.id === applicationId);

        return new Application(applicationData);
    },[applicationId])


    useEffect(()=>{
        const setup = async ()=>{
            if (!application.job) {
                const _job = await application.getJob();

                setJob(()=>_job);
            }

            if (!application.student) {
                const _student = await application.getStudent();

                const dpt = departments.find((ed)=>ed.id === _student?.department);
                const sch = schools.find((es)=>es.id === _student?.school);

                _student.departmentData = dpt;
                _student.schoolData = sch;
                setStudent(()=>_student);
            }

        }
        setup();
        
    }, [job, student])

    application.job = job;
    application.student = student
    application.setOrganization(userProfile);

    

    return application;
}

export { useApplications, useApplication };