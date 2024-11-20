import  React from 'react';
import { StyleSheet, Modal, View, ActivityIndicator } from 'react-native';

// 1. Create the Loader component, it has a single prompt which is false by default and if true the Modal will be visible 
const LoadingScreen = ({ isLoaderShow = false }) => (
    //Modal presents content above everything else and ActivityIndicator is a component that shows a circular loading indicator
    <Modal transparent visible={isLoaderShow}>
        <View style={styles.MainContainer}>
            <ActivityIndicator size='large' color='black' />
        </View>
    </Modal>
);
// To utilize this component in an app:
/*
guide:
import { LoaderContext } from "../componets/LoaderContext";
import LoadingScreen from "../componets/LoadingScreen";
import useContext
Create a const to access to the global loading state and its associated setter.
 const { isLoading, setIsLoading } = useContext(LoaderContext);
 setIsLoading(true); for where to start the loading
 setIsLoading(false); where to stop the loading
 {isLoading && <LoadingScreen isLoaderShow={isLoading} />} in return  for bring in LoadingScreen
*/

const styles = StyleSheet.create({
    MainContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)'
    }
  });

export default  LoadingScreen;