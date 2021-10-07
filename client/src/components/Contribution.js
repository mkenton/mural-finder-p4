import placeholderLogo from "../logo.svg"
import { formatRelative } from "date-fns";
export default function Contribution({ marker, place }) {
      
        // Method  with places
        console.log("place=", place)
        return (
                <section className="contribution">
                        <h2>{place.title}</h2>
                        <img src={place.image_url} width="100" height="100" />
                </section>
        )




        // //method with markers
        
        // return (
        //             <section className = "contribution">
        //             {/* <h2>{marker.title}</h2> */}
        //             <h2>Title</h2>
        //             <img src={placeholderLogo} width="100" height="100"/>
        //             Contributed: <em>{formatRelative(marker.time, new Date())}</em>
        //             <p>Description: {marker.description ? marker.description : "" }</p>
        //             <hr/>
        //             </section>
        //     )


}