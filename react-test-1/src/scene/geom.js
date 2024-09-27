import * as THREE from 'three';

// Primitive factory function
export function createPrimitive(primType) {

    let geom = null;

    switch (primType) {
        case 'box':
            geom = new THREE.BoxGeometry(3, 2, 2);
            break;
        case 'sphere':
            geom = new THREE.SphereGeometry(1.5, 20, 20);
            break;
        case 'cylinder':
            geom = new THREE.CylinderGeometry(1.5, 1.5, 2);
            break;
        case 'cone':
            geom = new THREE.ConeGeometry(1.5, 2);
            break;
    }

    const wireframeGeom = geom.clone();

    return (
        <mesh castShadow receiveShadow>
            <primitive object={geom} />
            <meshPhongMaterial 
            color={0xFFD500}
            shininess={0.0}
            polygonOffset={true}
            polygonOffsetFactor={1}/>
            <mesh>
                <primitive object={wireframeGeom} />
                <meshBasicMaterial color={0x000000} wireframe/>
            </mesh>
        </mesh>
    );
}