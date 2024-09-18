import { useState, useEffect } from 'react';
import { Camera, CameraType } from 'expo-camera';

interface CameraState {
    hasPermission: boolean | null;
    type: number;  // Assuming type is a number for CameraType.back/front
}

interface UseCameraHook {
    cameraStatus: CameraState;
    toggleCameraType: () => void;
}

export default function useCamera(): UseCameraHook {
    const [cameraStatus, setCameraStatus] = useState<CameraState>({
        hasPermission: null,
        type: CameraType ? CameraType.back : 1,
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
            type: prevState.type === (CameraType ? CameraType.back : 1)
                  ? (CameraType ? CameraType.front : 0)
                  : (CameraType ? CameraType.back : 1),
        }));
    };

    return { cameraStatus, toggleCameraType };
}