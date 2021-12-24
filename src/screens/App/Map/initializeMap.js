

export const initializeMap = (mapboxgl, map, markers) => {
    Array.prototype.slice.call(map.getContainer().getElementsByClassName('mapboxgl-ctrl-geolocate')).forEach((button) => button.click())
    // console.log("in initialize map")
    // console.log(markers)
    if (markers) {
        markers.forEach(marker => {
            var randomColor = "#" + (Math.floor(Math.random() * 16777215).toString(16));
            let mark = new mapboxgl.Marker({ color: randomColor }).setLngLat([marker.lng, marker.lat]).addTo(map)
            // mark.getElement().addEventListener('click', (e) => {
            //     console.log("Clicked!")
            //     console.log(marker.lng+" "+marker.lat)
            // })
        })
    }

    // map.on("click", function (e) {
    //     var randomColor = "#" + (Math.floor(Math.random() * 16777215).toString(16));
    //     const marker = new mapboxgl.Marker({ color: randomColor }).setLngLat([e.lngLat.lng, e.lngLat.lat]).addTo(map)

    // })
}

