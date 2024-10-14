import * as THREE from 'three';

export function DynamicLabel({ raycastCoords, mouseCoords, showCoords }) {

    return (
        <div className="dynamicLabel"
            style={{
                display: showCoords,
                position: 'absolute',
                textAlign: 'center',
                height: '25px',
                opacity: '90%',
                backgroundColor: '#313131',
                color: 'white',
                borderRadius: '7px',
                lineHeight: '25px',
                paddingLeft: '10px',
                paddingRight: '10px',
                fontSize: '13px',
                boxShadow: '2px 2px 5px 1px #434343',
                marginLeft: '10px',
                marginTop: '10px',
            }}
        >
            { raycastCoords }
        </div>
    );
}