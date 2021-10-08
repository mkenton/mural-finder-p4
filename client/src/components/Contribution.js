export default function Contribution({ marker, place }) {
      
        return (
                <div className="contribution" style={{margin: "10px"}}>
                        <h2>{place.title}</h2>
                        <div><img src={place.image_url} width="auto" height="150" alt="mural_pic" /></div>
                        <p>Total checkins: <strong>{place.check_ins >0 ? place.check_ins : 0}</strong></p>
                </div>
        )


}