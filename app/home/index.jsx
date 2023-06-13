import { View, Text } from "react-native-ui-lib"
// import { useStorage } from "../../hooks";


const Home = () => {
    // const { loading, isFresh: newlyInstalled } = useStorage();

    return (
        <View
            style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <Text>Already Logged In.</Text>
        </View>
    )
}

export default Home;