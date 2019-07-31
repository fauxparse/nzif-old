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
          {festival.pitchesOpen && festival.pitchesCloseAt && (
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
          {!festival.pitchesOpen && !festival.programmeLaunched && (
            <section className="homepage__pitches homepage__pitches--closed">
              <h2 className="section-title">Pitches are now closed</h2>
              <p>
                We are reviewing applications,
                and will announce the full programme in due course.
              </p>
              <p>
                In the meantime, join the NZIF Green Room group on Facebook
                to keep up with all the latest Festival news.
              </p>
              <p>
                <Button
                  as={Link}
                  to="https://www.facebook.com/groups/NZIFGreenRoom/"
                  icon="facebook"
                  text="NZIF Green Room"
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
