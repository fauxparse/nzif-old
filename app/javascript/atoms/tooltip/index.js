import React from 'react'
import { Tooltip } from 'react-tippy'

import './index.scss'

const StyledTooltip = (props) =>
  <Tooltip animateFill={false} arrow style={{ display: 'block' }} {...props} />

export default StyledTooltip
