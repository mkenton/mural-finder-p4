import React, { useState } from "react";
import { useHistory } from "react-router";
import { Button, Error, Input, FormField, Label, Logo } from "../styles";

export default function NewPlaceForm({setPlaces, places, setMarker, marker, user}) {
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();
  const [errors, setErrors] = useState("");
  const [title, setTitle] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [description, setDescription] = useState("");


  function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    console.log("in form, marker:", marker, "user: ", user)
    fetch("/places", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        lat: marker.lat,
        lng: marker.lng,
        // ERROR Cannot read properties of undefined (reading 'lat'). marker is undefined.
        title: title,
        image_url: imageUrl,
        description: description,
        user_id: user.id
        //user_id fails as well
      }),
    }).then((r) => {
      setIsLoading(false);
      if (r.ok) {
        //setPlaces([...places, r])
        //setPlaces fails as "not a function"
        console.log(places)
        // setMarker([])
        // history.push("/contributions");
      } else {
        r.json().then((err) => {
          setErrors(err.errors)
          console.log("Errors: " , errors)
        }
        );
      }
    });
  }

  return (
    <div className="sidebar">
      <Logo>Contribute</Logo>
      <form onSubmit={handleSubmit}>
        <FormField>
          <Label htmlFor="title">Title</Label>
          <Input
            type="text"
            id="title"
            autoComplete="off"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </FormField>
        <FormField>
          <Label htmlFor="image_url">Enter Image</Label>
          <Input
            type="url"
            id="image_url"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />
        </FormField>
        <FormField>
          <Label htmlFor="description">Enter Description</Label>
          <Input
            type="text"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </FormField>
        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
}
