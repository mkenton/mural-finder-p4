import { useState } from 'react'
import {
    GoogleMap,
    // useLoadScript,
    Marker,
    InfoWindow,
} from "@react-google-maps/api";
import mapStyles from "../mapStyles";
import NewPlaceForm from "./NewPlaceForm"
import { Button } from "../styles";

export default function LoggedInMapPage({ setSelected,
    selected,
    setPlaces,
    places,
    user, onMapLoad }) {

    const [marker, setMarker] = useState([])

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
    function handleBucketList(user_id, place_id) {
      console.log(`Adding ${place_id} to bucket list of user ${user_id}`)
      // add place.id to bucket list array
      fetch(`/users/${user_id}`, {
        method: "PATCH",
        headers: {
  // update bucket list array with new place.id
          'Content-Type': 'application/json',
        },
        // body: JSON.stringify(updatedObj)
      }).then((r) => r.json())
        .then((data) => {
          console.log(data.id)
          // setUser with user.id === data.id to have bucket_list udpated with new array
        })
    }

    function handleSetMarker(e) {
        setMarker(
            {
                lat: e.latLng.lat(),
                lng: e.latLng.lng(),
                date_uploaded: new Date().toLocaleDateString(),
            })
    }
    console.log("Marker Lat-Lng", marker.lat, marker.lng)


    return (

        <div className="grid-container">
            <GoogleMap
                mapContainerStyle={mapContainerStyle}
                zoom={10}
                center={center}
                options={options}
                onClick={(e) => handleSetMarker(e)}
                places={places}
                onLoad={onMapLoad}
                selected={selected}
            >
                {marker ? (
                    <Marker
                        // scale={1}
                        position={{ lat: parseFloat(marker.lat), lng: parseFloat(marker.lng) }}
                        animation={1}
                        draggable={true}
                        onDragEnd={handleSetMarker} />
                ) : ("")}

                {places.map((place) => (
                    <Marker
                        // style={{fillColor: "#0073E6"}}
                        // options={{ scaledSize: 1.5 }}
                        icon={'http://maps.google.com/mapfiles/kml/paddle/blu-blank.png'}
                        selected={selected}
                        key={place.id}
                        position={{ lat: parseFloat(place.lat), lng: parseFloat(place.lng) }}
                        draggable={false}
                        // animation={2}
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

                            <h2>{selected.title}</h2>
                            <img src={selected.image_url} alt="mural_thumbnail" width="270" height="auto" />
                            <p> 📷 <strong>{selected.user.username}</strong></p>
                            <p> Submitted: <strong>{selected.date_uploaded}</strong></p>
                            <p>Total checkins: <strong>{selected.check_ins > 0 ? selected.check_ins : 0}</strong></p>
                            <Button onClick={() => handleCheckIn(selected.id)}>Check In</Button>
                            <Button onClick={() => handleBucketList(user.id, selected.id)}>Add to Bucket List</Button>
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
