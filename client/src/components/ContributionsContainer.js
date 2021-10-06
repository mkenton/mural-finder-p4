import Contribution from "./Contribution"
import { useEffect, useState } from "react"
export default function ContributionsContainer({ markers, user }) {

    //     useEffect(() => {
    //     fetch("/me").then((r) => {
    //       if (r.ok) {
    //         r.json().then((user) => setUser(user));
    //       }
    //     });
    //   }
    const [places, setPlaces] = useState([])
    console.log("in contributionsContainer: user: ", user)
    // console.log("Above useEffect", places)

    useEffect(() => {
        fetch("/places")
            .then(r => r.json()
                .then(data => setPlaces(data))
            )
    }, [])

    // const userPlaces = places.filter(place => place.user_id === user.id)
    // console.log('userplaces = ', userPlaces)

    // console.log("Under useEffect", places)
    return (
        <div className="flex-container">
            {places.filter(place => place.user_id === user.id).map(place => <Contribution place={place}/>)}
            {/* {places.filter(place => place.user_id === user.id).map(place => <Contribution place={place}/>)} */}
            {/* {markers.map(marker => <Contribution marker={marker} />)} */}
        </div>
    )
}