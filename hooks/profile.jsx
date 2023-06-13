import useAppContext from "../context";
import { ref, uploadBytes } from 'firebase/storage';
import { auth, storageRef } from '../config/firebase';
import User from "../utils/models";
import { JSONLog } from "../utils";
import { userTypes } from "../config/constants";

export default useProfileHook = (isNew=false) => {

    const { 
        profile, resetProfile, 
        showToast } = useAppContext();

    
    // Set user type bool
    const isOrganization = profile?.type === userTypes.ORGANIZATION;
    const isSupervisor = profile?.type === userTypes.SUPERVISOR;
    const isIntern = profile?.type === userTypes.STUDENTS;




    const uploadImage = async (avatar, email) => {

        // Send image to firebase storage.
        if (!avatar || !email) return null;

        const res = await fetch(avatar.uri);
        const blob = await res.blob();
        const filename = `${email}_${new Date().getTime()}`;
        const reff = ref(storageRef, `photos/${filename}`)

        await uploadBytes(reff, blob);

        return reff.fullPath;
    }

    const updateProfile = async (updatedProfileData) => {

        const { avatar: rawImageUpload, email: emailData, ...restData } = updatedProfileData;

        let avatar = null;
        let email = emailData;
        
        if (!email) {
            // console.warn("Email not provided");
            email = auth.currentUser?.providerData[0].email;
        }
        
        try {
            avatar = await uploadImage(rawImageUpload, email);
        }
        catch (err) {
            console.warn("Error uploading image:", err);
            showToast("Could not update profile photo");
        }

        // const {meta, ...profileData} = profile;
        
        // const oldData = {...profile};

        const combinedData = {
            // ...(profileData || {}), // previous userProfile in context
            // ...updatedProfileData // latest data update
            email,
            ...restData
        }

        if (avatar) combinedData.avatar = avatar;

        try {
            // const { isComplete, ...rest } = combinedData;
            // JSONLog(updatedProfileData);
            // JSONLog(combinedData);
            const {meta, ...rsd} = combinedData
            await User.updateProfile(auth, rsd);
            resetProfile();
        } catch (err) {
            // JSONLog(err)
            console.error(err.message);
            throw (err.error || {
                message: "Could not proceed with profile"
            });
        }

        // console.log("Updated document");
        // updateAccountProfile(combinedData);
        return combinedData;
    }

    return {
        profile, updateProfile,
        isOrganization, isSupervisor, isIntern
    };
}
