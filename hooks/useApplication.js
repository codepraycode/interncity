import { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import AppContext from '../app/context';
import { Application,Intern } from '../app/models/Intern';

const useApplications = (userId=null, student=false)=>{

    const { applications:{data:applications} } = useContext(AppContext);

    const data = useMemo(()=>{
        if (student) return applications.filter((each)=> each.student === userId);
        return applications.filter((each)=> each.organization === userId);
    },[userId, applications])

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

const usePlacements = (studentId)=>{

    const { applications:{data:applications} } = useContext(AppContext);

    const placements = useMemo(()=>{
        return applications.filter((each)=> (each.student === studentId) && Boolean(each.job_started));
    },[studentId, applications])

    return { placements };
}


const useApplication = (applicationId)=>{

    const { 
        applications:{data:applications},
        departments:{data:departments},
        schools:{data:schools},
        userProfile,
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


    const sendOffer = useCallback(async()=>{
        console.log("Sending offer....", application.id);

        const data = {
            id: application.id
        }

        if (application.offer_date) data.job_started = new Date();
        else data.offer_date = data.offer_date = new Date();
        
        const { offer_date, job_started } = await Application.update(data);

        if(offer_date) application.offer_date = offer_date;
        if(job_started) application.job_started = job_started;

        return job_started || offer_date;

    }, [applicationId])

    const declineApplication = useCallback(async()=>{
        console.log("Declining offer....", application.id);
        
        const { declined } = await Application.update({
            id: application.id,
            declined: true,
        });

        application.declined = declined

        return declined;

    }, [applicationId])

    application.job = job;
    application.student = student
    application.setOrganization(userProfile);

    

    return {application, sendOffer, declineApplication};
}

export { useApplications, useApplication, usePlacements };