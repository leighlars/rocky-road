import React from 'react'
import './Home.scss'
import Header from '../Header/Header'
import {Link} from 'react-router-dom'

const Home = () => {

  const states = ['Colorado', 'Idaho', 'Montana', 'New Mexico', 'Utah', 'Wyoming']
  const jsxStates = states.map(state => {
    return <Link className="state-text" to={`/results/${state}`}><h2>{state}</h2></Link>
  })

  return (
   <section className="home">
    <Header />
    <section className="state-box">
      {jsxStates}
    </section>
   </section>
  );
}

export default Home