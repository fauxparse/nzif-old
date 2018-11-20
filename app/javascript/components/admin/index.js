import React from 'react'
import styled from 'styled-components'
import Theme from './theme'

const AdminLayout = styled.div`
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
`

const Admin = () => (
  <Theme>
    <AdminLayout>
      <div>
        You think darkness is your ally? You merely adopted the dark, I was born in it.
        Moulded by it. I didn’t see the light until I was already a man.
        By then there was nothing to be but blinded.
      </div>
    </AdminLayout>
  </Theme>
)

export default Admin
