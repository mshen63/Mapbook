import { createMarker } from "../../../actions/Marker";
import { addMarker } from "../../../actions/User";

export const addMapFunctions = async(mapboxgl, map, currUser) => {
    map.on("click", async function (e) {
        var randomColor = "#" + (Math.floor(Math.random() * 16777215).toString(16));
        let marker = new mapboxgl.Marker({ color: randomColor }).setLngLat([e.lngLat.lng, e.lngLat.lat]).addTo(map)

        
        await createMarker(currUser, e.lngLat.lat, e.lngLat.lng, "Name here", "description here", true)

    })
}

