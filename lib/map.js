//import animatedCircle from '../lib/animatedCircle'

export default function(node) {
  mapboxgl.accessToken = 'pk.eyJ1Ijoiam9zaHVhcHVyY2VsbCIsImEiOiJjaWdyZDQ0dnQwMjAzdThtMTM3MDd0bDQ0In0.5N1zODR0er7xZmGh0wM7gw'
  var map = new mapboxgl.Map({
    container: node,
    style: 'mapbox://styles/mapbox/streets-v9',
    center: {
      lat: 39.23385221042852,
      lng: -96.1544081835798
    },
    zoom: 3,
  })

  //animatedCircle(map)

  map.on('click', e => map.flyTo({center: e.lngLat}) )
}
