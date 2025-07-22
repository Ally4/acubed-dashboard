import React from 'react';
import '../../style/card.css'; // Assuming you have a CSS file for styling
import facilityIcon from '../../images/facility.jpeg'

const Card = (props) => {

    return (
        <div className='card-container' onClick={props.onClick}>
            <div className='logo-container'>
                <img src={facilityIcon} alt='Logo' />
            </div>
            <h3 className='card-title'>{props.name}</h3>
            <p>{props.address}</p>
        </div>
    )
}

export default Card;