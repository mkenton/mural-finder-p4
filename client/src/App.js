import React, { useState, useEffect, useCallback, useRef } from 'react'
import { Route, BrowserRouter as Router, Switch, NavLink } from "react-router-dom"
import './App.css';
import ContributionsContainer from "./components/ContributionsContainer"
import Login from "./components/Login"
import NewPlaceForm from "./components/NewPlaceForm"
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import { formatRelative } from "date-fns";
import { Button } from "./styles";
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
  useEffect(() => {
    // auto-login
    fetch("/me").then((r) => {
      if (r.ok) {
        r.json().then((user) => setUser(user));
      }
    });
  }, []);





  let count = 0
  const [markers, setMarkers] = useState([])
  const [selected, setSelected] = useState(null)
  const [description, setDescription] = useState("")
  const [onLogin, setOnLogin] = useState(null)
  const [places, setPlaces] = useState([])

  const onMapClick = useCallback((e) => {
    count = count + 1 // setting mural name via counter for testing. TODO: allow input to set name, add picture, etc.
    setMarkers((current) => [
      ...current,
      {
        muralName: `Mural ${count}`,
        lat: e.latLng.lat(),
        lng: e.latLng.lng(),
        time: new Date()
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
    markers={markers}
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
          <nav className="navbar">
            {/* <NavLink activeClassName="active-nav" className="login-link" to="/loginpage">Login</NavLink> */}
            <Button className="login-link" onClick={handleLogoutClick}>
              Logout
            </Button>
            <NavLink exact activeClassName="active-nav" className="navbar-links" to="/">MAP</NavLink>
            <NavLink activeClassName="active-nav" className="navbar-links" to="/contributions">CONTRIBUTIONS</NavLink>
            <NavLink activeClassName="active-nav" className="navbar-links" to="/bucketlist">BUCKET LIST</NavLink>
          </nav>

          <Switch>
            <Route path="/contributions">
              <ContributionsContainer markers={markers} user={user} places={places} setPlaces={setPlaces}/>
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
                onLoad={onMapLoad}
              >
                {markers.map((marker) => (
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
                ))}

                {selected ? (
                  <InfoWindow
                    position={{ lat: selected.lat, lng: selected.lng }}
                    onCloseClick={() => setSelected(null)}>
                    <div>
                      <h2>{selected.muralName}</h2>
                      <p>Contributed: {formatRelative(selected.time, new Date())}</p>
                      {/* {selected.description ? <p>Description: {selected.description}</p> : <form id="popoutForm" onSubmit={handleSubmit}>
                        <label for="mural-description">Description:</label>
                        <input onChange={handleNameEntry} type="text" id="mural-description" name="mural-description"></input>
                      </form>} */}
                    </div>
                  </InfoWindow>) 
                  : null}
              </GoogleMap>
              <NewPlaceForm setPlaces={setPlaces} places={places} user={user}/>
              </div>
            </Route>
            <Route path="*"><h1 className="page-not-found">404 Page Not Found :(</h1></Route>
          </Switch>
        </div>
      </Router>

    );
  }


export default App;
