import React, { useContext } from 'react';
import {View, Text, ActionSheet} from 'react-native-ui-lib';
import Theme from '../constants/theme';
import Button from '../components/Button';
import { TextInput } from 'react-native';


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


export const LogBottomSheet = ({show,data, onDismiss}) => {

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
                        style={{paddingVertical: 10, fontSize: 18}}
                        placeholder="Enter log here"
                        textAlignVertical="top"
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

    const {id} = data;

    const isUpdate = Boolean(id);

    const inputStyle = {
        paddingVertical: 10, fontSize: 18, paddingLeft:10,
        marginVertical:15,
        maxWidth:'90%',
        width: 300,
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
                    <Text h4 center>{isUpdate ? 'Update Job' : "Create Job"}</Text>
                </View>
            )}
            options={[
                {label: 'Option 1', onPress: () =>{}},
            ]}
            optionsStyle={
                {
                    height:'100%',
                    paddingTop:50,
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
                    <View centerH key={index}>
                        <TextInput
                            onChangeText={text => console.log(text)}
                            style={inputStyle}
                            placeholder="Enter Job title"
                            autoFocus={true}
                        />

                        <TextInput
                            onChangeText={text => console.log(text)}
                            style={inputStyle}
                            placeholder="Select job city"
                        />

                        <TextInput
                            onChangeText={text => console.log(text)}
                            style={inputStyle}
                            placeholder="Enter stipend"
                        />
                        <TextInput
                            onChangeText={text => console.log(text)}
                            style={inputStyle}
                            placeholder="Enter stipend interval"
                        />
                        <TextInput
                            onChangeText={text => console.log(text)}
                            style={inputStyle}
                            placeholder="Select sectors"
                        />


                        <Button text={"Save"} style={{marginTop: 20,}} onPress={onDismiss}/>
                    </View>
                )
            }}
            
        />
    );
}


export default BottomSheet;