import React, { useContext, useState } from 'react'
import classNames from 'classnames'
import { useQuery, useMutation } from 'react-apollo-hooks'
import gql from 'graphql-tag'
import { Link } from 'react-router-dom'
import { PITCHES_QUERY } from '../../queries'
import Breadcrumbs from '../shared/breadcrumbs'
import Loader from 'atoms/loader'
import CurrentUserContext from 'contexts/current_user'
import Button from '../../atoms/button'
import Modal from '../modals'
import Pitch from './pitch'

const DELETE_PITCH_MUTATION = gql`
  mutation DeletePitch($id: ID!) {
    deletePitch(id: $id)
  }
`

const PitchList = ({ match, className }) => {
  const { year } = match.params
  const currentUser = useContext(CurrentUserContext)
  const variables = { year, userId: currentUser && currentUser.id }
  const {
    loading,
    data: { pitches }
  } = useQuery(PITCHES_QUERY, { variables })
  const [deleting, setDeleting] = useState(false)

  const deletePitch = useMutation(DELETE_PITCH_MUTATION, {
    update: (proxy) => {
      const { pitches } = proxy.readQuery({ query: PITCHES_QUERY, variables })
      proxy.writeQuery({
        query: PITCHES_QUERY,
        variables,
        data: {
          pitches: pitches.filter(({ id }) => deleting !== id)
        }
      })
    },
    optimisticResponse: { deletePitch: true },
  })

  const confirmDelete = (id) => {
    deletePitch({ variables: { id } }).then(() => setDeleting(false))
  }

  const cancelDeletion = () => setDeleting(false)

  return (
    <section className={classNames('public-page', 'pitches', className)}>
      <header className="pitches__header">
        <Breadcrumbs className="new-pitch__breadcrumbs" back={`/${year}`}>
          <Breadcrumbs.Link to={`/${year}`}>NZIF {year}</Breadcrumbs.Link>
        </Breadcrumbs>
        <h1 className="page-title">Pitches for NZIF {year}</h1>
        <Button
          as={Link}
          to={`${match.url}/new`}
          className="button button--primary pitches__add"
          icon="add"
          text="New pitch"
        />
      </header>
      <div className="pitches__list">
        {loading ? (
          <Loader />
        ) : (
          pitches.map(pitch => (
            <Pitch
              key={pitch.id}
              className="pitches__row"
              pitch={pitch}
              url={`${match.url}/${pitch.id}`}
              onDelete={setDeleting}
            />
          ))
        )}
      </div>
      <Modal isOpen={!!deleting} onRequestClose={cancelDeletion}>
        <header className="modal__header">
          <h2 className="modal__title">Delete pitch?</h2>
          <Button className="modal__close" icon="close" onClick={cancelDeletion} />
        </header>
        <div className="modal__body">
          <p>Are you sure you want to delete this pitch? There is no undo.</p>
        </div>
        <footer className="modal__footer">
          <Button primary text="Yes, I’m sure" onClick={() => confirmDelete(deleting)} />
          <Button text="Cancel" onClick={cancelDeletion} />
        </footer>
      </Modal>
    </section>
  )
}

export default PitchList
