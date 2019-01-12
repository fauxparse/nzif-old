import PropTypes from 'prop-types'
import styled, { css, keyframes } from 'styled-components'

const ifLoading = (value, defaultValue = 'inherit') =>
  (props => props.loading ? value : defaultValue)

const loadingGradient = (props) => {
  const { loading, theme } = props

  if (loading) {
    const color = theme.colors.text
    return `${color.alpha(0.15)} linear-gradient(to right, ` +
      `${color.alpha(0)} 25%, ` +
      `${color.alpha(0.1)} 50%, ` +
      `${color.alpha(0)} 75%)`
  } else {
    return 'none'
  }
}

const skeletonTextShimmer = keyframes`
  0%{
    background-position: 100% 0
  }
  100%{
    background-position: 0% 0
  }
`

const SkeletonText = styled.span`
  display: inline-block;
  font-family: ${ifLoading('Blokk')};
  letter-spacing: ${ifLoading('-0.1em')};
  background: ${loadingGradient};
  -webkit-background-clip: ${ifLoading('text', 'initial')};
  -webkit-text-fill-color: ${ifLoading('transparent', 'initial')};
  animation: ${ifLoading(css`${skeletonTextShimmer} 3s linear infinite forwards`, 'none')};
  background-size: 400% 100vh;
  background-repeat: no-repeat;
`

SkeletonText.propTypes = {
  loading: PropTypes.bool.isRequired,
}

SkeletonText.defaultProps = {
  loading: false,
}

export default SkeletonText
