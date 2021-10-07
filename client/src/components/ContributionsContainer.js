import Contribution from "./Contribution"
import { useEffect, useState } from "react"
export default function ContributionsContainer({ markers, user, places, setPlaces }) {


    console.log("in contributionsContainer: user: ", user)
    console.log({places})

    useEffect(() => {
        fetch("/places")
            .then(r => r.json()
                .then(data => setPlaces(data))
            )
    }, [])


    return (
        <div className="flex-container">
            {places.filter(place => place.user_id === user.id).map(place => <Contribution key={place.id} place={place}/>)}
            {/* {places.filter(place => place.user_id === user.id).map(place => <Contribution place={place}/>)} */}
            {/* {markers.map(marker => <Contribution marker={marker} />)} */}
        </div>
    )
}