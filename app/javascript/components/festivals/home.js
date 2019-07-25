import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import PageContent from '../page_content'
import Button from 'atoms/button'
import Loader from 'atoms/loader'
import Masthead from 'atoms/masthead'
import Context from 'contexts/festival'
import Countdown from './countdown'

const Home = () => {
  const festival = useContext(Context)

  return (
    <PageContent className="homepage page-content--no-padding">
      {festival ? (
        <>
          <Masthead festival={festival} />
          {festival.pitchesCloseAt && (
            <section className="homepage__pitches">
              <h2 className="section-title">What’s up, pitches?</h2>
              <p>Pitches for NZIF {festival.year} close in</p>
              <Countdown to={festival.pitchesCloseAt} />
              <p>
                <Button
                  as={Link}
                  to={`${festival.year}/pitches/new`}
                  text="Pitch us your idea!"
                  primary
                />
              </p>
            </section>
          )}
          <p className="homepage__purpose">
            <b>Please note: </b>
            This is the website for Festival participants and practitioners. For public ticket
            sales, general information, and media enquiries, please visit{' '}
            <a
              className="text-link"
              href="http://improvfest.nz/"
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
