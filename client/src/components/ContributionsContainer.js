import Contribution from "./Contribution"
export default function ContributionsContainer({ markers }) {


    return (
        <div className = "flex-container">
             {markers.map( marker =>  <Contribution marker={marker}/>)}
        </div>
    )
}