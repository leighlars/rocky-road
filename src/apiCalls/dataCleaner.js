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
        location.activities = getAllActivities(site.activities)
        location.states = site.states
        location.contactInfo = site.contacts
        location.entranceFees = site.entranceFees
        location.operationDesc = site.operatingHours[0].description
        location.operationHours = site.operatingHours[0].standardHours
        location.directions = site.directionsInfo
        location.directionsPage = site.directionsUrl
        location.town = site.addresses[0].city
        location.stateCode = site.addresses[0].stateCode
        location.state = getFullStateName(site.addresses[0].stateCode)
        location.designation = site.designation
        location.weather = site.weatherInfo
        location.images = site.images
        location.url = site.url
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
  const CO = allSites.filter(site => site.stateCode === 'CO')
  const WY = allSites.filter((site) => site.stateCode === "WY")
  const MT = allSites.filter((site) => site.stateCode === "MT");
  const ID = allSites.filter((site) => site.stateCode === "ID");
  const states = [
    {state: "Colorado", info: {
      natParks: CO.filter(site => site.designation.includes('National Park')), 
      recAreas: CO.filter(site => !site.designation.includes('National Park'))}}, 
    {state: "Wyoming", info: {
      natParks: WY.filter(site => site.designation.includes('National Park')), 
      recAreas: WY.filter(site => !site.designation.includes('National Park'))}}, 
    {state:"Montana", info: {
      natParks: MT.filter(site => site.designation.includes('National Park')), 
      recAreas: MT.filter(site => !site.designation.includes('National Park'))}}, 
    {state: "Idaho", info: {
      natParks: ID.filter(site => site.designation.includes('National Park')), 
      recAreas: ID.filter(site => !site.designation.includes('National Park'))}}
  ]
  return states
}

const getFullStateName = (stateCode) => {
 if (stateCode === "CO") {
  return "Colorado";
 } else if (stateCode === "ID") {
  return "Idaho";
 } else if (stateCode === "MT") {
  return "Montana";
 } else if (stateCode === "WY") {
  return "Wyoming";
 }
};

const getAllActivities = (activitiesList) => {
  const activities = activitiesList.map(activity => {
    return activity.name
  })
  return activities
}
