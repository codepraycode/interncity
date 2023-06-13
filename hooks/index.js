import FormHook from "./useForm"
import useProfileHook from "./profile";
import StorageHook from './useStorage';

const useForm = FormHook;
const useStorage = StorageHook;
const useProfile = useProfileHook;

export {
    useForm,
    useStorage,
    useProfile
}