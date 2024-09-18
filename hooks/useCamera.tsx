import { useState, useEffect } from 'react';
import { Camera } from 'expo-camera';

interface CameraState {
    hasPermission: boolean | null;
    type: CameraType | null; 
    isVisible: boolean;
}

export default function useCamera(): CameraState & { toggleCameraType: () => void } {
    const [cameraStatus, setCameraStatus] = useState<CameraState>({
        hasPermission: null,
        type: Camera.Constants?.Type.back || null, 
        isVisible: false,
    });

    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setCameraStatus(prevState => ({
                ...prevState,
                hasPermission: status === 'granted',
            }));
        })();
    }, []);

    const toggleCameraType = () => {
        setCameraStatus(prevState => ({
            ...prevState,
            type: prevState.type === Camera.Constants?.Type.back
                  ? Camera.Constants?.Type.front
                  : Camera.Constants?.Type.back,
        }));
    };

    return {
        ...cameraStatus,
        toggleCameraType,
    };
}