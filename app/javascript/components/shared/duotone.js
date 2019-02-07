import React, { Children, cloneElement } from 'react'
import { v4 as uuid } from 'uuid'

const Duotone = ({ children }) => {
  const id = `duotone-${uuid()}`

  return <>
    <svg xmlns="http://www.w3.org/2000/svg">
      <filter id={id}>
        <feColorMatrix
          type="matrix"
          result="grayscale"
          values="1 0 0 0 0
                  1 0 0 0 0
                  1 0 0 0 0
                  0 0 0 1 0"
        />
        <feComponentTransfer colorInterpolationFilters="sRGB" result="duotone">
          <feFuncR type="table" tableValues="0.936 0.930" />
          <feFuncG type="table" tableValues="0.253 0.566" />
          <feFuncB type="table" tableValues="0.204 0.047" />
          <feFuncA type="table" tableValues="0 1" />
        </feComponentTransfer>
      </filter>
    </svg>
    {Children.map(children, child => cloneElement(child, { style: { filter: `url(#${id})` } }))}
  </>
}

export default Duotone
