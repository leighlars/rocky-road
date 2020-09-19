import React from 'react'
import './Home.scss'
import Header from '../Header/Header'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'

const Home = ({getCurrentPage}) => {

  const states = ['Colorado', 'Idaho', 'Montana', 'Wyoming']
  const jsxStates = states.map(state => {
    return <Link className="state-text" to={`/${state}`} key={state}>{state}</Link>
  })

  return (
   <section className="home">
    <Header getCurrentPage={getCurrentPage} />
    <article className="state-box">{jsxStates}</article>
   </section>
  );
}

export default Home

Home.propTypes = {
 getCurrentPage: PropTypes.func,
};