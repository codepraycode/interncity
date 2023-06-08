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

    const formSchema = loginFormSchema;
    
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
