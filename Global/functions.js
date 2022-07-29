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
    const subjects = await postReq("/api/getSubjects", { level: level })
    if (subjects.error) {
      resolve([])
    } else {
      resolve(subjects)
    }
  })
}

export function getYears(subject) {
  return new Promise(async (resolve, reject) => {
    const years = await postReq("/api/getYears", { subject: subject })
    if (years.error) {
      resolve([])
    } else {
      resolve(years)
    }
  })
}

/**
 * Function that posts request
 *
 * @param - route
 * @param - JSONData
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
 */
export function getReq(route) {
  return new Promise((resolve, reject) => {
    fetch(route, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        resolve(data)
      })
  })
}
