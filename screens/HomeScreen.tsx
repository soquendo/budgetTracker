import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import useCamera from '../hooks/useCamera';

const HomeScreen: React.FC = () => {
    const { toggleCameraType } = useCamera();

    return (
        <View style={styles.container}>
            <Text>Camera View</Text>
            <Button title="Flip Camera" onPress={toggleCameraType} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
});

export default HomeScreen;