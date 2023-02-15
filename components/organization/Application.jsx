import React, { useState } from 'react';
import {Alert, ScrollView} from 'react-native'
import { Text, View } from 'react-native-ui-lib';
import { getTimeDate, JSONLog } from '../../app/utils';
import Theme from '../../constants/theme';
import { useApplication } from '../../hooks/useApplication';
import NotFound from '../../states/NotFound';
import CustomButton from '../Button';
import { ApplicationModal, Preloader } from '../Modal';
import { ApplicationDetailHeader } from './Header';
import { ApplicationStudentInfo, PlacementDetailInfo } from './Info';

const ApplicationDetail = ({ id:applicationId }) => {
    
    const {application, sendOffer, declineApplication} = useApplication(applicationId);
    const [makingOffer, setMakingOffer] = useState(false);
    const [decliningOffer, setDecliningOffer] = useState(false);
    const [updatingApplication, setUpdatingApplication] = useState(false);


    // JSONLog(application); // stoped here!
    // console.log(application.offer_date)
    if (!Boolean(application.original)) return <NotFound  text="Could not retrieve data"/>;

    let offerDate;
    if (application.offer_date) offerDate = getTimeDate(application.offer_date);

    let cta = (
        <>
            <View 
                center style={{
                    marginVertical: 15, 
                    flexDirection:'row',
                    justifyContent:"space-evenly"
                }}
            >
                <CustomButton 
                    text="Decline" 
                    onPress={()=>setDecliningOffer(true)}
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

            <ApplicationModal 
                show={makingOffer || decliningOffer} 
                title = {decliningOffer ? "Decline Application" : "Confirm Offer"}
                message = {decliningOffer ? "You are about to decline the application of" : "You are about to make an offer to"}

                target={application.student?.fullname}
                isDecline={decliningOffer}
                onHide={(updatedApplication=false)=>{

                    if (makingOffer) setMakingOffer(false);
                    if (decliningOffer) setDecliningOffer(false);

                    // If any changes made to student application
                    if(updatedApplication) {

                        setUpdatingApplication(true);

                        let action = async () =>{};
                        
                        if (decliningOffer) action = declineApplication
                        else action = sendOffer;

                        action()
                        .then(()=>{
                            const title = decliningOffer ? 
                                "Application Declined" : 
                                "Offer sent";

                            const message = decliningOffer ? 
                            "Student's application is declined.":
                            "You offer was successfully sent to student."

                            Alert.alert(
                                title,
                                message,
                            );
                            setUpdatingApplication(false);
                        })
                        .catch(()=>{
                            const title = decliningOffer ? 
                                "Application Decline failed" : 
                                "Could not send offer";

                            const message = "The operation failed, please try again."
                            Alert.alert(
                                title,
                                message,
                            );
                            setUpdatingApplication(false);
                        })
                        
                    }
                }}
            />

            <Preloader 
                show={updatingApplication} 
                text={"Loading..."}
            />
        </>
    )

    if (offerDate)  cta = (
        <View 
            center style={{
                marginVertical: 15, 
                flexDirection:'row',
                justifyContent:"space-evenly"
            }}
        >
            <CustomButton 
                text={`Sent offer on ${offerDate.toDateString()}`}
                onPress={()=>{}}
                style={{
                    width: "90%",
                    backgroundColor: Theme.accent
                }}
                disable
            />
        </View>
    )

    if (application.declined) cta = (
        <View 
            center style={{
                marginVertical: 15, 
                flexDirection:'row',
                justifyContent:"space-evenly"
            }}
        >
            <CustomButton 
                text={`Application declined`}
                onPress={()=>{}}
                style={{
                    width: "90%",
                    backgroundColor: Theme.red,
                }}
                disable
            />
        </View>
    )


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

            { cta }
        </ScrollView>

    );
}


export default ApplicationDetail;