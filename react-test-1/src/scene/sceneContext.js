import { createContext, useContext, useState } from 'react';
import { useThree } from '@react-three/fiber';

// THe main definition of the context that will be used by
// the Provider.
const SceneContext = createContext(null);

// The following implies that the SceneProvider will make the
// scene and setScene variable and function (respectively)
// available to all the children wrapped in the <SceneProvider>
// tag when applied to the main application function.
export const SceneProvider = ({ children }) => {
    
    const [scene, setScene] = useState(null);

    return (
        <SceneContext.Provider value={{ scene, setScene }}>
            { children }
        </SceneContext.Provider>
    );
};

// This component when put inside the Canvas component grabs
// the internal scene from the Canvas using useThree, and then
// applies it to the scene context we created in sceneContext.js.
export const SceneSetter = () => {

    const { scene } = useThree();
    const { setScene } = useScene();
    setScene(scene);
    
    return null;
  }

// Here we are writing a custom hook called useScene, so
// that we do not have to write useContext(SceneContext) 
// wherever the scene context is required.
export const useScene = () => useContext(SceneContext);