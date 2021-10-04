import placeholderLogo from "../logo.svg"
import { formatRelative } from "date-fns";
export default function Contribution({ marker }) {
marker.img = placeholderLogo
    return (
            <section className = "contribution">
            <h2>{marker.muralName}</h2>
            <img src={marker.img} width="100" height="100"/>
            Contributed: <em>{formatRelative(marker.time, new Date())}</em>
            <p>Description: {marker.description ? marker.description : "" }</p>
            <hr/>
            </section>
    )
    }