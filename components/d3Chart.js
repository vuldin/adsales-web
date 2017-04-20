import d3 from 'd3'

let width = 600,
  height = 250,
  iconWidth = 100,
  iconHeight = iconWidth,
  radius = iconWidth / 2,
  gap = 100,
  drawtime = 2000

let data = [
  {
    id: 'blockchain',
    label: 'Blockchain',
    url: 'static/BlockchainServices.png',
    x: width / 2 - radius,
    y: height / 2 - radius,
    children: [
      {
        id: 'broadcaster-a',
        label: 'BroadcasterA',
        url: 'static/BroadcasterA.png',
        x: 0,
        y: 0,
      },
      {
        id: 'agency-a',
        label: 'AgencyA',
        url: 'static/AdAgencyA.png',
        x: 0,
        y: height - iconHeight,
      },
      {
        id: 'advertiser-a',
        label: 'AdvertiserA',
        url: 'static/AdvertiserA.png',
        x: width - iconWidth,
        y: 0,
      },
      {
        id: 'advertiser-c',
        label: 'AdvertiserC',
        url: 'static/AdvertiserC.png',
        x: width - iconWidth,
        y: height - iconHeight,
      },
    ],
  },
]

let nodes = []
let links = []
data.forEach( (d, i) => {
  d.x = d.x + radius
  d.y = d.y + radius
  nodes.push(d)
  d.children.forEach( (c, i) => {
    c.x = c.x + radius
    c.y = c.y + radius
    nodes.push(c)
    links.push({ source: d, target: c })
  })
})

let translateAlong = (path, isReverse) => {
  let l = path.getTotalLength()
  return (d, i, a) => {
    return t => {
      if(isReverse) t = 1 - t
      let p = path.getPointAtLength(t  * l)
      return `translate(${p.x},${p.y})`
    }
  }
}

let transition = (node, path, isReverse) => {
  node.transition()
      .duration(2000)
      .attrTween('transform', translateAlong(path.node(), isReverse) )
      .each('end', () => node.remove() )
}

export default function() {
  let d3Chart = {}
  d3Chart.check = (users, isOn) => {
    d3.selectAll('.check')
        .filter( d => {
          return users.indexOf(d.label) > -1
        })
        .style('opacity', isOn ? 1 : 0)
  }
  d3Chart.transmit = (el, userIndex, isReverse) => {
    let svg = d3.select(el).select('svg')
    let link = d3.select(el).selectAll('.link')
    let getCircle = () => {
      let loc = links[userIndex].target
      if(isReverse) loc = links[userIndex].source
      return svg.append('circle')
          .attr('r', 5)
          //.style('fill', '#ccc')
          .style('fill', '#ff9800')
          .attr('transform', `translate(${loc.x - 5 / 2}, ${loc.y - 5 / 2})` )
    }
    let si = setInterval(() => transition(getCircle(), d3.select(link[0][userIndex]), isReverse), 300 )
    setTimeout(() => clearInterval(si), drawtime)
  }
  d3Chart._drawSymbols = svg => {
    let diagonal = d3.svg.diagonal()
        .source( d => { return { x: d.source.y, y: d.source.x } } )
        .target( d => { return { x: d.target.y, y: d.target.x } } )
        .projection( d => [d.y, d.x] )

    let link = svg.selectAll('.link')
        .data(links).enter()
      .append('path')
        .attr('class', 'link')
        .style('fill', 'none')
        .style('stroke', '#ccc')
        .style('stroke-width', '1.5px')
        .attr('d', diagonal)


    let defs = svg.append('defs').selectAll('.def')
    defs.data(nodes).enter()
      .append('pattern')
        .attr('id', d => d.id)
        .attr('patternUnits', 'userSpaceOnUse')
        .attr('width', iconWidth)
        .attr('height', iconHeight)
      .append('svg:image')
        .attr('xlink:href', d => d.url)
        .attr('width', iconWidth)
        .attr('height', iconHeight)
        .attr('x', 0)
        .attr('y', 0)

    svg.select('defs').append('pattern')
        .attr('id', 'ledger')
        .attr('patternUnits', 'userSpaceOnUse')
        .attr('width', iconWidth / 2)
        .attr('height', iconHeight / 2)
      .append('svg:image')
        .attr('xlink:href', 'static/Ledger.png')
        .attr('width', iconWidth / 2)
        .attr('height', iconHeight / 2)
        .attr('x', 0)
        .attr('y', 0)

    svg.select('defs').append('pattern')
        .attr('id', 'db')
        .attr('patternUnits', 'userSpaceOnUse')
        .attr('width', iconWidth / 2)
        .attr('height', iconHeight / 2)
      .append('svg:image')
        .attr('xlink:href', 'static/Database.png')
        .attr('width', iconWidth / 2)
        .attr('height', iconHeight / 2)
        .attr('x', 0)
        .attr('y', 0)

    let circle = svg.selectAll('.circle')
        .data(nodes).enter()
      .append('g')
        .attr('class', 'circle')

    circle.append('circle')
        .attr('cx', radius)
        .attr('cy', radius)
        .attr('r', radius)
        .attr('transform', d => `translate(${d.x - radius}, ${d.y - radius})` )
        .style('fill', d => `url(#${d.id})` )

    let xOffset = 12
    let yOffset = 8
    circle.append('rect')
        .attr('class', 'ledger')
        .attr('x', radius)
        .attr('y', radius)
        .attr('width', iconWidth / 2)
        .attr('height', iconHeight / 2)
        .attr('transform', d => `translate(${d.x - radius + xOffset}, ${d.y - radius + yOffset})` )
        .style('fill', d => `url(#ledger)` )

      let size = 15,
        x = 0,
        y = 0,
        xLedgerOffset = 28,
        yLedgerOffset = 26
      let coordinates = [
        {x: x + (size / 4), y: y + (size / 3)},
        {x: x + (size / 2.2), y: (y + size) - (size / 4)},
        {x: (x + size) - (size / 8), y: (y + (size / 10))},
      ]
      let line = d3.svg.line()
          .x( d => d.x )
          .y( d => d.y )
          .interpolate('basic')
      let mark = circle.append('path')
          .attr('class', 'check')
          .attr('d', line(coordinates))
          .style({
            'stroke-width' : 3,
            'stroke' : '#1b5e20',
            'fill' : 'none',
            'opacity': 1,
          })
        .attr('transform', d => {
          return `translate(${d.x + xLedgerOffset}, ${d.y + yLedgerOffset})`
        })

    let xOffsetdb = 55
    let yOffsetdb = 12
    circle.append('rect')
        .attr('x', radius)
        .attr('y', radius)
        .attr('width', iconWidth / 2)
        .attr('height', iconHeight / 2)
        .attr('transform', d => `translate(${d.x - radius - xOffsetdb}, ${d.y - radius + yOffsetdb})` )
        .style('fill', d => `url(#db)` )
  }

  d3Chart.create = function(el, props, state) {
    let svg = d3.select(el).append('svg')
        .attr('width', props.width)
        .attr('height', props.height)
      .append('g')

    this._drawSymbols(svg)
  };

  d3Chart.update = async function(el, state) {
    let userMap = {
      BroadcasterA: 0,
      AgencyA: 1,
      AdvertiserA: 2,
      AdvertiserC: 3,
    }

    d3Chart.check(state.to, false)
    let doTransmit = () => {
      return new Promise( (resolve, reject) => {
        state.from.forEach( name => {
          d3Chart.transmit(el, userMap[name], true)
        })
        setTimeout( () => {
          state.to.forEach( name => {
            d3Chart.transmit(el, userMap[name], false)
          })
          setTimeout( () => { resolve() }, drawtime * 2)
        }, drawtime * 2)
      })

    }
    await doTransmit()
    d3Chart.check(state.to, true)
  }

  d3Chart.destroy = function(el) {
    // Any clean-up would go here
    // in this example there is nothing to do
    d3.select(el).select('svg').remove()
  };

  d3Chart._scales = function(el, domain) {
    if (!domain) {
      return null;
    }

    var width = el.offsetWidth;
    var height = el.offsetHeight;

    var x = d3.scale.linear()
      .range([0, width])
      .domain(domain.x);

    var y = d3.scale.linear()
      .range([height, 0])
      .domain(domain.y);

    var z = d3.scale.linear()
      .range([5, 20])
      .domain([1, 10]);

    return {x: x, y: y, z: z};
  };
  d3Chart._drawPoints = function(el, scales, data) {
    var g = d3.select(el).selectAll('.d3-points');

    var point = g.selectAll('.d3-point')
      .data(data, function(d) { return d.id; });

    point.enter().append('circle')
        .attr('class', 'd3-point');

    point.attr('cx', function(d) { return scales.x(d.x); })
        .attr('cy', function(d) { return scales.y(d.y); })
        .attr('r', function(d) { return scales.z(d.z); });

    point.exit()
        .remove();
  };
  return d3Chart
}
