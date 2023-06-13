import FormHook from "./useForm"
import useProfileHook from "./profile";
import StorageHook from './useStorage';
import { useDepartmentsHook, useOrganizationsHook, useSchoolsHook, useSectorHook, useSectorsHook } from "./useResource";

const useForm = FormHook;
const useStorage = StorageHook;
const useProfile = useProfileHook;

const useSchools = useSchoolsHook
const useOrganizations = useOrganizationsHook
const useDepartments = useDepartmentsHook
const useSectors = useSectorsHook
const useSector = useSectorHook

export {
    useForm,
    useStorage,
    useProfile,
    useSchools,
    useOrganizations,
    useDepartments,
    useSectors,
    useSector,
}