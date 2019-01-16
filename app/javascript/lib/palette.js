export class Color {
  constructor(palette, name, shade = 500, alpha = 1.0) {
    this.palette = palette
    this.name = name
    this._shade = shade
    this._alpha = alpha
  }

  get hue() {
    return this.values.hue
  }

  get saturation() {
    return this.values.saturation
  }

  get luminance() {
    return this.values.luminance
  }

  get values() {
    if (!this._values) {
      this._values = this.palette.fetch(this.name, this._shade)
    }
    return this._values
  }

  alpha(alpha) {
    const { palette, name, _shade: shade } = this
    return new Color(palette, name, shade, alpha)
  }

  shade(shade) {
    return this.palette.color(this.name, shade, this._alpha)
  }

  invert() {
    return this.shade(1000 - this._shade);
  }

  toString() {
    const { hue: h, saturation: s, luminance: l } = this
    const { _alpha: a } = this

    if (a < 1.0) {
      return `hsla(${h}, ${s}%, ${l}%, ${a})`
    } else {
      return `hsl(${h}, ${s}%, ${l}%)`
    }
  }
}

class Black extends Color {
  constructor(palette, alpha = 1.0) {
    super(palette, 'black', 500, alpha)
  }

  alpha(alpha) {
    return new Black(this.palette, alpha)
  }

  get values() {
    return { hue: 0, saturation: 100, luminance: 0 }
  }
}

class White extends Color {
  constructor(palette, alpha = 1.0) {
    super(palette, 'white', 500, alpha)
  }

  alpha(alpha) {
    return new White(this.palette, alpha)
  }

  get values() {
    return { hue: 0, saturation: 100, luminance: 100 }
  }
}

class Palette {
  constructor(colors = {}) {
    this._values = {}
    this._names = []
    Object.keys(colors).forEach(name => this.add(name, colors[name]))
  }

  add(name, values) {
    this._values[name] = values
    this._names.push(name)
    this[name] = (shade = 500, alpha = 1.0) => this.color(name, shade, alpha)
  }

  names() {
    return this._names.slice(0)
  }

  shades() {
    return Object.keys(this._values[this.names()[0]]).sort()
  }

  color(name, shade = 500, alpha = 1.0) {
    return new Color(this, name, shade, alpha)
  }

  black = (alpha = 1.0) => new Black(this, alpha)

  white = (alpha = 1.0) => new White(this, alpha)

  fetch(color, shade = 500) {
    const [hue, saturation, luminance] = this._values[color][shade]
    return { hue, saturation, luminance }
  }

  functions() {
    return {
      ...this.names().reduce((h, name) => ({ ...h, [name]: this[name] }), {}),
      black: this.black,
      white: this.white,
    }
  }
}

export default Palette
