export default function ContributionsContainer({ markers }) {


    return (
        <div>
            <p>Contributions!!</p>
            <ul>
                {markers.map((marker) => (
             <li>{marker.muralName} | Time Contributed: {marker.time.toISOString()}</li>
           )
           )}
           </ul>
        </div>
    )
}