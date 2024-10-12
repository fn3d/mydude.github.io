import { createContext, useContext, useState, useEffect } from 'react';
import { useThree } from '@react-three/fiber';
import { Scene } from 'three';

// THe main definition of the context that will be used by
// the Provider.
const SceneContext = createContext(null);

// The following implies that the SceneProvider will make the
// scene and setScene variable and function (respectively)
// available to all the children wrapped in the <SceneProvider>
// tag when applied to the main application function.
export const SceneProvider = ({ children }) => {
    
    const [scene, setScene] = useState(null);
    const [camera, setCamera] = useState(null);
    const [renderer, setRenderer] = useState(null);

    return (
        <SceneContext.Provider value={{ scene, setScene, 
                                        camera, setCamera, 
                                        renderer, setRenderer }}>
            { children }
        </SceneContext.Provider>
    );
};

// Here we are writing a custom hook called useScene, so
// that we do not have to write useContext(SceneContext) 
// wherever the scene context is required.
export const useScene = () => useContext(SceneContext);
export const useCamera = () => useContext(SceneContext);
export const useRenderer = () => useContext(SceneContext);

// This component when put inside the Canvas component grabs
// the internal scene from the Canvas using useThree, and then
// applies it to the scene context we created in sceneContext.js.
export const SceneSetter = () => {

    const { gl: renderer, scene, camera } = useThree();
    const { setScene } = useScene();
    const { setCamera } = useCamera();
    const { setRenderer } = useRenderer();

    useEffect(() => {
        setScene(scene);
    }, [scene, setScene]); // Only update when the scene changes

    useEffect(() => {
        setCamera(camera);
    }, [camera, setCamera]); // Only update when the scene changes

    useEffect(() => {
        setRenderer(renderer);
    }, [renderer, setRenderer]); // Only update when the scene changes

    return null;
}