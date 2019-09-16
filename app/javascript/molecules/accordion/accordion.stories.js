import React, { useState } from 'react'
import { storiesOf } from '@storybook/react'
import faker from 'faker'
import Markdown from 'molecules/markdown'
import Accordion from './'

const text = faker.lorem.paragraphs(2);

const AccordionDemo = (props) => {
  const [page, setPage] = useState()

  return (
    <Accordion selected={page} onChange={setPage} {...props}>
      <Accordion.Section name="workshops" label="Workshops" icon="workshop">
        <Markdown text={text} />
      </Accordion.Section>
      <Accordion.Section name="shows" label="Shows" icon="show">
        <Markdown text={text} />
      </Accordion.Section>
      <Accordion.Section name="social-events" label="Social Events" icon="social-event">
        <Markdown text={text} />
      </Accordion.Section>
      <Accordion.Section name="forums" label="Forums" icon="forum">
        <Markdown text={text} />
      </Accordion.Section>
    </Accordion>
  )
}

storiesOf('Molecules|Accordion', module)
  .add('Exclusive', () => <AccordionDemo exclusive />)