import { createMarker } from "../../../actions/Marker";
import { addMarker } from "../../../actions/User";

export const addMapFunctions = async (mapboxgl, map, currUser, isMarker, setIsMarker) => {


    map.on("click", async function (e) {

        // console.log("HLELLEOEEO")
        console.log("map func top")
        if (!isMarker) {
            console.log("isn't marker")
            var randomColor = "#" + (Math.floor(Math.random() * 16777215).toString(16));
            let marker = new mapboxgl.Marker({ color: randomColor }).setLngLat([e.lngLat.lng, e.lngLat.lat]).addTo(map)
            marker = await createMarker(currUser, e.lngLat.lat, e.lngLat.lng, "Name here", "description here", true)

            // marker.getElement().addEventListener('click', async (e) => {
            //     console.log("Clicked! id here")
            //     console.log(marker._id)
            //     let getMark = await getMarker(currUser, marker._id)
            //     console.log(getMark)
            // })
        }
        console.log("map func bot")

        setIsMarker(false)

    })


}