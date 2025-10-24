import React from 'react';
import '../../style/card.css'; // Assuming you have a CSS file for styling
// import facilityIcon from '/heart_health_icon_white.png'
import { iconAssigner } from '../../utils/imageUtils';
const Card = (props) => {
    // console.log('name prop: ',props.name)
    // console.log('address prop: ',props.address)
    console.log('profilePicture prop: ',props.profile)
    return (
        <div className='card-container' onClick={props.onClick}>
            <div className='logo-container'>
                <div className='flex items-center justify-center'>{iconAssigner(props.type == "test" ? props.profile : "facility",130)}</div>
                {/* <img src={props.type == 'facility' ? '/medical_cross_1.png' : '/test_icon_white_1.png'} alt='Logo' /> */}
            </div>
            <h3 className='card-title'>{props.name}</h3>
            {/* <p>{props.address}</p> */}
        </div>
    )
}

export default Card;