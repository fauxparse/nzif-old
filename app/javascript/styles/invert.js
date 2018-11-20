import chroma from 'chroma-js'

const invert = (theme) => {
  const { foreground, background, ...colors } = theme.colors
  const text = chroma(background)

  return {
    ...theme,
    colors: {
      ...colors,
      foreground: background,
      background: foreground,
      text: text.alpha(colors.alpha.primary),
      secondary: text.alpha(colors.alpha.secondary),
      disabled: text.alpha(colors.alpha.disabled),
    },
  }
}

export default invert
