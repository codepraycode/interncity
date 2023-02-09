import React, { useCallback, useContext, useState } from 'react';
import {View, Text, ActionSheet} from 'react-native-ui-lib';
import Theme from '../constants/theme';
import Button from '../components/Button';
import { ScrollView, TextInput } from 'react-native';
import Form from './form';
import UserAccount from '../app/models/User';
import Job from '../app/models/Job';
import { JSONLog, setUpWithPreviousValue } from '../app/utils';
import AppContext from '../app/context';


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


export const LogBottomSheet = ({show, data, onDismiss}) => {

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
                        editable
                        multiline
                        numberOfLines={20}
                        onChangeText={text => console.log(text)}
                        style={{paddingHorizontal: 20, fontSize: 16, color:Theme.grey400}}
                        placeholder="Enter log here"
                        textAlignVertical="top"
                        value={data}
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
            onDismiss={() => onDismiss()}
        />
    );
}


export const JobBottomSheet = ({show, data, onDismiss}) => {

    const job = new Job(data);

    const isUpdate = Boolean(job.id); // true if an id exist;

    const label = isUpdate ? "Update job" : "Create job";
    const loadingLabel = isUpdate ? "Updating job..." : "Creating job...";


    const formSchema = Job.getJobSchema();

    const {userAccount} = useContext(AppContext);
    const [formErrors, setFormErrors] = useState({});
    const [loading, setLoading] = useState(false);

    const handleSubmit = (jobdt)=>{
      
      if (loading) return;
      
      // const demo = {
      //   email:"me@ccodepraycode.com",
      //   password: "letmein123"
      // }
      console.log(jobdt);

      setLoading(true)
      setFormErrors(()=>({}));

      Job.validateJobData(jobdt)
      .then((res)=>{
        console.log(res);
        setLoading(false);
      })
      .catch((err)=>{
            setFormErrors(()=>(err));
            setLoading(false);
      })
    }


    const getPreviousValues = useCallback(()=>{
      // process the previous values

      const {uid} = userAccount;
      const prevData = job.original || {}

      let seedValue = {
        organization: uid,
      }

      return setUpWithPreviousValue(formSchema, prevData, seedValue);
    });

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
            onDismiss={() => onDismiss()}

            renderAction={(option, index, onOptionPress)=>{
                return (
                    <ScrollView key={index} contentContainerStyle={{paddingBottom:120, marginHorizontal:20}}>
                        <Form
                            onSubmit={(data)=> handleSubmit(data)}
                            schema={Job.getJobSchema()} 
                            getPreviousValues={getPreviousValues}
                            authLabel={ loading ? loadingLabel : label }
                            errors={{}}
                            disable={loading}
                        />
                    </ScrollView>
                )
            }}
            
        />
    );
}


export default BottomSheet;