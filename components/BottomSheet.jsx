import React, { useContext, useState } from 'react';
import {View, Text, ActionSheet} from 'react-native-ui-lib';
import Theme from '../constants/theme';
import Button from '../components/Button';
import AppContext from '../app/context';

// const useCases = [
//   {label: 'Default (Android/iOS)', useNativeIOS: false, icons: false},
//   {label: 'Default with icons', useNativeIOS: false, icons: true},
//   {label: 'Native IOS', useNativeIOS: true}
// ];
// const collectionsIcon = require('../../assets/icons/collections.png');
// const starIcon = require('../../assets/icons/star.png');
// const shareIcon = require('../../assets/icons/share.png');


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

const AuthBottomSheet = ({show, onDismiss}) => {

    const {signOut} = useContext(AppContext);

    const pickOption = (index) =>{
        console.log("Picked", index);
    }

    return (
        <ActionSheet
            // title={'Title'}
            // message={'Message of action sheet'}
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
            // cancelButtonIndex={1}
            // destructiveButtonIndex={0}
            // useNativeIOS={false}
            // migrateDialog
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


export default BottomSheet;