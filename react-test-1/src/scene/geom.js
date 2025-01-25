import * as THREE from 'three';

// Primitive factory function
export function createPrimitive(primType) {

    let geom = null;

    switch (primType) {
        case 'box':
            geom = new THREE.BoxGeometry(3, 2, 2);
            geom.computeVertexNormals();
            break;
        case 'sphere':
            geom = new THREE.SphereGeometry(1.5, 20, 20);
            geom.computeVertexNormals();
            break;
        case 'cylinder':
            geom = new THREE.CylinderGeometry(1.5, 1.5, 2);
            geom.computeVertexNormals();
            break;
        case 'cheese':
            geom = new THREE.BufferGeometry();
            const triangles = [
                1,
                0,
                16,
                1,
                16,
                17,
                2,
                1,
                17,
                2,
                17,
                18,
                3,
                2,
                18,
                3,
                18,
                19,
                4,
                3,
                19,
                4,
                19,
                20,
                5,
                4,
                20,
                5,
                20,
                21,
                6,
                5,
                21,
                6,
                21,
                22,
                7,
                6,
                22,
                7,
                22,
                23,
                8,
                7,
                23,
                8,
                23,
                24,
                9,
                8,
                24,
                9,
                24,
                25,
                10,
                9,
                25,
                10,
                25,
                26,
                11,
                10,
                26,
                11,
                26,
                27,
                12,
                11,
                27,
                12,
                27,
                28,
                13,
                12,
                28,
                13,
                28,
                29,
                14,
                13,
                29,
                14,
                29,
                30,
                15,
                14,
                30,
                15,
                30,
                31,
                0,
                15,
                31,
                0,
                31,
                16,
                14,
                15,
                0,
                16,
                31,
                30,
                0,
                1,
                2,
                18,
                17,
                16,
                2,
                3,
                4,
                20,
                19,
                18,
                6,
                7,
                8,
                24,
                23,
                22,
                8,
                9,
                10,
                26,
                25,
                24,
                10,
                11,
                12,
                28,
                27,
                26,
                14,
                0,
                2,
                18,
                16,
                30,
                2,
                4,
                5,
                21,
                20,
                18,
                6,
                8,
                10,
                26,
                24,
                22,
                13,
                14,
                2,
                18,
                30,
                29,
                5,
                6,
                10,
                26,
                22,
                21,
                12,
                13,
                2,
                18,
                29,
                28,
                5,
                10,
                12,
                28,
                26,
                21,
                12,
                2,
                5,
                21,
                18,
                28
            ];
            let positions = [
                14.546900743858464,
                -75.74550364937666,
                -1.7763568394002505e-15,
                14.546900743858464,
                -65.45981489872304,
                -1.7763568394002505e-15,
                14.607841030351837,
                -65.3391154064701,
                -1.7763568394002505e-15,
                14.802085929420077,
                -65.19578924379753,
                -1.7763568394002505e-15,
                14.935390541994943,
                -65.17316257337791,
                -1.7763568394002505e-15,
                33.493892090658065,
                -70.90218658802536,
                -1.7763568394002505e-15,
                24.627962635057408,
                -60.10283574891566,
                -1.7763568394002505e-15,
                18.595567283442957,
                -76.38493506479654,
                -1.7763568394002505e-15,
                18.314253844754813,
                -76.28071055130067,
                -1.7763568394002505e-15,
                24.437432390385784,
                -59.75357739810768,
                -1.7763568394002505e-15,
                24.694024191284953,
                -59.71051057698231,
                -1.7763568394002505e-15,
                34.042412429226644,
                -71.09753151678508,
                -1.7763568394002505e-15,
                33.88223244860331,
                -71.33603675733096,
                -1.7763568394002505e-15,
                14.919265069939954,
                -65.48215382306117,
                -1.7763568394002505e-15,
                14.846900743858464,
                -65.53554879621824,
                -1.7763568394002505e-15,
                14.846900743858464,
                -75.74550364937666,
                -1.7763568394002505e-15,
                14.546900743858464,
                -75.74550364937666,
                2.9999999999999982,
                14.546900743858464,
                -65.45981489872304,
                2.9999999999999982,
                14.607841030351837,
                -65.3391154064701,
                2.9999999999999982,
                14.802085929420077,
                -65.19578924379753,
                2.9999999999999982,
                14.935390541994943,
                -65.17316257337791,
                2.9999999999999982,
                33.493892090658065,
                -70.90218658802536,
                2.9999999999999982,
                24.627962635057408,
                -60.10283574891566,
                2.9999999999999982,
                18.595567283442957,
                -76.38493506479654,
                2.9999999999999982,
                18.314253844754813,
                -76.28071055130067,
                2.9999999999999982,
                24.437432390385784,
                -59.75357739810768,
                2.9999999999999982,
                24.694024191284953,
                -59.71051057698231,
                2.9999999999999982,
                34.042412429226644,
                -71.09753151678508,
                2.9999999999999982,
                33.88223244860331,
                -71.33603675733096,
                2.9999999999999982,
                14.919265069939954,
                -65.48215382306117,
                2.9999999999999982,
                14.846900743858464,
                -65.53554879621824,
                2.9999999999999982,
                14.846900743858464,
                -75.74550364937666,
                2.9999999999999982
            ];
            geom.setIndex(triangles);
            positions = scaleGeometry(positions, 6);
            positions = rotateGeometry(positions, "x");
            geom.setAttribute("position", new THREE.BufferAttribute(new Float32Array(adjustCoordinates(positions)), 3));
            geom.computeVertexNormals();
            break;
        default:
            throw new Error(`Unknown primitive type: ${primType}`);
    }

    // We need to clone the geometry for the mesh wireframe because R3F works differently.
    // We cannot use the same geom object above for both the solid representation and the
    // wireframe, as it would then imply both are the same object.
    const wireframeGeom = geom.clone();

    return (
        <mesh>
            <primitive object={geom} />
            <meshPhongMaterial 
            color={0xFFD500}
            polygonOffset={true}
            polygonOffsetFactor={1}/>
            <mesh name="test">
                <primitive object={wireframeGeom} />
                <meshBasicMaterial color={0x626262} wireframe/>
            </mesh>
        </mesh>
    );
}

export function roundToDecimalPlaces(num, decimalPlaces) {
    const factor = Math.pow(10, decimalPlaces);
    return Math.round(num * factor) / factor;
}

function adjustCoordinates(coords) {
    const baseX = coords[0];
    const baseY = coords[1];
    const baseZ = coords[2];
    const adjusted = [];
    for (let i = 0; i < coords.length; i += 3) {
        const x = coords[i] - baseX;
        const y = coords[i + 1] - baseY;
        const z = coords[i + 2] - baseZ;
        adjusted.push(x, y, z);
    }
    return adjusted;
}

export function fitToCanvas() {

}

export function scaleGeometry(coords, scaleFactor) {
    return coords.map(coord => coord / scaleFactor);
}

function rotateGeometry(coords, axis) {
    const rotatedCoords = [];
    for (let i = 0; i < coords.length; i += 3) {
        const x = coords[i];
        const y = coords[i + 1];
        const z = coords[i + 2];

        if (axis === 'x') {
            rotatedCoords.push(x, -z, y);
        } else if (axis === 'y') {
            rotatedCoords.push(z, y, -x);
        } else if (axis === 'z') {
            rotatedCoords.push(-y, x, z);
        } else {
            throw new Error("Invalid axis. Choose 'x', 'y', or 'z'.");
        }
    }
    return rotatedCoords;
}