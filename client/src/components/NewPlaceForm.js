import React, { useState } from "react";
import { Button, Error, Input, FormField, Label, Logo } from "../styles";






export default function NewPlaceForm() {

    function handleSubmit(e) {
        e.preventDefault();
        console.log(e)
    }

    const [title, setTitle] = useState("");
    const [imageUrl, setImageUrl] = useState("");

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
    )
}