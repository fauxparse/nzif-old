import React from 'react'
import Icon from '../atoms/icon'

const Environment = () => {
  const environmentTag = document.querySelector('meta[name="environment"]')
  const environment = environmentTag && environmentTag.getAttribute('content')

  if (environment === 'development') {
    return (
      <div className="environment-marker">
        <Icon name="development" />
      </div>
    )
  }

  return null
}

export default Environment
