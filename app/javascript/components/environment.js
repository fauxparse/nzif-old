import React, { useMemo } from 'react'
import Icon from '../atoms/icon'

const Environment = () => {
  const environment = useMemo(() => {
    if (window.location.host.match(/^staging/)) {
      return 'staging'
    }

    const environmentTag = document.querySelector('meta[name="environment"]')
    return environmentTag && environmentTag.getAttribute('content')
  }, [])

  if (environment !== 'production') {
    return (
      <div className="environment-marker" data-environment={environment}>
        <Icon name={environment} />
      </div>
    )
  }

  return null
}

export default Environment
