/* global module */

import React, { useCallback, useState } from 'react'
import { storiesOf } from '@storybook/react'
import Duotone from 'effects/duotone'
import Breadcrumbs from 'molecules/breadcrumbs'
import TabBar from 'molecules/tab_bar'
import Tab from 'atoms/tab'
import Header from './'

const HeaderDemo = (props) => (
  <div>
    <Header {...props} />
    <div style={{ padding: '1rem' }}>
      <p>
        Will you take care of that? Uh, coast guard. Einstein, hey Einstein, where’s the Doc, boy,
        huh? Doc Hey Biff, check out this guy’s life preserver, dork thinks he’s gonna drown. No,
        get out of town, my mom thinks I’m going camping with the guys. Well, Jennifer, my mother
        would freak out if she knew I was going up there with you. And I get this standard lecture
        about how she never did that kind of stuff when she was a kid. Now look, I think she was
        born a nun.
      </p>

      <p>
        Flux capacitor. Whoa, wait a minute, Doc, are you telling me that my mother has got the
        hots for me? Yeah Mom, we know, you’ve told us this story a million times. You felt sorry
        for him so you decided to go with him to The Fish Under The Sea Dance. No no no no no,
        Marty, both you and Jennifer turn out fine. It’s your kids, Marty, something has got to be
        done about your kids. The hell you doing to my car?
      </p>

      <p>
        Yeah, it’s in the back. No no no no no, Marty, both you and Jennifer turn out fine. It’s
        your kids, Marty, something has got to be done about your kids. I’m writing this down,
        this is good stuff. That’s right, he’s gonna be mayor. Doc, I’m from the future. I came
        here in a time machine that you invented. Now, I need your help to get back to the year
        1985.
      </p>

      <p>
        I will. Yeah but George, Lorraine wants to go with you. Give her a break. Will you take
        care of that? Oh, if Paul calls me tell him I’m working at the boutique late tonight. I
        said the keys are in
        here.
      </p>

      <p>
        What’s the meaning of this. On the night I go back in time, you get- Doc. Well, Marty, I
        want to thank you for all your good advice, I’ll never forget it. Oh, great scott. You get
        the cable, I’ll throw the rope down to you. I don’t know, I can’t keep up with all of your
        boyfriends.
      </p>
    </div>
  </div>
)

const TabbedHeaderDemo = () => {
  const TABS = ['Tomato', 'Mandarin', 'Peach', 'Plum', 'Mint', 'Apple']

  const [current, setCurrent] = useState(TABS[0])

  const tabClicked = useCallback(e => {
    setCurrent(e.target.closest('.tab').dataset.tab)
  }, [setCurrent])

  return (
    <HeaderDemo>
      <Header.Title>Page title</Header.Title>
      <TabBar>
        {TABS.map(tab => (
          <Tab
            key={tab}
            text={tab}
            selected={tab === current}
            data-tab={tab}
            onClick={tabClicked}
          />
        ))}
      </TabBar>
    </HeaderDemo>
  )
}

const MONKEY = 'https://images.unsplash.com/photo-1540573133985-87b6da6d54a9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=755&q=80'

storiesOf('Organisms|Header', module)
  .add('Plain', () => (
    <HeaderDemo>
      <Breadcrumbs back="/">
        <Breadcrumbs.Link to="/">Home</Breadcrumbs.Link>
        <Breadcrumbs.Link to="/stuff">Stuff</Breadcrumbs.Link>
      </Breadcrumbs>
      <Header.Button icon="edit" />
      <Header.Button icon="close" />
      <Header.Title>Page title</Header.Title>
    </HeaderDemo>
  ))
  .add('Fancy', () => (
    <HeaderDemo>
      <Breadcrumbs back="/">
        <Breadcrumbs.Link to="/">Home</Breadcrumbs.Link>
        <Breadcrumbs.Link to="/stuff">Stuff</Breadcrumbs.Link>
      </Breadcrumbs>
      <Header.Button icon="edit" />
      <Header.Button icon="close" />
      <Header.Title>Page title</Header.Title>
      <Header.Background>
        <Duotone gradient="tomato">
          <img src={MONKEY} />
        </Duotone>
      </Header.Background>
    </HeaderDemo>
  ))
  .add('With tabs', () => <TabbedHeaderDemo />)
