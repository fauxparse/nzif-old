const invert = (theme) => {
  const { text, background, ...colors } = theme.colors
  return {
    ...theme,
    colors: {
      ...colors,
      text: background,
      background: text,
    },
  }
}

export default invert
