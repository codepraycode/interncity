import { View, Text } from 'react-native'
import React from 'react'
import Theme from '../constants/theme';
import Octicons from 'react-native-vector-icons/Octicons';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const HeaderTitle = ({title, color}) => {
  return (
        <Text 
            style={{
                fontFamily:'FontBold',
                fontSize:20,
                color:color ? color: Theme.main,
            }}
        >
            {title}
        </Text>
  )
}

const getIcons = (name, focused, color, size, isOrganization) => {
    let screenName = name.toLowerCase();

    if (screenName === 'jobs') return <Octicons name={'list-unordered'} size={size} color={color} />;
    else if (screenName === 'logs') return <Octicons name={'file-badge'} size={size} color={color} />;
    else if ((screenName === 'interns') || (screenName === 'students')) return <Octicons name={'people'} size={size} color={color} />;
    else if (screenName === 'profilesetting') return (
        isOrganization ? 
        <Octicons name={"organization"} size={size} color={color} />
        :
        <FontAwesome name={focused ? 'user':'user-o'} size={size} color={color} />
    )
    else if (screenName === 'appsetting') return <MaterialIcons name={focused ? 'cog' : 'cog-outline'} size={size} color={color} />;    
    
    return <MaterialIcons name={'apps'} size={size} color={color} />;    
}

const getHeaderTitle = (name, color=null) => {
    let screenName = name.toLowerCase();
    
    let title = name;

    if (screenName === 'jobs') title =  "Jobs";
    else if (screenName === 'logs') title =  "Internship logs";
    else if (screenName === 'profilesetting') title =  "Profile Settings";
    else if (screenName === 'appsetting') title =  "App Settings";
    
    return (<HeaderTitle title={title} color={color}/>);
}


export { HeaderTitle, getIcons, getHeaderTitle};