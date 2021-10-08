import { useState, useEffect } from "react";
import '../App.css';
import styled from "styled-components";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";
import mapStyles from "../mapStyles";
import { Button, Logo } from "../styles";
import {
  GoogleMap,
  // useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
// import { formatRelative } from "date-fns";

function Login({ places,
  setSelected,
  selected,
  onLogin,
  onMapLoad
}) {
  const [showLogin, setShowLogin] = useState(true);

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
              icon={'http://maps.google.com/mapfiles/kml/paddle/blu-blank.png'}
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
                <img src={selected.image_url} alt="mural_thumbnail" width="180" height="auto" />
                <p> Artist: 🎨<strong>{selected.artist_name}</strong></p>
                <p> Photo by: 📷  <strong>{selected.user.username}</strong></p>
                <p> Submitted: <strong>{selected.date_uploaded}</strong></p>
                <p>Total checkins: <strong>{selected.check_ins > 0 ? selected.check_ins : 0}</strong></p>
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
