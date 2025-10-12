import React, { useState, useEffect } from 'react'
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const FacilityCollectionMap = (props) => {

    return(
            <MapContainer center={[props.latitude, props.longitude]} zoom={13} style={{ height: "100%", width: "100%", borderRadius: '8px' }}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
            </MapContainer>
    )


}

export default FacilityCollectionMap