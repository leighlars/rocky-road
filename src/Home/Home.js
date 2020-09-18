import React from 'react'
import './Home.scss'
import Header from '../Header/Header'
import {Link} from 'react-router-dom'

const Home = () => {

  const states = ['Colorado', 'Idaho', 'Montana', 'Wyoming']
  const jsxStates = states.map(state => {
    return <Link className="state-text" to={`/${state}`} key={state}>{state}</Link>
  })

  return (
   <section className="home">
    <Header />
    <article className="state-box">
      {jsxStates}
    </article>
   </section>
  );
}

export default Home