export default function Contribution({ marker, place }) {
      
        return (
                <section className="contribution">
                        <h2>{place.title}</h2>
                        <img src={place.image_url} width="100" height="100" />
                        <p>Total checkins: {place.check_ins}</p>
                </section>
        )


}