import { View, Text } from "react-native-ui-lib"
// import { useStorage } from "../../hooks";


const NewProfile = () => {
    // const { loading, isFresh: newlyInstalled } = useStorage();

    return (
        <View
            style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <Text>New profile.</Text>
        </View>
    )
}

export default NewProfile;