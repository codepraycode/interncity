/* 
    useSnapshot plugin from obelmont on github
    github: https://github.com/obelmont/useSnapshot
*/
import { useState, useEffect, useRef } from "react";
import { 
  onSnapshot,
} from 'firebase/firestore';

const useMounted = () => {
  const isMounted = useRef(false);
  useEffect(() => {
    isMounted.current = true;
    return () => (isMounted.current = false);
  }, []);
  return isMounted;
};

const useSnapshot = (query) => {
  const [data, updateData] = useState(undefined);
  const [loading, setLoading] = useState(true);
  const mounted = useMounted();

  useEffect(() => {    
        const unsubscribeSnapshot = onSnapshot(query, (snapshot) => {
            // create data array to feed to state
            let data = snapshot.docs.map((item)=>({...item.data(), id: item.id}))
            // set states
            if (mounted.current) updateData(data);
            if (setLoading && mounted.current) setLoading(false);
        })
        return () => unsubscribeSnapshot();
  }, []);

  return { data, loading };
};

export default useSnapshot;