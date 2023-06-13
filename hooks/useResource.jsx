// This file loads resources like schools, sectors, etc.

import { getDocs } from "firebase/firestore";
import { useEffect, useMemo, useState } from "react";
import { schoolsCollectionRef,
    organizationQueryRef,
    depratmentsCollectionRef,
    sectorsCollectionRef
} from '../config/firebase';


const useResourceHook = (query) =>{

    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);

    const reload = ()=> setLoading(true);


    useEffect(()=>{
        (async ()=>{
            if(!loading) return

            try{

                let snapshot = await getDocs(query);
                if (!snapshot.empty){
                    let dt = snapshot.docs.map((item)=>({...item.data(), id: item.id}));

                    setData(()=>dt);
                }
            }catch(err){
                console.error("Error with query");
            }finally {
                setLoading(false);
            }

        })()
    },[loading]);


    return {data, loading};
}


export const useSchoolsHook = () =>{
    return useResourceHook(schoolsCollectionRef);
}

export const useOrganizationsHook = () =>{
    return useResourceHook(organizationQueryRef);
}

export const useDepartmentsHook = () =>{
    return useResourceHook(depratmentsCollectionRef);
}

export const useSectorsHook = () =>{
    return useResourceHook(sectorsCollectionRef);
}

export const useSectorHook = (id = null, all = false) => {

    // const { sectors } = useAppContext();
    const { data: sectors } = useSectorsHook();

    const data = useMemo(() => {

        let sector;

        if (Boolean(id)) {

            for (let each of sectors) {
                if (each.id === id) {
                    sector = each.name;
                    break;
                }
            }

            if (!sector) return 'could not get sector!';
        }

        return sector;
    }, [id])

    return all ? sectors : data;
}