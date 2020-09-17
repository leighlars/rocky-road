import { getAllData } from '../apiCalls/apiCalls'

export const cleanData = async () => {
  const response = await getAllData()
  console.log(response)
  const prettyData = response.reduce((places, place) => {
    const location = {}
    location.name = place.fullName
    location.description = place.description
    location.activities = place.activities
    location.states = place.states
    location.contactInfo = place.contacts
    location.entranceFees = place.entranceFees
    location.operationDesc = place.operatingHours[0].description
    location.operationHours = place.operatingHours[0].standardHours
    location.directions = place.directionsInfo
    location.directionsPage = place.directionsUrl
    location.town = place.city
    location.state = place.state
    location.designation = place.designation
    location.weather = place.weatherInfo
    location.name = place.name
    console.log(location)
    places.push(location)
    return places
  }, [])
  return prettyData
}