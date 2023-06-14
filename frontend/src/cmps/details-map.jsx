import GoogleMapReact from 'google-map-react';

export function DetailsMap({ loc }) {
    const center = {
        lat: loc.lat,
        lng: loc.lan
    }

    const zoom = 10;

    const Marker = ({ lat, lng, marker }) => (
        <div lat={lat} lng={lng}>
            {marker}
        </div>
    )

    const mapStyles = [
        {
            featureType: 'all',
            elementType: 'geometry.fill',
            stylers: [
                {
                    color: '#f0f2f4'
                }
            ]
        },
        {
            featureType: 'landscape.man_made',
            elementType: 'geometry.fill',
            stylers: [
                {
                    color: '#f0f2f4'
                }
            ]
        },
        {
            featureType: 'road',
            elementType: 'geometry.fill',
            stylers: [
                {
                    color: '#f0f2f4'
                }
            ]
        },
    ]

    return (
        <div id='locations' className="details-map">
            {/* <img src="https://res.cloudinary.com/dpbcaizq9/image/upload/v1686751739/home-marker_ovo9yb.svg" alt="home" /> */}

            <h2>Where you'll be</h2>
            <div style={{ height: '480px', width: '100%' }}>
                <GoogleMapReact
                    bootstrapURLKeys={{ key: process.env.REACT_APP_MAPS_API_KEY, language: 'en' }}
                    defaultCenter={center}
                    defaultZoom={zoom}
                    options={{
                        styles: mapStyles
                    }}
                >
                    <Marker
                        lat={center.lat}
                        lng={center.lng}
                        marker={<img src="https://res.cloudinary.com/dpbcaizq9/image/upload/v1686751739/home-marker_ovo9yb.svg" alt="marker" style={{
                            width: '4em', position: 'absolute', transform: 'translate(-50%, -120%)'
                        }} />}
                    />
                </GoogleMapReact>
            </div>
            <h3>{`${loc.city}, ${loc.country}`}</h3>
        </div>
    );
}
