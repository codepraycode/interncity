import React from 'react';
import { useRouter } from 'expo-router';
import { AuthenticationForm } from '../../components/Form';
import { screenNames } from '../../config/screens';
import { createAccountFormSchema } from '../../config/forms';
import AuthScreenLayout from '../../components/Layout/AuthLayout';
/* 
    CreateAccount screen
*/


const CreateAccount = () => {

    const router = useRouter();

    const formSchema = createAccountFormSchema; // UserAccount.getCreateAccountSchema();

    // const handleCreateAccount = (userData) => {

    //     if (loading) return;

    //     // const demo = {
    //     //   email:"me@codepraycodde.com",
    //     //   password: "letmein123",
    //     //   confirmPassword: "letmein123",
    //     // }


    //     UserAccount.validateCreateAccountData(userData)
    //         .then(async (value) => {

    //             let userCredential;

    //             try {
    //                 userCredential = await createUserWithEmailAndPassword(auth, value.email, value.password)
    //             }
    //             catch (error) {
    //                 const err = HandleFirebaseError(error);
    //                 setFormErrors(() => err);
    //                 setLoading(false);

    //                 return;
    //             }

    //             try {
    //                 await UserAccount.intializeProfile(auth);
    //             } catch (err) {
    //                 setFormErrors(() => err);
    //                 setLoading(false);
    //                 return;
    //             }

    //         })
    //         .catch(err => {
    //             // console.log("Error", err);
    //             setFormErrors(() => err);
    //             setLoading(false)
    //         });

    //     setLoading(true)
    //     setFormErrors(() => ({}));
    // }

    return (
        <AuthScreenLayout
            headerText={"Welcome back"}
        >
            <AuthenticationForm
                schema={formSchema}
                remember={false}
                forgotPassword={false}

                loadingLabel={"Creating account..."}

                handleNavigate={() => router.replace(screenNames.signIn)}
                createAccount
            />
        </AuthScreenLayout>
    )
}

export default CreateAccount;

