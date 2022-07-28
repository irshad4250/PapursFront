import { NextResponse } from "next/server"
import { makeId } from "./Global/functions"

export function middleware(request) {
  console.log("Request")

  const response = NextResponse.next()
  const pidCookie = request.cookies.get("papursId")

  if (!pidCookie) {
    response.cookies.set("papursId", makeId(30), {
      httpOnly: true,
      maxAge: 24 * 60 * 60,
    })
  }

  return response
}
