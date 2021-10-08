import React, { useState, useEffect, useCallback, useRef } from 'react'
import { Route, BrowserRouter as Router, Switch } from "react-router-dom"
import './App.css';
import ContributionsContainer from "./components/ContributionsContainer"
import Login from "./components/Login"
import NewPlaceForm from "./components/NewPlaceForm"
import NavBar from './components/NavBar';
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import { formatRelative } from "date-fns";
// import { Button } from "./styles";
// // TODO: import if want to use autocomplete for search
//  import usePlacesAutocomplete, {
//    getGeocode,
//    getLatLng,
// } from "use-places-autocomplete";


// import {
//   Combobox,
//   ComboboxInput,
//   ComboboxPopover,
//   ComboboxList,
//   ComboboxOption,
// } from "@reach/combobox";


// import "@reach/combobox/styles.css";


import mapStyles from "./mapStyles";

//Google Map Object options
const libraries = ["places"]
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


function App() {
  const [user, setUser] = useState(null);
  const [markers, setMarkers] = useState([])
  const [selected, setSelected] = useState(null)
  const [description, setDescription] = useState("")
  // const [onLogin, setOnLogin] = useState(null)
  const [places, setPlaces] = useState([])


  useEffect(() => {
    // auto-login
    fetch("/me").then((r) => {
      if (r.ok) {
        r.json().then((user) => setUser(user));
      }
    });
  }, []);

  useEffect(() => {
    fetch("/places")
      .then(r => r.json()
        .then(data => setPlaces(data))
      )
  }, [])


  // places.map(place => console.log(place.lat))
  const first = places[0]
  // console.log("places", places)
  console.log("first lat", first)

  let count = 0

  const onMapClick = useCallback((e) => {
    count = count + 1 // setting mural name via counter for testing. TODO: allow input to set name, add picture, etc.
    setPlaces((current) => [
      ...current,
      {
        lat: e.latLng.lat(),
        lng: e.latLng.lng(),
        date_uploaded: new Date().toLocaleDateString()
      },
    ]);
  }, [])

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GMAPS_API_KEY,
    libraries
  })

  //TODO: consult documentation, useRef may be deprecated
  const mapRef = useRef();
  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
  }, [])

  if (loadError) return "Error loading maps"
  if (!isLoaded) return "Loading Page"

  const handleNameEntry = (event) => {
    event.preventDefault();
    //  console.log("filter for correct marker:", markers.filter(marker => marker.time === selected.time))
    //map over markers and set description for marker where marker.id = selected.id
    setDescription(event.target.value)
    console.log(event.target.value)
  }

  function handleLogoutClick() {
    fetch("/logout", { method: "DELETE" }).then((r) => {
      if (r.ok) {
        setUser(null);
      }
    });
  }
  
  const handleSubmit = (e) => {
    e.preventDefault()
    setMarkers(markers.map((marker) =>
      selected.time === marker.time ? { ...marker, description: description } : marker))
  }

  // console.log("in app.js: user:", user)

  if (!user)
    return <Login
      onLogin={setUser}
      places={places}
      selected={selected}
      setSelected={setSelected}
      center={center}
      options={options}
      onLoad={onMapLoad}
      handleSubmit={handleSubmit}
      handleNameEntry={handleNameEntry} />

  return (
    <Router>
      <div className="App">

        {/* TODO: Turn NavBar into Component */}
        <NavBar handleLogoutClick={handleLogoutClick} />

        <Switch>
          <Route path="/contributions">
            <ContributionsContainer markers={markers} user={user} places={places} setPlaces={setPlaces} />
          </Route>
          <Route path="/bucketlist">
            {/* <BucketList/> */}
            <p>Bucket List</p>
          </Route>
          {/* <Route path="/loginpage">
              <Login onLogin={setOnLogin}/>
            </Route> */}
          <Route exact path="/">
            {/* TODO: Refactor map into Home w/ map and Contributions w/ map, add header w/ username */}
            <div className="grid-container">
              <GoogleMap
                mapContainerStyle={mapContainerStyle}
                zoom={10}
                center={center}
                options={options}
                onClick={onMapClick}
                places={places}
                onLoad={onMapLoad}
              >
                {/* {markers.map((marker) => (
                  <Marker
                    key={marker.time.toISOString()}
                    position={{ lat: marker.lat, lng: marker.lng }}
                    draggable={true}
                    animation={2}
                    onClick={(e) => {
                      // console.log(e)
                      setSelected(marker)
                    }}
                  />
                ))} */}

                {places.map((place) => (
                  <Marker
                    key={place.id}
                    position={{ lat: parseFloat(place.lat), lng: parseFloat(place.lng) }}
                    draggable={true}
                    animation={2}
                    onClick={(e) => {
                      // console.log(e)
                      setSelected(place)
                    }}
                  />
                ))}

                {selected ? (
                  <InfoWindow
                    position={{ lat: selected.lat, lng: selected.lng }}
                    onCloseClick={() => setSelected(null)}>
                    <div>
                      <h2>{selected.title}</h2>
                      <p>Contributed: {selected.date_uploaded}</p>
                      {/* <p>Contributed: {formatRelative(selected.date_uploaded, new Date())}</p> */}
                      {/* {selected.description ? <p>Description: {selected.description}</p> : <form id="popoutForm" onSubmit={handleSubmit}>
                        <label for="mural-description">Description:</label>
                        <input onChange={handleNameEntry} type="text" id="mural-description" name="mural-description"></input>
                      </form>} */}
                    </div>
                  </InfoWindow>)
                  : null}
                  
              </GoogleMap>
              <NewPlaceForm setPlaces={setPlaces} places={places} user={user} />
            </div>
          </Route>
          <Route path="*"><h1 className="page-not-found">404 Page Not Found :(</h1></Route>
        </Switch>
      </div>
    </Router>

  );
}


export default App;
