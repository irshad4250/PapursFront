import React, { useEffect } from "react"

function Plaque() {
  useEffect(() => {
    try {
      ;(window.adsbygoogle = window.adsbygoogle || []).push({})
    } catch (error) {}
  }, [])

  return (
    <div className="divMargin">
      <ins
        className="adsbygoogle"
        style={{
          display: "inline-block",
          width: 300,
          height: 90,
        }}
        data-ad-client="ca-pub-8618691594432056"
        data-ad-slot="3322300084"
      ></ins>
    </div>
  )
}

export default Plaque
