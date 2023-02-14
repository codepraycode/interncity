import React from 'react'
import ApplicationDetail from '../../components/organization/Application';


const InternsDetailScreen = ({ route }) => {
    const { internId, applicationId } = route.params;

    if (applicationId) return <ApplicationDetail id={applicationId}/>
    return <InternsDetail id={internId}/>;
}


export default InternsDetailScreen;
