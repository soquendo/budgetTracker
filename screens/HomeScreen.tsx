import React from 'react';
import { View, Text, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import useCamera from '../hooks/useCamera';
import { globalStyles } from '../styles/globalStyles';
import { Camera } from 'expo-camera';

const HomeScreen: React.FC = () => {
    const { cameraStatus, toggleCameraVisibility } = useCamera();
    const navigation = useNavigation();

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <Button
                    onPress={toggleCameraVisibility}
                    title={cameraStatus.isVisible ? "Hide Camera" : "Show Camera"}
                />
            ),
        });
    }, [navigation, cameraStatus.isVisible]);

    return (
        <View style={globalStyles.container}>
            <Text>Welcome to the Budget Tracker</Text>
            {cameraStatus.isVisible && (
                <Camera
                    style={globalStyles.camera}
                    type={cameraStatus.type}
                />
            )}
        </View>
    );
};

export default HomeScreen;