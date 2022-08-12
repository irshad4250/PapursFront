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
        style={{ display: "block" }}
        data-ad-client="ca-pub-8618691594432056"
        data-ad-slot="6868132156"
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>
    </div>
  )
}

export default Plaque
