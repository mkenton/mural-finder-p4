import { useState} from 'react'
import {
    GoogleMap,
    // useLoadScript,
    Marker,
    InfoWindow,
} from "@react-google-maps/api";
import mapStyles from "../mapStyles";
import NewPlaceForm from "./NewPlaceForm"

export default function LoggedInMapPage({ setSelected,
    selected,
    setPlaces,
    places,
    user }) {

    const mapContainerStyle = {
        width: "70vw",
        height: "90vh",
    };
    const center = {
        lat: 41.89,
        lng: -87.64
    }
    const options = {
        styles: mapStyles,
        disableDefaultUI: true,
        zoomControl: true
    }
    function handleCheckIn(id) {
        console.log("check in on ID:", id)
        fetch(`/places/${id}/check_in`, {
            method: "PATCH",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        }).then((r) => r.json())
            .then((data) => {
                console.log(data.id)
                setPlaces(places.map(place => data.id === place.id ? place.checkins = place.checkins + 1 : place))
            })
    }
    function handleButton(e) {
        console.log(e)
    }
    
    const [marker, setMarker] = useState([])  
    function handleSetMarker(e) {
        setMarker(
            {
                lat: e.latLng.lat(),
                lng: e.latLng.lng(),
                date_uploaded: new Date().toLocaleDateString()
            })
        }
        console.log("Marker Lat-Lng", marker.lat, marker.lng)
        /*THIS WORKS and I CAN Consoles out the lat and long of the marker. 
        As I click or drag it, it updates STATE*/

        return (
            
            <div className="grid-container">
            {/* In GoogleMap props, there's an onClick={(e) => handleSetMarker(e) } */}
            <GoogleMap
                mapContainerStyle={mapContainerStyle}
                zoom={10}
                center={center}
                options={options}
                onClick={(e) => handleSetMarker(e)}
                places={places}
                // onLoad={onMapLoad}
                selected={selected}
            >
                {marker ? (
                    <Marker
                        // scale={1}
                        position={{ lat: parseFloat(marker.lat), lng: parseFloat(marker.lng) }}
                        draggable={true}
                        onDragEnd={handleSetMarker} />
                ) : ("")}

                {places.map((place) => (
                    <Marker
                        // style={{fillColor: "#0073E6"}}
                        options={{ scaledSize: 1.5 }}
                        icon={'http://maps.google.com/mapfiles/kml/paddle/blu-blank.png'}
                        selected={selected}
                        key={place.id}
                        position={{ lat: parseFloat(place.lat), lng: parseFloat(place.lng) }}
                        draggable={false}
                        animation={2}
                        onClick={(e) => {
                            // console.log(e)
                            setSelected(place)
                        }}
                    />
                ))}

                {selected ? (
                    <InfoWindow
                        places={places}
                        options={{ pixelOffset: new window.google.maps.Size(0, -30) }}
                        position={{ lat: parseFloat(selected.lat), lng: parseFloat(selected.lng) }}
                        onCloseClick={() => setSelected(null)}>
                        <div className="infoWindow">
                            {selected.user ? (
                                <>
                                    <h2>{selected.title}</h2>
                                    <img src={selected.image_url} alt="mural_thumbnail" width="200" height="200" />
                                    <p> 📷 <strong>{selected.user.username}</strong></p>
                                    <p> Submitted: <strong>{selected.date_uploaded}</strong></p>
                                    <p> <strong> {selected.check_ins} total visits</strong> </p>
                                    <button onClick={() => handleCheckIn(selected.id)}>Check In</button>
                                    {/* <button onClick={() => handleBucketList(user.id, selected.id)}>Add to Bucket List</button> */}
                                </>
                            )
                                : <button onClick={e => handleButton(e)}>Add Photo</button>}
                        </div>
                    </InfoWindow>)
                    : null}
            </GoogleMap>
            {/* NewPlaceForm is passed marker state as sa prop, as seen below */}
            <NewPlaceForm 
            handleSetMarker={handleSetMarker} 
            places={places} 
            setPlaces={setPlaces} 
            setMarker={setMarker} 
            marker={marker} 
            user={user} />
        </div>

    )
}
