import React from 'react'
import styled from 'styled-components'
import Theme from './theme'
import Header from './header'

const AdminLayout = styled.div`
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
`

const Admin = () => (
  <Theme>
    <AdminLayout>
      <Header />
    </AdminLayout>
  </Theme>
)

export default Admin
