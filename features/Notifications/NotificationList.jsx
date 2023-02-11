import React, { useContext } from 'react'
import { FlatList } from 'react-native';
import Theme from '../../constants/theme';
import NotificationItem from './Item';
import AppContext from '../../app/context';
import useProfile from '../../hooks/useProfile';
import { useApplications } from '../../hooks/useApplication';

const NotificationScreen = ({ navigation }) => {
    
    const { isOrganization } = useContext(AppContext);
    const [userProfile] = useProfile();

    const userId = userProfile?.id || null;

    const {data:applications, updateViewed} = useApplications(userId);
    
    const handleNavigateToDetail = (applicationId)=>{
        navigation.navigate("Intern", { 
            screen: "InternDetail", 
            params: { applicationId }
        });
    }

    return (
        <FlatList
            data={ applications }
            renderItem = {({item})=>(
                <NotificationItem 
                    isOrganization={ isOrganization }
                    notification = { item }
                    handleClick = {()=>{
                        const { id, viewed} = item;
                        console.log("View notification:", id);

                        if (!viewed) updateViewed(id);
                        
                        handleNavigateToDetail(id)
                    }}

                />
            )}
            keyExtractor={item => item.id}
            contentContainerStyle={{
                backgroundColor:Theme.grey100,
                paddingBottom: 20,
                shadowColor: Theme.grey200,
                shadowOffset: {
                    width: 0,
                    height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 5,
                elevation: 5,
            }}
        />
    )
}


export default NotificationScreen;