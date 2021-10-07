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

function Login({ onLogin, markers, selected, setSelected, center, options, onMapLoad, handleSubmit, handleNameEntry }) {
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
                {selected.description ? <p>Description: {selected.description}</p> : <form id="popoutForm" onSubmit={handleSubmit}>
                  <label for="mural-description">Description:</label>
                  <input onChange={handleNameEntry} type="text" id="mural-description" name="mural-description"></input>
                </form>}
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
