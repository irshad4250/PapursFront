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

/**
 * Function that returns all instant answers of a past paper
 *
 * @param - pdfName
 *
 * Returns empty array if error occured or no instant answers available
 */
export function getAllInstantAnswers(pdfName) {
  return new Promise((resolve, reject) => {
    postReq(
      process.env.NEXT_PUBLIC_BACKEND_URL + "search/getAllInstantAnswers",
      { pdfName: pdfName }
    ).then((response) => {
      if (response.error) {
        alert("Could not retrieve all instant answers")
        resolve([])
        return
      }
      resolve(response)
    })
  })
}

/**
 * Function that compresses an image
 *
 * @param - file from input
 *
 * Returns a blob
 */
export function resizeImage(file) {
  return new Promise((resolve1, reject1) => {
    let canvas, ctx
    let originalSize = file.size

    canvas = document.createElement("canvas")
    ctx = canvas.getContext("2d")
    let imgObj = new Image()
    let fileUrl = URL.createObjectURL(file)
    imgObj.src = fileUrl

    imgObj.onload = async () => {
      let naturalHeight = imgObj.naturalHeight
      let naturalWidth = imgObj.naturalWidth

      let aspectRatio = naturalWidth / naturalHeight

      let height = 500
      let width = aspectRatio * height
      canvas.height = height
      canvas.width = width

      ctx.drawImage(imgObj, 0, 0, width, height)

      let blob = await convertCanvasToBlob(canvas)
      if (blob.size < originalSize) {
        resolve1(blob)
      } else {
        resolve1(file)
      }
    }
  })
}

export function resizeImageV2(imgUrl, config) {
  console.log(config)
  return new Promise((resolve, reject) => {
    let canvas = document.createElement("canvas")
    let ctx = canvas.getContext("2d")
    let imgObj = new Image()
    let fileUrl = imgUrl

    imgObj.src = fileUrl
    imgObj.style.objectFit = "contain"
    imgObj.style.objectPosition = "center"

    imgObj.onload = async () => {
      canvas.height = 1000
      canvas.width = 1000

      imgObj.style.clipPath = `inset(${config.y}px ${
        config.originalWidth - (config.x + config.width)
      }px
        ${config.originalHeight - (config.y + config.height)}px ${config.x}px)`

      // console.log(imgObj.height)
      // console.log(config.height)
      // console.log(config.y + config.height)

      // ctx.fillStyle("#FFFFFF")
      ctx.drawImage(imgObj, 0, 0)

      console.log(canvas)
      let blob = await convertCanvasToBlob(canvas, 1)
      resolve(blob)
    }
  })
}

function convertCanvasToBlob(can, compressingFactor = 0.8) {
  return new Promise((resolve, reject) => {
    can.toBlob(
      function (blob) {
        resolve(blob)
      },
      "image/jpeg",
      compressingFactor
    )
  })
}

export const cropImageNow = (realImageUrl, image, crop, rotate) => {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement("canvas")
    const scaleX = image.naturalWidth / image.width
    const scaleY = image.naturalHeight / image.height

    const ctx = canvas.getContext("2d")

    const pixelRatio = window.devicePixelRatio
    canvas.width = crop.width * pixelRatio * scaleX
    canvas.height = crop.height * pixelRatio * scaleY

    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0)
    ctx.scale(pixelRatio, pixelRatio)
    ctx.imageSmoothingQuality = "high"

    const imageReal = document.createElement("img")
    imageReal.src = realImageUrl

    imageReal.onload = () => {
      ctx.drawImage(
        image,
        crop.x * scaleX,
        crop.y * scaleY,
        crop.width * scaleX,
        crop.height * scaleY,
        0,
        0,
        crop.width * scaleX,
        crop.height * scaleY
      )

      const base64Image = canvas.toDataURL("image/jpeg")
      resolve(base64Image)
    }
  })
}
