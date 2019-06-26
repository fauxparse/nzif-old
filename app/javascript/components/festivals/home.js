import React, { useContext } from 'react'
import PageContent from '../page_content'
import Loader from '../shared/loader'
import Logo from '../shared/logo'
import Countdown from '../shared/countdown'
import { Link } from '../shared/ripple'
import Button from '../../atoms/button'
import Context from './context'

const Home = () => {
  const festival = useContext(Context)

  return (
    <PageContent className="homepage page-content--no-padding">
      {festival ? (
        <>
          <Logo />
          {festival.pitchesCloseAt && (
            <section className="homepage__pitches">
              <h2 className="section-title">What’s up, pitches?</h2>
              <p>Pitches for NZIF {festival.year} close in</p>
              <Countdown to={festival.pitchesCloseAt} />
              <p>
                <Link
                  to={`${festival.year}/pitches/new`}
                  className="button"
                >
                  <Button.Text>Pitch us your idea!</Button.Text>
                </Link>
              </p>
            </section>
          )}
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
      ) : (
        <Loader />
      )}
    </PageContent>
  )
}

export default Home
