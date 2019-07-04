import React from 'react'
import classNames from 'classnames'
import moment from 'lib/moment'
import PropTypes from 'lib/proptypes'
import './index.scss'

const Masthead = ({ className, festival, ...props }) => (
  <svg className={classNames('masthead', className)} viewBox="0 0 1024 212" {...props}>
    <path className="masthead__nz" d="M38.93 49.5L13.75 25.33l-3-2.61V48.8H1.13V2.19h.38l25.12 24.16L29.56 29V2.89h9.69V49.5zM51.75 48.8V2.89h29.51v8.23h-19.7v10.45h16.71v7.91H61.56v11.09h20.66v8.23zM97.71 2.89L104 18.51c1.53 3.83 2.87 7.46 3.82 10.39.71-1.65 2.11-5.22 3.32-8l2.55-5.8 5.29-11.86h.38c3.89 8.74 8.74 19.19 11.1 25.69 1.65-4.08 7.46-19 10.13-26h11L130.93 49.5h-.45l-9-20.53c-.83-1.79-1.66-3.7-2.36-5.49-.7 1.79-1.53 3.7-2.29 5.49l-9.05 20.53h-.44L86.81 2.89zM191.62 11.12h-20.21V2.89h35.13l-22.19 37.68h21.49v8.23h-36.41zM215.78 48.8V2.89h29.52v8.23h-19.7v10.45h16.7v7.91h-16.7v11.09h20.66v8.23zM272.78 2.19h.38l22.32 46.61h-10.27l-3.7-8.1h-17.15l-3.57 8.1h-10.26zm5.8 31.62c-2.1-4.78-4.14-9.62-5.55-13.64-1.34 3.19-3.76 9.31-5.67 13.64zM301.4 48.8V2.89h9.82v37.68h17.66v8.23zM354.51 2.19h.38l22.32 46.61h-10.27l-3.7-8.1H346.1l-3.57 8.1h-10.27zm5.8 31.62c-2.1-4.78-4.14-9.62-5.54-13.64-1.34 3.19-3.77 9.31-5.68 13.64zM422.22 49.5L397 25.33l-3-2.61V48.8h-9.63V2.19h.38l25.12 24.16 2.98 2.65V2.89h9.69V49.5zM435 48.8V2.89h14.66c15.62 0 25.51 9.5 25.51 23s-9.82 23-25.38 23zm9.82-37.68v29.45h4.84c9.82 0 15.62-6.37 15.62-14.73s-5.8-14.72-15.74-14.72z"/>
    {festival && (
      <text className="masthead__dates" textAnchor="end" x={1024} y={48}>
        {`${moment(festival.startDate).format('D')}`}
        –
        {`${moment(festival.endDate).format('D MMM YYYY')}`}
      </text>
    )}
    <path className="masthead__subtitle" d="M377 171.86h.31l18.29 38.2h-8.4l-3-6.64h-14.09l-2.93 6.64h-8.41zm4.75 25.92c-1.72-3.92-3.39-7.89-4.54-11.19-1.1 2.62-3.09 7.63-4.65 11.19zM420.9 179.17v9h12.55v6.64H420.9v15.26h-8v-37.64h22.9v6.74zM443.37 210.06v-37.63h24.2v6.74h-16.15v8.57h13.69v6.48h-13.69v9.1h16.93v6.74zM474.47 208.65v-7.74a24.62 24.62 0 0 0 9.46 2.72 13.72 13.72 0 0 0 3.34-.21c2.87-.42 4.55-1.51 4.55-3.34 0-2.51-2.25-3.82-7.42-5.7-6.59-2.4-10.46-5.17-10.46-11.71s5.54-11 13.64-11a26 26 0 0 1 9.83 1.88V181a19.36 19.36 0 0 0-9.2-2.3c-3.87 0-6.37 1.52-6.37 3.92 0 2.2 2 3.71 7.15 5.65 6.59 2.56 10.67 5.33 10.67 11.65 0 6.79-5.13 10.87-14 10.87a29.37 29.37 0 0 1-11.19-2.14zM522.23 179.17v30.89h-8.05v-30.89h-10.5v-6.74h29.11v6.74zM539.47 210.06v-37.63h8v37.63zM571.87 210.63h-.31L553 172.43h8.78l4.91 10.87c1.93 4.34 3.66 8 5 11.71 1.09-2.67 3.39-8 5.06-11.71l4.92-10.87h8.72zM604.06 171.86h.32l18.29 38.2h-8.42l-3-6.64h-14.08l-2.93 6.64h-8.41zm4.76 25.92c-1.72-3.92-3.4-7.89-4.55-11.19-1.09 2.62-3.08 7.63-4.65 11.19zM628.57 210.06v-37.63h8v30.89h14.53v6.74zM686.84 171.7a19.55 19.55 0 1 1-19.7 19.55 19.29 19.29 0 0 1 19.7-19.55zm0 31.72c6.79 0 11.6-5.43 11.6-12.17s-4.81-12.18-11.6-12.18-11.6 5.49-11.6 12.18 4.81 12.17 11.6 12.17zM722.48 179.17v9H735v6.64h-12.52v15.26h-8.05v-37.64h22.94v6.74zM766 190.62l-2-1.73v21.17h-7.68v-38.2h.15l17.93 18.08 17.92-18.08h.16v38.2h-7.68v-21.17l-2 1.73c-2.77 3-5.59 6.06-8.41 9-2.84-2.94-5.61-5.97-8.39-9zM820 171.7a19.55 19.55 0 1 1-19.7 19.55A19.29 19.29 0 0 1 820 171.7zm0 31.72c6.79 0 11.6-5.43 11.6-12.17s-4.81-12.18-11.6-12.18-11.6 5.49-11.6 12.18 4.8 12.17 11.6 12.17zM857.25 190.62l-2-1.73v21.17h-7.68v-38.2h.16l17.92 18.08 17.93-18.08h.15v38.2h-7.68v-21.17l-2 1.73c-2.77 3-5.6 6.06-8.42 9-2.79-2.94-5.56-5.97-8.38-9zM894 210.06v-37.63h24.19v6.74H902v8.57h13.7v6.48H902v9.1h17v6.74zM957.79 210.63l-20.64-19.8-2.46-2.15v21.38h-7.89v-38.2h.32l20.58 19.8 2.41 2.15v-21.38h7.94v38.2zM983.29 179.17v30.89h-8v-30.89h-10.5v-6.74h29.11v6.74zM998.81 208.65v-7.74a24.62 24.62 0 0 0 9.46 2.72 13.83 13.83 0 0 0 3.35-.21c2.87-.42 4.54-1.51 4.54-3.34 0-2.51-2.25-3.82-7.42-5.7-6.58-2.4-10.45-5.17-10.45-11.71s5.54-11 13.64-11a25.94 25.94 0 0 1 9.82 1.88V181a19.32 19.32 0 0 0-9.19-2.3c-3.87 0-6.38 1.52-6.38 3.92 0 2.2 2 3.71 7.16 5.65 6.58 2.56 10.66 5.33 10.66 11.65 0 6.79-5.12 10.87-14 10.87a29.41 29.41 0 0 1-11.19-2.14z"/>
    <path className="masthead__improv-festival" d="M23.54 153.59H0v-81.1h23.54zM64.43 116.2v37.39H42V71.36h.56L83 104.71l40.33-33.35h.67v82.23h-22.52V116.2L83 131.18zM204.66 101c0 19.37-14.42 28.5-34.58 28.5h-4.17v24.1h-23.54V72.49h27.71c20.16 0 34.58 9.24 34.58 28.51zm-38.75-8.68v17.35h5.41c5.07 0 9.57-2.14 9.57-8.67s-4.5-8.68-9.57-8.68zM281.25 101c0 10-4.39 18.47-13.52 23.09 16.22 37.85 42.47 48.21 67.7 48.21 8 0 15.54-1 20.16-2.59l-11.08 23.09s-6.91.68-10.21.68c-36 0-68.37-16.56-86.84-65.11h-7.77v25.23h-23V72.49h30c20.25 0 34.56 9.35 34.56 28.51zm-41.56-8.68v17.35h8.78c5.07 0 9-2 9-8.67 0-6.42-3.94-8.68-9-8.68zM335.2 70.8c25.57 0 43.37 19 43.37 42.24 0 23.54-17.8 42.24-43.37 42.24S292 136.58 292 113c0-23.16 17.74-42.2 43.2-42.2zm0 63c11.94 0 19.6-9.8 19.6-20.73 0-10.7-7.66-20.73-19.6-20.73s-19.6 10-19.6 20.73c0 10.93 7.77 20.7 19.6 20.7zM440.74 72.49h25.9l-42.35 82.23h-1.12L380.7 72.49h26l10 21.52c2.82 6 5.75 12.61 6.88 16.78h.22c1.2-4.17 4.1-10.79 6.91-16.79zM499.53 72.49H551v19.82h-27.93v12.06h23.54v19.26h-23.54v30h-23.54zM564.74 72.49H619v19.82h-30.72v10.82h26.36v18.58h-26.36v12.06h32.44v19.82h-56zM690.67 130.61c0 15.43-11.49 24.67-32.66 24.67-9.13 0-18.48-1.69-24.79-4.39v-22.53a51.84 51.84 0 0 0 23.55 6.42c7.09 0 10.92-1.24 10.92-4.17 0-3.38-5.29-5-14-8.33-13.06-5.07-22.3-10.48-22.3-26 0-15.21 12.51-25.46 31.77-25.46 8.11 0 16.44 1.47 22.07 3.83v21.61c-5-3.27-12.5-5.18-20-5.18-6.64 0-10.7 1.91-10.7 5.18 0 2.93 5 4.95 13.18 8.33 13.05 5.41 22.96 10.93 22.96 26.02zM762 72.49v19.82h-20.76v61.28h-23.65V92.31h-20.73V72.49zM798.12 153.59h-23.54v-81.1h23.54zM867.28 72.49h25.91l-42.36 82.23h-1.12l-42.47-82.23h26l10 21.52c2.81 6 5.74 12.61 6.87 16.78h.22c1.13-4.17 4.06-10.82 6.87-16.78zM932.6 142.89h-24.66l-5 10.7h-24.4l41.22-82.23h1.13l41.23 82.23h-24.45zm-18.13-15.32h11.71c-2-4.73-5.07-12.16-5.74-15.09h-.23c-.67 2.93-3.71 10.36-5.74 15.09zM972.47 153.59v-81.1H996v61.28h27.71v19.82z"/>
  </svg>
)

Masthead.propTypes = {
  festival: PropTypes.shape({
    startDate: PropTypes.time.isRequired,
    endDate: PropTypes.time.isRequired,
  }),
}

export default Masthead
