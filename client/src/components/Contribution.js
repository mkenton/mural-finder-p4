export default function Contribution({ marker, place }) {
      
        return (
                <section className="contribution">
                        <h2>{place.title}</h2>
                        <img src={place.image_url} width="100" height="100" alt="mural_pic" />
                        <p>Total checkins: <strong>{place.check_ins >0 ? place.check_ins : 0}</strong></p>
                </section>
        )


}