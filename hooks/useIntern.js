import { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import AppContext from '../app/context';
import { Application, Intern} from '../app/models/Intern';
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

        if (!applicationData) return null;
        return new Intern(applicationData);
    },[applicationId]);

    const saveLog = useCallback(async (logData)=>{

        const res = await Intern.saveLog(logData);

        return res;

    },[applicationId]);


    useEffect(()=>{
        const setup = async ()=>{
            if (!intern) return;

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


    if(intern){
        intern.job = job;
        intern.student = student
        intern.setOrganization(userProfile);
    }

    

    return { intern, saveLog };
}


const useStudent = (studentData)=>{

    const { 
        applications:{data:applications},
        departments:{data:departments},
        schools:{data:schools},
    } = useContext(AppContext);

    const [student, setStudent] = useState(studentData);
    const [job, setJob] = useState(null);
    const [organization, setOrganization] = useState(null);
    
    const {id, ...rest} = student;

    const intern = useMemo(()=>{
        const applicationData = applications.find((each)=> each.student === id);

        if (!applicationData) return new Intern(studentData);
        return new Application(applicationData);
    },[id]);


    useEffect(()=>{
        const setup = async ()=>{
            if (!intern) return;

            if (!intern.job) {
                const _job = await intern.getJob();

                setJob(()=>_job);
            }

            if(!intern.organization) {
                org = await Application.getOrganization(intern.organizationId)
                setOrganization(()=>org);
            }

            if (!intern.student?.departmentData) {
                // const _student = {...student}

                const departmentData = departments.find((ed)=>ed.id === intern.student?.department);
                const schoolData = schools.find((es)=>es.id === intern.student?.school);

                setStudent((p)=>({
                    ...p,
                    schoolData,
                    departmentData
                }));
            }

        }
        setup();
        
    }, [job, student, organization])


    if(intern){
        intern.job = job;
        intern.student = student;
        intern.organization = organization;
    }

    

    return { intern };
}

export { useInterns, useIntern, useStudent };