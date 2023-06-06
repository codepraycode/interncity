import AsyncStorage from '@react-native-async-storage/async-storage';
import {useEffect, useState} from 'react';

// App ID
const APPID = "@intern$city";

export default StorageHook = ()=>{
    const [storedData, setStoredData] = useState(null);
    const [loading, setLoading] = useState(false);

    const updateStorage = (data)=>{};

    useEffect(()=>{
        const loadStorage = ()=>{
            if(loading) return;

            setLoading(true);
            AsyncStorage.getItem(APPID)
            .then((storedData)=>{
                // setLoading(false);
                // Loaded Data.
                console.log(storedData);
                setStoredData(()=>storedData);
            })
            .catch((err)=>{
                console.error("Error loading storage:", err);
                // setLoading(false);
            }).finally(()=>setLoading(false));
        }

        loadStorage()
    }, [])


    return { loading, isFresh: !loading && !Boolean(storedData), data:storedData, updateStorage }
}

// export default useStorage;