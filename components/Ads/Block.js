import React, { useEffect } from "react"

function Block() {
  useEffect(() => {
    try {
      ;(window.adsbygoogle = window.adsbygoogle || []).push({})
    } catch (error) {}
  }, [])

  return (
    <ins
      className="adsbygoogle"
      style={{ display: "block" }}
      data-ad-client="ca-pub-8618691594432056"
      data-ad-slot="9996068388"
      data-ad-format="auto"
      data-full-width-responsive="true"
    ></ins>
  )
}

export default Block
