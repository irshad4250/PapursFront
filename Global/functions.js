import axios from "axios"

export function makeId(length) {
  let result = ""
  let characters = "abcdefghijklmnopqrstuvwxyz0123456789"
  let charactersLength = characters.length
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength))
  }
  return result
}

export function getSubjects(level) {
  return new Promise(async (resolve, reject) => {
    const subjects = await postReq(
      process.env.NEXT_PUBLIC_BACKEND_URL + "api/getSubjectsLevel",
      { level: level }
    )
    if (subjects.error) {
      resolve([])
    } else {
      resolve(subjects.data)
    }
  })
}

export function getYears(subject) {
  return new Promise(async (resolve, reject) => {
    const years = await postReq(
      process.env.NEXT_PUBLIC_BACKEND_URL + "api/getYears",
      { subject: subject }
    )
    if (years.error) {
      resolve([])
    } else {
      resolve(years.data)
    }
  })
}

/**
 * Function that posts request
 *
 * @param
 * - route
 * - JSONData
 *
 * returns JSON {error:true} if error occured
 */
export function postReq(route, JSONData) {
  return new Promise((resolve, reject) => {
    axios
      .post(route, JSONData)
      .then((response) => {
        resolve(response.data)
      })
      .catch(() => {
        resolve({ error: true })
      })
  })
}

/**
 * Function that gets request
 *
 * @param - router
 *
 * returns JSON{error:true} if error occured
 */
export function getReq(route, reqParams = {}) {
  return new Promise((resolve, reject) => {
    axios
      .get(route, reqParams)
      .then((response) => {
        resolve(response.data)
      })
      .catch((err) => resolve({ error: true }))
  })
}
