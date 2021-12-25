import { setRTLTextPlugin } from "mapbox-gl"
import { getMarker, createMarker } from "../../../actions/Marker"


export const initializeMap = async (mapboxgl, map, currUser, markers, setMarkers, setText) => {
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
                .addTo(map)

            mark.getElement().addEventListener('click', async (e) => {
                setText(marker._id)

                e.stopPropagation();
                
            })
        })
    }
    map.on("click", async function (e) {

        var randomColor = "#" + (Math.floor(Math.random() * 16777215).toString(16));
        let marker = new mapboxgl.Marker({ color: randomColor }).setLngLat([e.lngLat.lng, e.lngLat.lat]).addTo(map)
        marker.getElement().addEventListener('click', async (e) => {
            setText(marker._id)
            e.stopPropagation();
            
        })
        marker = await createMarker(currUser, e.lngLat.lat, e.lngLat.lng, "Name here", "description here", true)
        

    })


}

