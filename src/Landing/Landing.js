import React from 'react'
import './Landing.scss'
import Header from '../Header/Header'
import PropTypes from 'prop-types'


const Landing = (props) => {
  return (
   <section className="landing">
    <Header getCurrentPage={props.getCurrentPage} />
   </section>
  )
}

export default Landing

Landing.propTypes = {
 getCurrentPage: PropTypes.func,
};