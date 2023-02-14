import React, { useState } from 'react';
import {ScrollView} from 'react-native'
import { Text, View } from 'react-native-ui-lib';
import { JSONLog } from '../../app/utils';
import Theme from '../../constants/theme';
import { useApplication } from '../../hooks/useApplication';
import NotFound from '../../states/NotFound';
import CustomButton from '../Button';
import AppModal, { MakeOfferModal } from '../Modal';
import { ApplicationDetailHeader } from './Header';
import { ApplicationStudentInfo, PlacementDetailInfo } from './Info';

const ApplicationDetail = ({ id:applicationId }) => {
    
    const application = useApplication(applicationId);
    const [makingOffer, setMakingOffer] = useState(false);


    // JSONLog(application); // stoped here!

    if (!Boolean(application.original)) return <NotFound  text="Could not retrieve data"/>;

    return (
        <ScrollView contentContainerStyle={{paddingBottom: 20}}>
            <View
                contentContainerStyle={{
                    backgroundColor:Theme.grey100,
                }}
            >

                <ApplicationDetailHeader application = { application }/>
            </View>

            {/* Content */}
            <ApplicationStudentInfo showHeader student={application.student}/>

            <PlacementDetailInfo 
                showHeader
                job = {application.job}
                date_applied = {application.date_applied}
                duration = {application.duration}
            />

            <View 
                center style={{
                    marginVertical: 15, 
                    flexDirection:'row',
                    justifyContent:"space-evenly"
                }}
            >
                <CustomButton 
                    text="Decline" 
                    onPress={()=>{}}
                    style={{
                        width: 150,
                        backgroundColor: Theme.red,
                    }}
                    textStyle={{
                        color: Theme.lightRed
                    }}
                />

                <CustomButton 
                    text="Make Offer" 
                    onPress={()=>setMakingOffer(true)}
                    style={{
                        width: 150
                    }}
                />
            </View>

            <MakeOfferModal 
                show={makingOffer} 
                student={application.student}
                onHide={(madeOffer=false)=>setMakingOffer(false)}
            />
        </ScrollView>

    );
}


export default ApplicationDetail;