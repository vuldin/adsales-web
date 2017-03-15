export default function(map) {
  // animated circle
  var radius = 20
  let pointOnCircle = angle => {
    let center = map.getCenter()
    let lat = Math.cos(angle) * radius
    let lng = Math.sin(angle) * radius
    /*
    let center = map.getCenter()
    lat += center.lat
    lng += center.lng
    */
    return {
      type: 'Point',
      coordinates: [
        lat,
        lng
      ]
    }
  }
  map.on('load', () => {
    // Add a source and layer displaying a point which will be animated in a circle.
    map.addSource('point', {
      type: 'geojson',
      data: pointOnCircle(0)
    })

    map.addLayer({
      id: 'point',
      source: 'point',
      type: 'circle',
      paint: {
        'circle-radius': 5,
        'circle-color': '#007cbf'
      }
    })

    let animateMarker = timestamp => {
      // Update the data to a new position based on the animation timestamp. The
      // divisor in the expression `timestamp / 1000` controls the animation speed.
      //map.getSource('point').setData(pointOnCircle(timestamp / 1000))
      map.getSource('point').setData(pointOnCircle(timestamp / 2500))
      // Request the next frame of the animation.
      requestAnimationFrame(animateMarker)
    }

    // Start the animation.
    animateMarker(0)
  })
}
