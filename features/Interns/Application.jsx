import React, { useState, useContext } from 'react';
import {Alert, ScrollView} from 'react-native'
import { View } from 'react-native-ui-lib';
import AppContext from '../../app/context';
import { getTimeDate, JSONLog } from '../../app/utils';
import Theme from '../../constants/theme';
import { useApplication } from '../../hooks/useApplication';
import NotFound from '../../states/NotFound';
import CustomButton from '../../components/Button';
import { MiniDetailHeader } from '../../components/Headers';
import { PlacementDetailInfo, StudentInfo } from '../../components/Infos';
import { ApplicationModal, Preloader } from '../../components/Modal';


const ApplicationDetail = ({ id:applicationId }) => {
    
    const {isIntern} = useContext(AppContext);
    const {application, sendOffer, declineApplication} = useApplication(applicationId);
    const [makingOffer, setMakingOffer] = useState(false);
    const [decliningOffer, setDecliningOffer] = useState(false);
    const [updatingApplication, setUpdatingApplication] = useState(false);

    if (!Boolean(application.original)) return <NotFound  text="Could not retrieve data"/>;

    let offerDate, jobStarted;
    if (application.offer_date) offerDate = getTimeDate(application.offer_date);
    if (application.job_started) jobStarted = getTimeDate(application.job_started);

    let placementStarted = false;

    if (jobStarted) placementStarted = true;
    

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
                    text={isIntern ? "Accept Offer" : "Make Offer" }
                    onPress={()=>setMakingOffer(true)}
                    style={{
                        width: 150
                    }}
                />
            </View>

            <ApplicationModal 
                show={makingOffer || decliningOffer} 
                title = {decliningOffer ? `Decline ${isIntern ? "Offer": "Application"}` : `Confirm Offer`}
                message = {decliningOffer ? `You are about to decline the ${isIntern ? "offer":"application"} of` : `You are about to ${isIntern ? "accept offer for":"make an offer to"}`}

                target={isIntern ? application.job?.role : application.student?.fullname}
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
                                `${isIntern ? "Offer":"Application"} Declined` : 
                                isIntern ? "Offer accepted" : "Offer sent";

                            const message = decliningOffer ? 
                            (isIntern ? "Job offer is declined" : "Student's application is declined."):
                            (isIntern ? "Job placement has been initialized, you can start updating your logs" :"You offer was successfully sent to student.")

                            Alert.alert(
                                title,
                                message,
                            );
                            setUpdatingApplication(false);
                        })
                        .catch((err)=>{

                            console.log("Err", err);
                            const title = decliningOffer ? 
                                (isIntern ? "Offer decline failed": "Application decline failed") : 
                                (isIntern ? "Could not address offer" :"Could not send offer");

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

    if (jobStarted)  cta = (
        <View 
            center style={{
                marginVertical: 15, 
                flexDirection:'row',
                justifyContent:"space-evenly"
            }}
        >

            <CustomButton 
                // text={`Placement started ${jobStarted?.toDateString() ? `on ${jobStarted.toDateString()}` : ""}`}
                text={`Placement started`}
                onPress={()=>{}}
                style={{
                    width: "90%",
                    backgroundColor: Theme.accent
                }}
                disable
            />
        </View>
    )
    
    else if (offerDate)  cta = (
        <View 
            center style={{
                marginVertical: 15, 
                flexDirection:'row',
                justifyContent:"space-evenly"
            }}
        >

            <CustomButton 
                // text={`Sent offer ${offerDate?.toDateString() ? `on ${offerDate?.toDateString()}` : ""}`}
                text={`Sent offer`}
                onPress={()=>{}}
                style={{
                    width: "90%",
                    backgroundColor: Theme.accent
                }}
                disable
            />

        </View>
    )

    else if (!offerDate && isIntern)  cta = (
        <View 
            center style={{
                marginVertical: 15, 
                flexDirection:'row',
                justifyContent:"space-evenly"
            }}
        >

            <CustomButton 
                text={`Awaiting organization response`}
                onPress={()=>{}}
                style={{
                    width: "90%",
                    backgroundColor: Theme.accent
                }}
                disable
            />

        </View>
    )

    else if (application.declined) cta = (
        <View 
            center style={{
                marginVertical: 15, 
                flexDirection:'row',
                justifyContent:"space-evenly"
            }}
        >
            <CustomButton 
                text={
                    "Application declined"
                }
                onPress={()=>{}}
                style={{
                    width: "90%",
                    backgroundColor: Theme.red,
                }}
                disable
            />
        </View>
    )


    return (<ApplicationDetailContent application={application} isIntern={isIntern} cta={cta}/>);
}


const ApplicationDetailContent = ({application, isIntern, cta})=>{
    return (
         <ScrollView contentContainerStyle={{paddingBottom: 20}}>
            <View
                contentContainerStyle={{
                    backgroundColor:Theme.grey100,
                }}
            >

                <MiniDetailHeader student={ application.student }/>
            </View>

            {/* Content */}
            <StudentInfo showHeader isIntern={isIntern} student={application.student}/>

            <PlacementDetailInfo
                showHeader
                job = {application.job}
                date_applied = {application.date_applied}
                duration = {application.duration}
                job_started = {application.job_started}
            />

            { cta }
        </ScrollView>
    )
}


export default ApplicationDetail;