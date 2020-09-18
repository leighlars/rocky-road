import React from 'react'
import './Home.scss'
import Header from '../Header/Header'
// import Search from '../Search/Search'
import {Link} from 'react-router-dom'

const Home = () => {

  const states = ['Colorado', 'Idaho', 'Montana', 'Wyoming']
  const jsxStates = states.map(state => {
    return <Link className="state-text" to={`/${state}`} key={state}>{state}</Link>
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