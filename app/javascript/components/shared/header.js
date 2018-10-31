import React from 'react'
import styled from 'styled-components'
import { Query } from "react-apollo";
import gql from "graphql-tag";
import Logo from './logo'

const HeaderContainer = styled.header`
  background: black;
  color: white;
`

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
        {({ data }) => (
          <HeaderContainer>
            <Logo year={data.festival && parseInt(data.festival.startDate)} />
          </HeaderContainer>
        )}
      </Query>
    )
  }
}
