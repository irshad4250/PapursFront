import { postReq } from "../../Global/functions"

export default async function handler(req, res) {
  const { q } = req.body

  const results = await postReq(
    process.env.NEXT_PUBLIC_BACKEND_URL + "search/autocomplete",
    {
      q,
    }
  )

  if (results.error) {
    return res.status(200).send({ error: true })
  } else {
    return res.status(200).send(results)
  }
}
