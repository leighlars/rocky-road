import { getAllData } from '../apiCalls/apiCalls'

export const formatAllData = async () => {
  const response = await getAllData()
  const prettyData = response.reduce((places, place) => {
    const sites = place.data
    sites.forEach(site => {
      if (site.longitude < -105) {
        const location = {}
        location.fullName = site.fullName
        location.description = site.description
        location.activities = site.activities
        location.states = site.states
        location.contactInfo = site.contacts
        location.entranceFees = site.entranceFees
        location.operationDesc = site.operatingHours[0].description
        location.operationHours = site.operatingHours[0].standardHours
        location.directions = site.directionsInfo
        location.directionsPage = site.directionsUrl
        location.town = site.addresses[0].city
        location.state = site.addresses[0].stateCode
        location.designation = site.designation
        location.weather = site.weatherInfo
        location.name = site.name
        places.push(location)
      }
    })
      return places
  }, [])
  return prettyData
}

export const getCleanStatesInfo = async() => {
  const allSites = await formatAllData()
  const CO = allSites.filter(site => site.state === 'CO')
  const WY = allSites.filter((site) => site.state === "WY")
  const MT = allSites.filter((site) => site.state === "MT");
  const ID = allSites.filter((site) => site.state === "ID");
  const states = [
    {state: "Colorado", info: CO}, 
    {state: "Wyoming", info: WY}, 
    {state:"Montana", info: MT}, 
    {state: "Idaho", info: ID}]
  return states
}
