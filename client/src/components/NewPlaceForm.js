import React, { useState } from "react";
import { useHistory } from "react-router";
import { Button, Error, Input, FormField, Label, Logo } from "../styles";

export default function NewPlaceForm(setPlaces, places, user) {
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();
  const [errors, setErrors] = useState("");
  const [title, setTitle] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    fetch("/places", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        image_url: imageUrl,
        // user_id: user.id
      }),
    }).then((r) => {
      setIsLoading(false);
      if (r.ok) {
          console.log(r)
          history.push("/contributions");
      } else {
        r.json().then((err) => setErrors(err.errors));
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
            type="image_url"
            id="image_url"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />
        </FormField>
        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
}
