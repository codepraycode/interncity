import React from 'react';
import { StyleSheet } from 'react-native';
import {Modal,View} from 'react-native-ui-lib';
import Theme from '../constants/theme';

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
    alignItems: 'center',
    shadowColor: Theme.grey200,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});

export default AppModal;