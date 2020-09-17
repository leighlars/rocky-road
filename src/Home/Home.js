import React from 'react'
import './Home.scss'
import Header from '../Header/Header'
import Search from '../Search/Search'
import {Link} from 'react-router-dom'

const Home = ({searchSites}) => {

  const states = ['Colorado', 'Idaho', 'Montana', 'New Mexico', 'Utah', 'Wyoming']
  const jsxStates = states.map(state => {
    return <Link className="state-text" to={`/${state}`}>{state}</Link>
  })

  return (
   <section className="home">
    <Header />
    {/* <Search search={searchSites} /> */}
    <section className="state-box">
      {jsxStates}
    </section>
   </section>
  );
}

export default Home