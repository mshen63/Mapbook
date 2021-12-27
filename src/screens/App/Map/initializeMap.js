import { setRTLTextPlugin } from "mapbox-gl"
import { getMarker, createMarker } from "../../../actions/Marker"


export const initializeMap = async (mapboxgl, map, currUser, markers, setCurrMarker) => {
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
            var randomColor = "#" + (Math.floor(Math.random() * 16777215).toString(16));
            let mark = new mapboxgl.Marker({ color: randomColor })
                .setLngLat([marker.lng, marker.lat])
                .addTo(map)
            mark.getElement().addEventListener('click', async (e) => {
                setCurrMarker({ isNew: false, marker: marker })
                map.flyTo({center:[marker.lng, marker.lat], zoom: 8})
                e.stopPropagation();
            })
        })
    }
    map.on("click", async function (e) {
        var randomColor = "#" + (Math.floor(Math.random() * 16777215).toString(16));
        let marker = new mapboxgl.Marker({ color: randomColor }).setLngLat([e.lngLat.lng, e.lngLat.lat]).addTo(map)
        setCurrMarker({
            isNew: true,
            marker: marker
        })
    })


}

