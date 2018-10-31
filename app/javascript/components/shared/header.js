import React from 'react'
import styled, { ThemeProvider } from 'styled-components'
import { Query } from "react-apollo";
import gql from "graphql-tag";
import Logo from './logo'

const HeaderContainer = styled.header`
  background: ${props => props.theme.colors.background};
  color: ${props => props.theme.colors.text};
`

const invert = (theme) => {
  const { text, background, colors } = theme.colors
  return {
    ...theme,
    colors: {
      ...colors,
      text: background,
      background: text,
    },
  }
}

const currentFestival = gql`
  {
    festival {
      startDate
    }
  }
`

export default class Header extends React.Component {
  render() {
    return (
      <Query query={currentFestival}>
        {({ data: { festival } }) => (
          <ThemeProvider theme={invert}>
            <HeaderContainer>
              <Logo year={festival && festival.year} />
            </HeaderContainer>
          </ThemeProvider>
        )}
      </Query>
    )
  }
}
