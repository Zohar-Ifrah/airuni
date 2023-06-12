import GoogleMapReact from 'google-map-react'

export function DetailsMap({ loc }) {

    const center = {
        lat: loc.lat,
        lng: loc.lan
    }

    const zoom = 10

    return (
        <div id='locations' className="details-map">

            <h2>Where you'll be</h2>

            <div style={{ height: '480px', width: '100%' }}>
                <GoogleMapReact
                    bootstrapURLKeys={{ key: process.env.REACT_APP_MAPS_API_KEY, language: 'en' }}
                    defaultCenter={center}
                    defaultZoom={zoom}
                >
                    {/* TO ADD markers, overlays, or other map components here */}
                </GoogleMapReact>
            </div>

            <h3> {`${loc.city}, ${loc.country}`} </h3>
        </div>
    )
}