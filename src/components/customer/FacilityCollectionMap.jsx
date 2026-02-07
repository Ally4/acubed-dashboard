import React, { useState, useEffect } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { getAllFacilities } from '../../services/dashboardService';
import { useSelector } from 'react-redux';
import MarkerClusterGroup from '@changey/react-leaflet-markercluster'; 
import '@changey/react-leaflet-markercluster/dist/styles.min.css'; 

import { customFacilityIcon, customUserIcon } from '../../utils/mapUtils';

const FacilityCollectionMap = (props) => {
    const user = useSelector((state) => state.login.data);
    const countryId = user ? user.countryId : null;
    const token = user ? user.token : null
    const [facilities, setFacilities] = useState([]);

    useEffect(() => {
        if(!countryId || !token) return;
        const fetchFacilities = async () => {
            const data = await getAllFacilities(countryId,token); // Adjust parameters as needed
            if (data) {
                setFacilities(data);
                console.log('set map facilities: ',data)
            }
        }
        fetchFacilities();
    }, [countryId, token]);

    return(
            <MapContainer center={[props.latitude, props.longitude]} zoom={18} style={{ height: "100%", width: "100%", borderRadius: '8px' }}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    maxZoom={19}
                />
                {/* <MarkerClusterGroup
                    chunkedLoading
                > */}
                    {facilities.length > 0 && facilities.map((item,index) => {
                        return (<Marker key={index} position={[parseFloat(item.latitude ? item.latitude : "0"), parseFloat(item.longitude ? item.longitude : "0")]} icon={customFacilityIcon} eventHandlers={{ click: () => props.setMapFacility({
                            address: item.address,
                            facility: item.name,
                            latitude: item.latitude,
                            longitude: item.longitude,
                            id: item.id
                        }) }}>
                            <Popup>
                                <div className='bg-white h-auto p-1 flex items-center justify-center flex-col rounded-xl'>
                                    <h3 className='font-semibold text-base'>{item.name}</h3>
                                    <p className='text-sm'>{item.address}</p>
                                </div>
                            </Popup>
                        </Marker>)
                    })}

                    <Marker key={'user_pos'} position={[props.latitude, props.longitude]} icon={customUserIcon}/>
                {/* </MarkerClusterGroup> */}
            </MapContainer>
    )


}

export default FacilityCollectionMap