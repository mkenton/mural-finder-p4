import React, { useState, useEffect, useCallback, useRef } from 'react'
import { Route, BrowserRouter as Router, Switch, NavLink } from "react-router-dom"
import './App.css';
import ContributionsContainer from "./components/ContributionsContainer"
import Login from "./components/Login"
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
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

import { formatRelative } from "date-fns";

// import "@reach/combobox/styles.css";


import mapStyles from "./mapStyles";

const libraries = ["places"]
const mapContainerStyle = {
  width: "80vw",
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
  // const [user, setUser] = useState(null);
  // useEffect(() => {
  //   // auto-login
  //   fetch("/me").then((r) => {
  //     if (r.ok) {
  //       r.json().then((user) => setUser(user));
  //     }
  //   });
  // }, []);

  // if (!user) return <Login onLogin={setUser} />;


  let count = 0
  const [markers, setMarkers] = useState([])
  const [selected, setSelected] = useState(null)

  const onMapClick = useCallback((e) => {
    count = count + 1
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

  const mapRef = useRef();
  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
  }, [])

  if (loadError) return "Error loading maps"
  if (!isLoaded) return "Loading Page"


  // ROUTER METHOD
  return (
    <Router>
      <div className="App">

        <nav className="navbar">
          <NavLink exact activeClassName="active-nav" className="navbar-links" to="/">MAP</NavLink>
          <NavLink activeClassName="active-nav" className="navbar-links" to="/contributions">CONTRIBUTIONS</NavLink>
          <NavLink activeClassName="active-nav" className="navbar-links" to="/bucketlist">BUCKET LIST</NavLink>
          <NavLink activeClassName="active-nav" className="navbar-links" to="/login">Login</NavLink>
        </nav>

        <Switch>
          <Route path="/contributions">
            <ContributionsContainer markers={markers} />
          </Route>
          <Route path="/bucketlist">
            {/* <BucketList/> */}
            <p>Bucket List</p>
          </Route>
          <Route path="/login">
            {/* <Login/> */}
            <p>Login</p>
          </Route>
          <Route exact path="/">
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
                  </div>

                </InfoWindow>) : null}
            </GoogleMap>
          </Route>
          <Route path="*"><h1 className="page-not-found">404 Page Not Found :(</h1></Route>
        </Switch>
      </div>
    </Router>

  );
}






//   // RENDER MAP ONLY
//   return (
//     <div className="App">
//       <GoogleMap
//         mapContainerStyle={mapContainerStyle}
//         zoom={10}
//         center={center}
//         options={options}
//         onClick={onMapClick}
//        >
//            {markers.map((marker) => (
//              <Marker
//                key={marker.time.toISOString()}
//                position={ {lat: marker.lat, lng: marker.lng}}
//              />
//            ))}
//            </GoogleMap>
//     </div>
//   );
// }


export default App;
