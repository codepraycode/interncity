import { useContext, useMemo } from "react";
import AppContext from "../app/context";


const useSector = (id=null)=>{

    const { sectors:{data:sectors} } = useContext(AppContext);

    const data = useMemo(()=>{

        if(Boolean(id)) {
            console.log("sector:id", id)
            let sector;

            for(let each of sectors){
                sector = each.name;
                break;
            }

            if (!sector) return 'could not get sector!';

            return sector;
        }

        return sectors;
    }, [id])

    return data;
}


export default useSector;