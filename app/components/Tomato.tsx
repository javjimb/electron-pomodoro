import React from "react";
import Tomate from '../../resources/images/tomate.png';
import TomateUp from '../../resources/images/tomate-up.png';
import TomateStressed from '../../resources/images/tomate-stressed.png';

interface Props {
    timerMode: string
}

const Tomato: React.FC<Props> = ({timerMode}) => {
    switch (timerMode) {
        case 'STANDBY':
            return <img width="240" src={Tomate} />;
        case 'WORKING':
            return <img width="240" src={TomateUp} />;
        case 'FINISHING':
            return <img width="240" src={TomateStressed} />;
        default:
            return <img width="240" src={Tomate} />;
    }
}

export default Tomato;
