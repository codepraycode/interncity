import React from 'react';
import { loginFormSchema } from '../../config/forms';
import AuthScreenLayout from '../../components/Layout/AuthLayout';
import { screenNames } from '../../config/screens';
import { AuthenticationForm } from '../../components/Form';
import { useRouter } from 'expo-router';

/* 
    Login screen
*/

const LoginScreen = () => {
    const router = useRouter();

    const formSchema = loginFormSchema //UserAccount.getAuthSchema();

    // const handleLogin = (loginData)=>{

    //   if (loading) return;

    //   const {email, password} = loginData;

    //   setLoading(true)
    //   setFormErrors(()=>({}));

    //   UserAccount.validateAuthData({email, password})
    //   .then( async (value)=>{

    //         let userCredential;
    //         try{
    //           userCredential = await signInWithEmailAndPassword(auth,value.email, value.password);
    //         }
    //         catch(error){
    //           const err = HandleFirebaseError(error);
    //           setFormErrors(()=>err);
    //           setLoading(false)
    //           return // end it
    //         }

    //         setLoading(false);

    //   })
    //   .catch(err=>{          
    //       setFormErrors(()=>err);
    //       setLoading(false)
    //   })
    // }

    return (
        <AuthScreenLayout
            headerText={"Welcome back"}
        >
            <AuthenticationForm
                schema={formSchema}
                remember={false}
                forgotPassword={true}

                loadingLabel={"Logging In..."}

                handleNavigate={() => router.replace(screenNames.signUp)}
                login
            />
        </AuthScreenLayout>
    )
}

export default LoginScreen;
