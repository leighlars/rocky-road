import React from 'react'
import './Location.scss'
import Header from '../Header/Header'

const Location = ({getCurrentPage, allStatesInfo}) => {

  const locationName = getCurrentPage().split('/')[2].split('-').join(' ')
  const backgroundImage = locationName.split(' ').join('-').toLowerCase()
  let siteData = {}

  const getSiteInfo = () => {
    const stateName = getCurrentPage().split('/')[1]
    siteData  = allStatesInfo.reduce((location, state) => {
      if (state.state === stateName) {
         location = state.info.find(site => {
           return site.name === locationName
         })
       }
      return location
    }, {})
    
    console.log(siteData)
  }

  const getOperationsInfo = () => {
    return(
      <>
        <span className='operation-description'>
          <h3>Operations</h3>

          <p>{siteData.operationDesc}</p>
        </span>
      </>
    )

  }
  

  return (
   <section className={`location-section ${(backgroundImage)}`}>
    <Header />
    <section className="location-info">
     <h2 className="location-header">{locationName}</h2>
      {getSiteInfo()}
      <div className='operations-box'>

      </div>
    </section>
   </section>
  );

}
export default Location