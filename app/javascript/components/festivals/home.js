import React, { useContext } from 'react'
import PageContent from '../../components/page_content'
import Loader from '../../components/shared/loader'
import Logo from '../../components/shared/logo'
import Context from './context'

const Home = () => {
  const festival = useContext(Context)

  return (
    <PageContent className="homepage page-content--no-padding">
      {!festival ? (
        <Loader />
      ) : (
        <>
          <Logo />
          <p className="homepage__purpose">
            <b>Please note: </b>
            This is the website for Festival participants and practitioners. For public ticket
            sales, general information, and media enquiries, please visit{' '}
            <a
              className="text-link"
              href="http://nzimprovfestival.co.nz/"
              target="_blank"
              rel="noopener noreferrer"
            >
              our public site
            </a>
            .
          </p>
        </>
      )}
    </PageContent>
  )
}

export default Home
