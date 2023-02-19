import AsyncStorage from '@react-native-async-storage/async-storage';
import {useEffect, useState} from 'react';

// App ID
const APPID = "@intern$city";

const useStorage = ()=>{
    const [storedData, setStoredData] = useState(null);
    const [loading, setLoading] = useState(false);

    const updateStorage = (data)=>{};

    useEffect(()=>{
        const loadStorage = ()=>{
            if(loading) return;

            setLoading(true);
            AsyncStorage.getItem(APPID)
            .then((storedData)=>{
                console.log("Storage:", storedData);
            })
            .then(()=>{
                setLoading(false);
            })
            .catch((err)=>{
                console.error("Error loading storage:", err);
                setLoading(false);
            })
        }

        loadStorage()
    }, [])


    return { loading, isFresh: !loading && !Boolean(storedData), data:storedData, updateStorage }
}

export default useStorage;