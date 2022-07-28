import { NextResponse } from "next/server"

export function middleware(request) {
  const response = NextResponse.next()
  const pidCookie = request.cookies.get("papursId")

  if (!pidCookie) {
    response.cookies.set("papursId", makeId(30), {
      httpOnly: true,
      maxAge: 24 * 60 * 60,
    })
  }

  function makeId(length) {
    let result = ""
    let characters = "abcdefghijklmnopqrstuvwxyz0123456789"
    let charactersLength = characters.length
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength))
    }
    return result
  }

  return response
}
