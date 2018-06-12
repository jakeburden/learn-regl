var regl = require('regl')()

var drawTriangle = regl({
  vert: `
    precision mediump float;
    uniform vec2 translate, scale;
    attribute vec2 position;
    attribute vec3 color;
    varying vec3 fcolor;
    void main () {
      fcolor = color;
      gl_Position = vec4(scale * position + translate, 0, 1);
    }
  `,

  frag: `
    precision mediump float;
    varying vec3 fcolor;
    void main () {
      gl_FragColor = vec4(sqrt(fcolor), 1);
    }
  `,

  attributes: {
    position: [
      [1, 0],
      [0, 1],
      [-1, -1]
    ],

    color: [
      [1, 0, 0],
      [0, 1, 0],
      [0, 0, 1]
    ]
  },

  uniforms: {
    translate: function (context) {
      return [
        Math.cos(0.01 * context.tick),
        Math.sin(0.03 * context.tick)
      ]
    },

    scale: function (context, props) {
      return [
        0.3 * Math.cos(0.08 * context.tick) + props.scale,
        props.scale
      ]
    }
  },

  count: 3
})

regl.frame(() => {
  regl.clear({
    color: [0, 0, 0, 1],
    depth: 1
  })

  drawTriangle({
    scale: 0.5
  })
})
