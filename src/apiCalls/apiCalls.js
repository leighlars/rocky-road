const npKey = '3IuZhy1koKFbG9gMCDtYZFA98bOYHzRHb5PcV4HB'
const url = "https://developer.nps.gov/api/v1/parks?stateCode=co&api_key=3IuZhy1koKFbG9gMCDtYZFA98bOYHzRHb5PcV4HB"

export const getCOData = async () => {
  try {
    const response = await fetch(`${url}`)
    const data = response.json()
    return data
  } catch (err) {
    return err
  }


}