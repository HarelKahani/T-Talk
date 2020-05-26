import { Rectangle } from 'react-shapes';
import React from 'react';

class Square extends React.Component {

    render() {
        return (
            <div>
                <Rectangle id="square1" width={75} height={75} fill={{color:'#2409ba'}}/>
            </div>
        )
    }
}

export default Square
