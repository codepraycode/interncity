import React from 'react'
import BaseSafeAreaLayout from './Layout/base';


const SafeAreaLayout = ({children, ...rest}) => {
    return (
        <BaseSafeAreaLayout {...rest}>
            {children}
        </BaseSafeAreaLayout>
    )
}

export default SafeAreaLayout;
