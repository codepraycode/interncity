import { StyleSheet, TouchableOpacity } from "react-native";
import { View, Text } from "react-native-ui-lib";
import assets from "../../constants/assets";
import Theme from "../../constants/theme";
import { boxShadowSm } from "../../constants/typography";
import Avatar from "../Avatar";


const ImageUpload = ({schema, name, })=>{
    
    const imageUrl = null;

    return (
        <View
            style={styles.container}
        >

            <View>
                <Text h5>{schema.label}</Text>

                {
                    !imageUrl ? 
                    
                    <Text small style={{color: Theme.grey300}}>{schema.placeholder}</Text>
                    :
                    
                    (
                        <View style={{flexDirection:'row', marginTop: 20}}>
                            <TouchableOpacity
                                style={[styles.button, styles.buttonSm]}
                                activeOpacity={0.8}
                            >
                                <Text h6>Change</Text>
                            </TouchableOpacity>


                            <TouchableOpacity
                                style={[styles.button, styles.buttonSm]}
                                activeOpacity={0.8}
                            >
                                <Text h6>Remove</Text>
                            </TouchableOpacity>
                        </View>
                    )

                }
                
            </View>


            {
                imageUrl ? 
                    <Avatar image={assets.user}/>
                :
                (
                    <TouchableOpacity
                        style={styles.button}
                        activeOpacity={0.8}
                    >
                        <Text h6>Upload photo</Text>
                    </TouchableOpacity>
                )
            }

        </View>
    )
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