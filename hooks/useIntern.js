import { useContext, useEffect, useMemo, useState } from 'react';
import AppContext from '../app/context';
import { Intern} from '../app/models/Intern';
import { JSONLog } from '../app/utils';

const useInterns = ()=>{

    const {
        userProfile: {id:organizationId},
        applications:{data:applications},
    } = useContext(AppContext);

    const interns = useMemo(()=>{
        return applications.filter((each)=> {
            return (each.organization === organizationId) && !each.declined && Boolean(each.job_started)
        });
    },[organizationId, applications])


    return { interns };
}


const useIntern = (applicationId)=>{

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

    const intern = useMemo(()=>{
        const applicationData = applications.find((each)=> each.id === applicationId);

        return new Intern(applicationData);
    },[applicationId])


    useEffect(()=>{
        const setup = async ()=>{
            if (!intern.job) {
                const _job = await intern.getJob();

                setJob(()=>_job);
            }

            if (!intern.student) {
                const _student = await intern.getStudent();

                const dpt = departments.find((ed)=>ed.id === _student?.department);
                const sch = schools.find((es)=>es.id === _student?.school);

                _student.departmentData = dpt;
                _student.schoolData = sch;
                setStudent(()=>_student);
            }

        }
        setup();
        
    }, [job, student])

    intern.job = job;
    intern.student = student
    intern.setOrganization(userProfile);

    

    return { intern };
}

export { useInterns, useIntern };