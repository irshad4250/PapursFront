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
  return new Promise((resolve, reject) => {
    axios
      .post(process.env.NEXT_PUBLIC_BACKEND_URL + "api/getSubjectsLevel", {
        level: level,
      })
      .then((result) => {
        if (result.data.error) {
          resolve([])
        } else {
          resolve(result.data.data)
        }
      })
      .catch(() => {
        resolve([])
      })
  })
}

export function getYears(subject) {
  return new Promise((resolve, reject) => {
    axios
      .post(process.env.NEXT_PUBLIC_BACKEND_URL + "api/getYears", {
        subject: subject,
      })
      .then((result) => {
        if (result.data.error) {
          resolve([])
        } else {
          resolve(result.data.data)
        }
      })
      .catch(() => {
        resolve([])
      })
  })
}

/**
 * Function that posts request
 *
 * @param - router
 * @param - JSONData
 */
export function postReq(route, JSONData) {
  return new Promise((resolve, reject) => {
    fetch(route, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(JSONData),
    })
      .then((response) => response.json())
      .then((data) => {
        resolve(data)
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
