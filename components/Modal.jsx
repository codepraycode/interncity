import React from 'react';
import { Alert, StyleSheet,TouchableOpacity } from 'react-native';
import {Modal,View, Text, Image} from 'react-native-ui-lib';
import Theme from '../constants/theme';
import { boxShadow } from '../constants/typography';
import CustomButton from './Button';

const AppModal = ({show, onHide, children}) => {
  
  return (
    <View style={styles.centeredView}>
        <Modal
            // animationType="slide"
            transparent={true}
            visible={show}
            onRequestClose={() => {
                // Alert.alert('Modal has been closed.');
                onHide();
            }}
            onBackgroundPress={()=>onHide()}
            // enableModalBlur={true}
        >

            <View center style={styles.modalContainerView}>

                <View style={styles.modalContentContainer}>
                    {children}
                </View>
            </View>
        </Modal>
    </View>
  );
};


export const Preloader = ({show, text}) => {
  
  return (
    <View style={styles.centeredView}>
        <Modal
            // animationType="slide"
            transparent={true}
            visible={show}
            onRequestClose={() => {
                // Alert.alert('Modal has been closed.');
            }}
            onBackgroundPress={()=>{}}
        >

            <View center style={styles.modalContainerView}>

                <View center style={styles.modalContentContainer}>
                    <Image assetName="logo" assetGroup="assets" width={100} height={50}/>
                    <Text p style={{marginTop: 20}}>{text || "Loading..."}</Text>
                </View>
            </View>
        </Modal>
    </View>
  );
};

export const ErrorModal = ({show, text, ctaText, cta}) => {

  const cTa = cta || function (){}
  
  return (
    <View style={styles.centeredView}>
        <Modal
            // animationType="slide"
            transparent={true}
            visible={show}
            onRequestClose={() => {
                // Alert.alert('Modal has been closed.');
            }}
            onBackgroundPress={()=>{}}
        >

            <View center style={styles.modalContainerView}>

                <View center style={[styles.modalContentContainer, styles.errorContainer]}>
                    <Image assetName="logo" assetGroup="assets" width={100} height={50}/>
                    <Text h5 center style={{marginTop: 20, color:Theme.red}}>{text || "Error occured"}</Text>

                    <TouchableOpacity
                        style={{
                          backgroundColor:Theme.secondary,
                          paddingVertical:10,
                          width: 150,
                          borderRadius: 5,
                          marginTop:20,
                        }}
                        activeOpacity={0.6}
                        onPress={()=>cTa()}
                    >
                        <Text 
                            label 
                            style={{
                                color: Theme.white,
                                fontSize: 14,
                                textAlign:'center'
                            }}
                        >
                            {ctaText || "Try again"}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    </View>
  );
};


export const MakeOfferModal = ({show, student, onHide})=>{
    return (
        <AppModal show={show} onHide={onHide}>
            <Text h4>Confirm Offer</Text>

            <View center style={{marginVertical:20}}>
                <Text>
                    You are about to make an offer to
                </Text>
                <Text h5>{student?.fullname}</Text>
            </View>

            <Text 
                p center
                style={{
                    marginTop: 35, 
                }}
            >
                Proceed with offer?
            </Text>

            <View 
                center style={{
                    marginTop: 15, 
                }}>

                <CustomButton
                    text="Proceed" 
                    onPress={()=>onHide(true)}
                    style={{
                        width: 160,
                        paddingVertical:13,
                    }}
                />

                <CustomButton 
                    text="Cancel" 
                    onPress={()=>onHide()}
                    style={{
                        width: 160,
                        backgroundColor: Theme.red,
                        paddingVertical:13,
                        marginTop: 12,
                    }}
                    textStyle={{
                        color: Theme.lightRed
                    }}
                />
                
            </View>

        </AppModal>
    )
}


const styles = StyleSheet.create({
  modalContainerView: {
    backgroundColor: "rgba(0, 0, 0, 0.542)",
    flex:1,
    width:'100%'
  },

  modalContentContainer:{
    backgroundColor: Theme.white,
    borderRadius: 5,
    paddingVertical: 13,
    paddingHorizontal: 10,
    minWidth: 250,
    minHeight: 200,
    maxWidth: "90%",
    alignItems: 'center',
    shadowColor: Theme.grey200,
    ...boxShadow
  },

  errorContainer:{
    shadowColor:Theme.secondary,
    borderColor:Theme.secondary,
    borderWidth:1,
    maxWidth: 300,

    justifyContent:'space-between'
  }
});

export default AppModal;