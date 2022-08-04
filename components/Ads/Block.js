import React, { useEffect } from "react"

function Block() {
  useEffect(() => {
    try {
      ;(window.adsbygoogle = window.adsbygoogle || []).push({})
    } catch (error) {}
  }, [])

  return (
    <div className="divMargin">
      <ins
        className="adsbygoogle"
        style={{ display: "inline-block", width: 350, height: 300 }}
        data-ad-client="ca-pub-8618691594432056"
        data-ad-slot="7480256692"
      ></ins>
    </div>
  )
}

export default Block
