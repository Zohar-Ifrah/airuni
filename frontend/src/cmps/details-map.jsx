import GoogleMapReact from 'google-map-react'

export function DetailsMap({loc}) {
    const center = {
        lat: 37.7577,
        lng: -122.4376 
    }
    const zoom = 10

    return (
        <div id='locations' className="details-map">
            <h2>Where you'll be</h2>
            <div style={{ height: '400px', width: '100%' }}>
                <GoogleMapReact
                    bootstrapURLKeys={{ key: process.env.REACT_APP_MAPS_API_KEY }}
                    defaultCenter={center}
                    defaultZoom={zoom}
                >
                    {/* TO ADD markers, overlays, or other map components here */}
                </GoogleMapReact>
            </div>
        </div>
    )
}