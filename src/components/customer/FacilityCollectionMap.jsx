import React, { useState, useEffect } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { getAllFacilities } from '../../services/dashboardService';
import { useSelector } from 'react-redux';
import MarkerClusterGroup from '@changey/react-leaflet-markercluster'; 
import '@changey/react-leaflet-markercluster/dist/styles.min.css'; 

import { getDistance } from 'geolib';
import { customFacilityIcon } from '../../utils/mapUtils';
import { icon } from 'leaflet';

const FacilityCollectionMap = (props) => {
    const user = useSelector((state) => state.login.data);
    const country = user ? user.data?.country : null;
    const [facilities, setFacilities] = useState([]);

    useEffect(() => {
        if(!country) return;
        const fetchFacilities = async () => {
            const data = await getAllFacilities(country); // Adjust parameters as needed
            if (data) {
                setFacilities(data);
            }
        }
        fetchFacilities();
    }, [country]);

    return(
            <MapContainer center={[props.latitude, props.longitude]} zoom={13} style={{ height: "100%", width: "100%", borderRadius: '8px' }}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <MarkerClusterGroup
                    chunkedLoading
                >
                    {facilities.length > 0 && facilities.map((item,index) => {
                        return (<Marker key={index} position={[parseFloat(item.latitude), parseFloat(item.longitude)]} icon={customFacilityIcon}>
                            <Popup>
                                <div className='bg-white h-auto p-1 flex items-center justify-center flex-col rounded-xl'>
                                    <h3 className='font-semibold text-base'>{item.facility}</h3>
                                    <p className='text-sm'>{item.address}</p>
                                </div>
                            </Popup>
                        </Marker>)
                    })}
                </MarkerClusterGroup>
            </MapContainer>
    )


}

export default FacilityCollectionMap