import React, { useCallback, useContext, useState } from 'react';
import {View, Text, ActionSheet} from 'react-native-ui-lib';
import Theme from '../constants/theme';
import Button from '../components/Button';
import { ScrollView, TextInput } from 'react-native';
import Form from './form';
import Job from '../app/models/Job';
import { useJob } from '../hooks/useJobs';
import useProfile from '../hooks/useProfile';
import { Preloader } from './Modal';
import { JSONLog } from '../app/utils';


const BottomSheet = (props) => {
    const {authOut,...rest} = props;

    const pickOption = (index) =>{
        console.log("Picked", index);
    }
    
    if (authOut) return <AuthBottomSheet {...rest}/>;

    const {show, onDismiss} = rest;

    return (
        <ActionSheet
            title={'Title'}
            message={'Message of action sheet'}
            cancelButtonIndex={3}
            destructiveButtonIndex={0}
            useNativeIOS={false}
            // migrateDialog
            options={[
            {label: 'option 1', onPress: () => pickOption('option 1')},
            {label: 'option 2', onPress: () => pickOption('option 2')},
            {label: 'option 3', onPress: () => pickOption('option 3')},
            {label: 'cancel', onPress: () => pickOption('cancel')}
            ]}
            visible={show}
            onDismiss={() => onDismiss()}
        />
    );
}


const AuthBottomSheet = ({show, onDismiss, signOut}) => {

    const pickOption = (index) =>{
        console.log("Picked", index);
    }

    return (
        <ActionSheet
            renderTitle = {()=>(
                <View center style={{marginVertical: 0}}>
                    <View 
                        style={{
                            width:30, 
                            borderWidth:2, 
                            borderStyle:'solid', 
                            borderColor:"rgba(19, 1, 96, 1)", 
                            borderRadius:10,
                            marginVertical:15,
                        }}
                    ></View>
                    <Text h4 center>Log out</Text>
                </View>
            )}
            options={[
            {label: 'Yes', onPress: () => pickOption('option 1')},
            {label: 'Cancel', onPress: () => pickOption('option 2')},            
            ]}

            renderAction={(option, index, onOptionPress)=>{
                return (
                    <View center marginV-10 key={index} >
                        <Button 
                            text={option.label} 
                            onPress={()=>{
                                if (index === 0) return signOut();
                                onDismiss();
                            }}
                            style={{
                                // opacity:index === 1 ? .7 : 1,
                                backgroundColor:index === 1 ? "#D6CDFE" : Theme.main,
                                color:index === 1 ? Theme.white : Theme.grey100
                            }}
                        />
                    </View>
                )
            }}
            optionsStyle={
                {
                    // backgroundColor:'red',
                    height:'100%',
                    // marginVertical: 10,
                    paddingTop:50,

                }
            }
            dialogStyle={{
                height:300,
                // borderWidth:4,
            }}
            containerStyle={{
                backgroundColor:'transparent'
            }}
            visible={show}
            onDismiss={() => onDismiss()}
        />
    );
}


export const LogBottomSheet = ({show, data, onDismiss, editable}) => {
    // const {log} = data;
    if (!data) return;
    const [logData, setLogData] = useState(data);
    
    const {log} = logData;

    // const isNew = !log;

    return (
        <ActionSheet
            renderTitle = {()=>(
                <View center style={{marginVertical: 0}}>
                    <View 
                        style={{
                            width:30, 
                            borderWidth:2, 
                            borderStyle:'solid', 
                            borderColor:"rgba(19, 1, 96, 1)", 
                            borderRadius:10,
                            marginVertical:15,
                        }}
                    ></View>
                    <Text h4 center>Log today</Text>
                </View>
            )}
            options={[
                {label: 'Option 1', onPress: () =>{}},
            ]}

            renderAction={(option, index, onOptionPress)=>{
                return (
                    <TextInput
                        key={index}
                        editable={editable}
                        multiline
                        numberOfLines={20}
                        onChangeText={text => setLogData((p)=> {
                            return {
                                ...p,
                                log:text
                            }
                        })}
                        style={{paddingHorizontal: 20, fontSize: 16, color:Theme.grey400}}
                        placeholder={editable ? "Enter log here" : "Log should display here"}
                        textAlignVertical="top"
                        value={log}
                    />
                )
            }}
            optionsStyle={
                {
                    height:'100%',
                    paddingTop:50,

                }
            }
            dialogStyle={{
                height:500,
            }}
            containerStyle={{
                backgroundColor:'transparent'
            }}
            visible={show}
            onDismiss={() => onDismiss(logData)}
        />
    );
}


export const JobBottomSheet = ({show, jobId, onDismiss}) => {

    const { job, createUpdatejob } = useJob(jobId);
    const [userProfile] = useProfile();
    const [formErrors, setFormErrors] = useState({});
    const [loading, setLoading] = useState(false);

    const isUpdate = Boolean(job.original); // true if an id exist;

    let label, loadingLabel;

    if(isUpdate){
        label = "Update job";
        loadingLabel = "Updating job...";
    }else{
        label = "Create job";
        loadingLabel = "Creating job...";
    }


    const formSchema = Job.getJobSchema();

    const handleSubmit = (jobdt)=>{
      
        if (loading) return;
      
        // const demo = Job.demoData;

      setLoading(true)
      setFormErrors(()=>({}));

      Job.validateJobData(jobdt)
      .then(async (jobObject)=>{

        const errors = await createUpdatejob(jobObject);

        if (errors) setFormErrors(()=>(errors));
        else onDismiss();

        setLoading(false);
      })
      .catch((err)=>{
            console.log(err)
            setFormErrors(()=>(err));
            setLoading(false);
      })
    }

    const getPreviousValues = useCallback(()=>{
      // process the previous values
      const {id:organizationId} = userProfile; 
      
      return job.getFormData({ organization: organizationId, id:job.id });
    });

    return (
        <>
            <ActionSheet
                renderTitle = {()=>(
                    <View center style={{marginVertical: 0}}>
                        <View
                            style={{
                                width:30, 
                                borderWidth:2, 
                                borderStyle:'solid', 
                                borderColor:"rgba(19, 1, 96, 1)", 
                                borderRadius:10,
                                marginVertical:15,
                            }}
                        ></View>
                        <Text h4 center>{label}</Text>
                    </View>
                )}

                options={[
                    {label: 'Option 1', onPress: () =>{}},
                ]}
                optionsStyle={
                    {
                        // height:'100%',
                        paddingTop:0,
                    }
                }
                dialogStyle={{
                    height:600,
                }}
                containerStyle={{
                    backgroundColor:'transparent'
                }}

                visible={show}
                onDismiss={() => {
                    setFormErrors(()=>({}));
                    onDismiss();
                }}

                renderAction={(option, index, onOptionPress)=>{
                    return (
                        <ScrollView key={index} contentContainerStyle={{paddingBottom:120, marginHorizontal:20}}>
                            <Form
                                onSubmit={(data)=> handleSubmit(data)}
                                schema={formSchema} 
                                getPreviousValues={getPreviousValues}
                                authLabel={ loading ? loadingLabel : label }
                                errors={formErrors}
                                disable={loading}
                            />
                        </ScrollView>
                    )
                }}
                
            />

            <Preloader show={loading} text={loadingLabel}/>
        </>
    );
}


export default BottomSheet;