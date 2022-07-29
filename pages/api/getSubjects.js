import { postReq } from "../../Global/functions"

export default async function handler(req, res) {
  const { level } = req.body

  if (!level) {
    res.send({ error: true })
    return
  }

  const subjectObj = await postReq(
    process.env.NEXT_PUBLIC_BACKEND_URL + "api/getSubjectsLevel",
    { level: level }
  )

  if (subjectObj.length == 0 || subjectObj.error) {
    res.send({ error: true })
    return
  }

  res.send(subjectObj.data)
}
