import { setRTLTextPlugin } from "mapbox-gl"
import { getMarker, createMarker } from "../../../actions/Marker"


export const initializeMap = async (currUser, mapboxgl, map, markers, setCurrMarker, mapMarkers, setMapMarkers, canMakeEdits) => {
    map.addControl(
        new MapboxGeocoder({
            accessToken: mapboxgl.accessToken,
            mapboxgl: mapboxgl,
            marker: false,
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
        let mapmarks = mapMarkers
        markers.forEach(marker => {
            let mark = new mapboxgl.Marker({color: "#68D391"})
                .setLngLat([marker.lng, marker.lat])
                .addTo(map)
            mapmarks[marker._id] = mark
           
            mark.getElement().addEventListener('click', async (e) => {
                e.stopPropagation();
                let updatedMarker = await getMarker(currUser, marker._id)
                setCurrMarker({ isNew: false, marker: updatedMarker })
                // setCurrMarker({ isNew: false, marker: marker })
                map.flyTo({ center: [marker.lng, marker.lat], zoom: 8 })
                
            })
        })
        setMapMarkers(mapmarks)
    }
    if (canMakeEdits) {
        map.on("click", async function (e) {
            let marker = new mapboxgl.Marker({color: "#68D391"}).setLngLat([e.lngLat.lng, e.lngLat.lat]).addTo(map)
            setCurrMarker({
                isNew: true,
                marker: marker
            })
        })
    }



}

