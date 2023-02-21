import { useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { View, Text } from "react-native-ui-lib";
import assets from "../../constants/assets";
import Theme from "../../constants/theme";
import { boxShadowSm } from "../../constants/typography";
import Avatar from "../Avatar";
import * as ImagePicker from 'expo-image-picker';
import { JSONLog } from "../../app/utils";


const MainTemplate = ({pickedImage, schema, image,hasPermission, setImage})=>{
    return (
        <View
            style={styles.container}
        >

            <View>
                <Text h5>{schema.label}</Text>

                {
                    !image ? 
                    
                    <Text small style={{color: Theme.grey300}}>
                        {hasPermission ? schema.placeholder : "No permission to select photo"}
                    </Text>
                    :
                    
                    (
                        <View style={{flexDirection:'row', marginTop: 20}}>
                            <TouchableOpacity
                                style={[styles.button, styles.buttonSm]}
                                activeOpacity={0.8}
                                onPress={pickedImage}
                            >
                                <Text h6>Change</Text>
                            </TouchableOpacity>


                            <TouchableOpacity
                                style={[styles.button, styles.buttonSm]}
                                activeOpacity={0.8}
                                onPress={()=>setImage(null)}
                            >
                                <Text h6>Remove</Text>
                            </TouchableOpacity>
                        </View>
                    )

                }
                
            </View>


            {
                image ? 
                    <Avatar image={image}/>
                :
                (
                    <TouchableOpacity
                        style={styles.button}
                        activeOpacity={0.8}
                        onPress={pickedImage}
                    >
                        <Text h6>Upload photo</Text>
                    </TouchableOpacity>
                )
            }

        </View>
    )
}


const MiniTemplate = ({pickedImage, image, profile, center})=>{
    return (
        <View center>
            {/* Image */}
            <View center style={{width: 40, height: 40, borderRadius: 20}}>
                <Avatar image={image}/>
            </View>

            {/* Text */}
            <View center={center} style={{marginVertical: 10}}>
                <Text h4 center style={{color: Theme.grey100, marginTop: 10,}}>{profile.name}</Text>
                <Text label center style={{color: Theme.grey100}}>{profile.type}</Text>
            </View>

            {/* Button to change Image */}
            <TouchableOpacity 
                activeOpacity={0.5}
                onPress={pickedImage}
                style={{
                    backgroundColor: "rgba(255, 255, 255, .2)",
                    alignItems:'center',
                    width: 130,
                    paddingVertical: 8,
                    borderRadius: 8,
                }}
            >
                <Text p style={{color: Theme.grey100, fontSize: 13}}>Change photo</Text>
            </TouchableOpacity>
        </View>
    )
}

const ImageUpload = ({schema, name, onChange, value, mini, ...restProps})=>{

    
    const [hasGalleryPermission, setHasGalleryPermission] = useState(null);
    const [image, setImage] = useState(null);
    
    useEffect(()=>{
        (
            async ()=>{
                const galleryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
                setHasGalleryPermission(galleryStatus === 'granted');
            }
        )();
    },[]);


    const pickedImage = async ()=>{
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            allowsMultipleSelection:false,
            aspect: [4,3],
            quality: 1,
        });

        JSONLog(result);

        if(result.canceled) return;

        setImage(result.assets[0].uri);
        onChange(name, result.assets[0]);
    }


    let template = (
        <MainTemplate 
            pickedImage={pickedImage} 
            schema = {schema} 
            image = {image || value}
            hasPermission = {hasGalleryPermission}
            setImage = {setImage}
        />
    );


    if (mini) template = (
        <MiniTemplate
            pickedImage={pickedImage}
            image = {image || value}
            {...restProps}
        />
    )

    return template;
}

export { ImageUpload };


const styles = StyleSheet.create({
    container:{
        minHeight: 80,
        maxWidth:'99%',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',

        marginVertical:20,
    },

    button: {
        backgroundColor:Theme.white,
        paddingVertical:8,
        paddingHorizontal:15,
        borderRadius: 6,
        ...boxShadowSm
    },

    buttonSm: {
        marginRight:10
    },

})