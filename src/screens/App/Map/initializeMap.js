import { setRTLTextPlugin } from "mapbox-gl"
import { getMarker } from "../../../actions/Marker"

export const initializeMap = async (mapboxgl, map, currUser, markers, setMarkers, setText, setIsMarker) => {
    map.addControl(
        new MapboxGeocoder({
            accessToken: mapboxgl.accessToken,
            mapboxgl: mapboxgl
        })
    )
    map.addControl(
        new mapboxgl.GeolocateControl({
            positionOptions: {
                enableHighAccuracy: true,
            },
            trackUserLocation: true
        })
    )
    Array.prototype.slice.call(map.getContainer().getElementsByClassName('mapboxgl-ctrl-geolocate')).forEach((button) => button.click())

    if (markers) {
        markers.forEach(marker => {
            console.log(marker)
            var randomColor = "#" + (Math.floor(Math.random() * 16777215).toString(16));
            let mark = new mapboxgl.Marker({ color: randomColor })
                .setLngLat([marker.lng, marker.lat])
                .setPopup(new mapboxgl.Popup({ offset: 25 })
                    .setText(marker))
                .addTo(map)

            mark.getElement().addEventListener('click', async (e) => {
                console.log("is marker")
                setText(marker._id)
                setIsMarker(true)
                // console.log("event listener")
                


            })
        })
    }


}

