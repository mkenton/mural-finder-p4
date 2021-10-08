import Contribution from "./Contribution"
// import { useEffect, useState } from "react"
export default function ContributionsContainer({ user, places}) {

    return (
        <div className="flex-container">
            {places.filter(place => place.user_id === user.id).map(place => <Contribution key={place.id} place={place}/>)}
            {/* {places.filter(place => place.user_id === user.id).map(place => <Contribution place={place}/>)} */}
            {/* {markers.map(marker => <Contribution marker={marker} />)} */}
        </div>
    )
}