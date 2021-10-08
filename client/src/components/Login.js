import { useState } from "react";
import '../App.css';
import styled from "styled-components";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";
import { Button, Logo } from "../styles";
import {
  GoogleMap,
  // useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import { formatRelative } from "date-fns";

function Login({ onLogin, places, selected, setSelected, center, options, onMapLoad }) {
  const [showLogin, setShowLogin] = useState(true);

  return (
    <div className="grid-container">
      <div className="grid-item">
        <GoogleMap
          mapContainerStyle={{
            width: "70vw",
            height: "90vh",
          }}
          zoom={10}
          center={center}
          options={options}
          onLoad={onMapLoad}
        >
          {places.map((place) => (
            <Marker
              // selected={selected}
              key={place.id}
              position={{ lat: parseFloat(place.lat), lng: parseFloat(place.lng) }}
              animation={2}
              onClick={(e) => {
                // console.log(e)
                setSelected(place)
              }}
            />
          ))}

          {selected ? (
            <InfoWindow
              options={{ pixelOffset: new window.google.maps.Size(0, -30) }}
              position={{ lat: parseFloat(selected.lat), lng: parseFloat(selected.lng) }}
              onCloseClick={() => setSelected(null)}>
              <div className="infoWindow">
                <h2>{selected.title}</h2>
                <img src={selected.image_url} alt="mural_thumbnail" width="140" height="140" />
                <p>Contributed by: {selected.user_id}</p>
                <p>on: {selected.date_uploaded}</p>
                {/* <p>Contributed: {formatRelative(selected.date_uploaded, new Date())}</p> */}
                {/* {selected.description ? <p>Description: {selected.description}</p> : <form id="popoutForm" onSubmit={handleSubmit}>
                <label for="mural-description">Description:</label>
                <input onChange={handleNameEntry} type="text" id="mural-description" name="mural-description"></input>
              </form>} */}
              </div>
            </InfoWindow>) : null}
        </GoogleMap>
      </div>
      <div className="sidebar">
        <Logo>Mural Finder</Logo>
        {showLogin ? (
          <>
            <LoginForm onLogin={onLogin} />
            <Divider />
            <p>
              Don't have an account? &nbsp;
              <Button color="secondary" onClick={() => setShowLogin(false)}>
                Sign Up
              </Button>
            </p>
          </>
        ) : (
          <>
            <SignUpForm onLogin={onLogin} />
            <Divider />
            <p>
              Already have an account? &nbsp;
              <Button color="secondary" onClick={() => setShowLogin(true)}>
                Log In
              </Button>
            </p>
          </>
        )}
      </div>
    </div>
  );
}


const Wrapper = styled.section`
      max-width: 500px;
      margin: 40px auto;
      padding: 16px;
      `;

const Divider = styled.hr`
      border: none;
      border-bottom: 1px solid #ccc;
      margin: 16px 0;
      `;

export default Login;
