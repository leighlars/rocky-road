import React from 'react'
import './Home.scss'
import Header from '../Header/Header'
import colorado from '../assets/coForest.jpeg'
import idaho from '../assets/idSawtooth.jpg'
import montana from '../assets/mtFall.jpg'
import newMexico from '../assets/nmNight.jpg'
import utah from '../assets/utArches.jpg'
import wyoming from '../assets/wySunrise.jpg'

const Home = () => {
  return (
   <section className="home">
    <Header />
    <section className="state-boxes">
     <article className="state">
      <img src={colorado} alt="Evergreen forest with Rocky Mountain peak" />
      <div className="state-text">
       <h2>Colorado</h2>
       <p>Here's some stuff about Colorado</p>
      </div>
     </article>
     <article className="state">
      <div className="state-text">
       <h2>Idaho</h2>
       <p>Here's some stuff about Idaho</p>
      </div>
      <img src={idaho} alt="Sawtooth Mountain range" />
     </article>
     <article className="state">
      <img src={montana} alt="Fall yellow trees with Rocky Mountain peak" />
      <div className="state-text">
       <h2>Montana</h2>
       <p>Here's some stuff about Montana</p>
      </div>
     </article>
     <article className="state">
      <div className="state-text">
       <h2>New Mexico</h2>
       <p>Here's some stuff about New Mexico</p>
      </div>
      <img src={newMexico} alt="Moonlight on mountain in Taos New Mexico" />
     </article>
     <article className="state">
      <div className="state-text">
       <img src={utah} alt="Arch from Arches National Park" />
       <h2>Utah</h2>
       <p>Here's some stuff about Utah</p>
      </div>
     </article>
     <article className="state">
      <div className="state-text">
       <h2>Wyoming</h2>
       <p>Here's some stuff about Wyoming</p>
      </div>
      <img src={wyoming} alt="Sunrise on Grand Tetons" />
     </article>
    </section>
   </section>
  );
}

export default Home