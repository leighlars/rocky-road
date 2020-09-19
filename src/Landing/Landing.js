import React from 'react'
import './Landing.scss'
import Header from '../Header/Header'

const Home = (props) => {

  return (
   <section className="landing">
    <Header getCurrentPage={props.getCurrentPage} />
   </section>
  );


}

export default Home
