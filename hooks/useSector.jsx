import { useContext, useMemo } from "react";
// import AppContext from "../app/context";
import useAppContext from "../context";


const useSector = (id=null, all=false)=>{

    const { sectors } = useAppContext();

    const data = useMemo(()=>{

        let sector;

        if(Boolean(id)) {

            for(let each of sectors){
                if(each.id === id)
                {
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


export default useSector;