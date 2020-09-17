const npKey = process.env.REACT_APP_NP_KEY

export const getAllData = async () => {
  const states = ['co', 'wy', 'mt', 'id']
  const allStatesData = await states.map(state => {
    return getData(state)
  })
  // console.log(allStatesData)
  return allStatesData
}

const getData = async (state) => {
  console.log(npKey)
  try {
    const response = await fetch(`https://developer.nps.gov/api/v1/parks?stateCode=${state}&api_key=${npKey}`)
    const data = response.json()
    return data
  } catch (err) {
    return err
  }
}

