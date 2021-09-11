import React from 'react'
import PropTypes from 'lib/proptypes'
import { withRouter } from 'react-router-dom'
import humanize from 'lib/humanize'
import Button from 'atoms/button'
import List from 'molecules/list'
import Panel from '../panel'

const REPORTS = [
  'money_owed',
  'workshop_preferences',
]

const FORMATS = {
  csv: 'CSV',
  xlsx: 'Excel',
}

const DownloadButton = ({ year, report, format }) => (
  <Button
    as="a"
    href={`/${year}/reports/${report}.${format}`}
    icon={format}
    aria-label={`Download as ${FORMATS[format]}`}
  />
)

DownloadButton.propTypes = {
  year: PropTypes.id.isRequired,
  report: PropTypes.oneOf(REPORTS).isRequired,
  format: PropTypes.string.isRequired,
}

const Reports = ({ match }) => {
  const { year } = match.params

  return (
    <Panel className="dashboard__reports" title="Reports">
      <List compact>
        {REPORTS.map(report => (
          <List.Item
            key={report}
            primary={humanize(report)}
          >
            {Object.keys(FORMATS).map(format => (
              <DownloadButton key={format} year={year} report={report} format={format} />
            ))}
          </List.Item>
        ))}
      </List>
    </Panel>
  )
}

export default withRouter(Reports)
