import * as THREE from 'three';

export function DynamicLabel({ raycastCoords, mouseCoords }) {

    return (
        <div className="dynamicLabel"
            style={{
                display: 'inline-block',
                position: 'absolute',
                textAlign: 'center',
                height: '25px',
                opacity: '90%',
                backgroundColor: '#313131',
                color: 'white',
                borderRadius: '7px',
                lineHeight: '25px',
                paddingLeft: '7px',
                paddingRight: '7px',
                fontSize: '13px',
                boxShadow: '2px 2px 5px 1px #434343'
            }}
        >
            { raycastCoords }
        </div>
    );
}