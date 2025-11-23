import React from 'react';
import '../../style/card.css'; // Assuming you have a CSS file for styling
// import facilityIcon from '/heart_health_icon_white.png'
import { iconAssigner } from '../../utils/imageUtils';
const Card = (props) => {
    console.log('profilePicture prop: ',props.profile)
    return (
        <div className={`card-container bg-${props.type == "test" ? "[#1c7d7f] bg-opacity-15" : "[#1c7d7f]"} hover:bg-${props.type == "test" ? "[#1c7d7f] hover:bg-opacity-20" : "[#1c7d7f] hover:bg-opacity-80"}`} onClick={props.onClick}>
            <div className='logo-container'>
                <div className='flex items-center justify-center'>{iconAssigner(props.type == "test" ? props.profile : "facility",130,props.type)}</div>
                {/* <img src={props.type == 'facility' ? '/medical_cross_1.png' : '/test_icon_white_1.png'} alt='Logo' /> */}
            </div>
            <h3 className={`card-title text-${props.type == "test" ? "[#1c7d7f]" : "white"}`}>{props.name}</h3>
        </div>
    )
}

export default Card;