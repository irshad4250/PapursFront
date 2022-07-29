import { postReq } from "../../Global/functions"

export default async function handler(req, res) {
  const { subject } = req.body

  if (!subject) {
    res.send({ error: true })
    return
  }

  const yearsObj = await postReq(
    process.env.NEXT_PUBLIC_BACKEND_URL + "api/getYears",
    { subject: subject }
  )

  if (yearsObj.length == 0 || yearsObj.error) {
    res.send({ error: true })
    return
  }

  res.send(yearsObj.data)
}
