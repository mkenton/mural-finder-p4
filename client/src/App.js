import React, { useState, useEffect, useCallback, useRef } from 'react'
import { Route, BrowserRouter as Router, Switch } from "react-router-dom"
import './App.css';
import ContributionsContainer from "./components/ContributionsContainer"
import Login from "./components/Login"
import NavBar from './components/NavBar';
import LoggedInMapPage from './components/LoggedInMapPage';
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
// import { formatRelative } from "date-fns";
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
// move into new components
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
  // moved to component LogggedInMap
  // const [marker, setMarker] = useState([])
  const [selected, setSelected] = useState(null)
  // const [places, setPlaces] = useState([])
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

  // moved to LoggedInMapPage, but still need in Login component
  useEffect(() => {
    fetch("/places")
      .then(r => r.json()
        .then(data => { console.log(data); setPlaces(data) })
      )
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

  // // TO DO: Delete, Probably not using
  // const handleNameEntry = (event) => {
  //   event.preventDefault();
  //   //  console.log("filter for correct marker:", markers.filter(marker => marker.time === selected.time))
  //   //map over markers and set description for marker where marker.id = selected.id
  //   setDescription(event.target.value)
  //   console.log(event.target.value)
  // }


  

  function handleLogoutClick() {
    fetch("/logout", { method: "DELETE" }).then((r) => {
      if (r.ok) {
        setUser(null);
      }
    });
  }

  // const handleSubmit = (e) => {
  //   e.preventDefault()
  //   setMarkers(markers.map((marker) =>
  //     selected.time === marker.time ? { ...marker, description: description } : marker))
  // }

  // console.log("in app.js: user:", user)

  // URGENT: ADD BACK IN
  if (!user)
    return <Login
      places={places}
      selected={selected}
      onLogin={setUser}
      setSelected={setSelected}
      // center={center}
      // options={options}
      // setPlaces={setPlaces}
      onLoad={onMapLoad}
    />
  return (
    <Router>
      <div className="App">

        {/* TODO: Turn NavBar into Component */}
        <NavBar handleLogoutClick={handleLogoutClick} />

        <Switch>
          <Route path="/contributions">
            <ContributionsContainer user={user} places={places} />
          </Route>
          <Route path="/bucketlist">
            {/* <BucketList/> */}
            <p>Bucket List</p>
          </Route>
          {/* <Route path="/loginpage">
              <Login onLogin={setOnLogin}/>
            </Route> */}
          <Route exact path="/">
            <LoggedInMapPage onLoad={onMapLoad} setSelected={setSelected} selected={selected} setPlaces={setPlaces} places={places} user={user} />
          </Route>
          <Route path="*"><h1 className="page-not-found">404 Page Not Found :(</h1></Route>
        </Switch>
      </div>
    </Router>

  );
}


export default App;
