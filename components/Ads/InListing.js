import React from "react"

function InListing(props) {
  useEffect(() => {
    try {
      ;(window.adsbygoogle = window.adsbygoogle || []).push({})
    } catch (error) {}
  }, [])
  return (
    <ins
      className="adsbygoogle"
      style="display:block"
      data-ad-format="fluid"
      data-ad-layout-key="-gw-3+1f-3d+2z"
      data-ad-client="ca-pub-8618691594432056"
      data-ad-slot="3497480938"
    ></ins>
  )
}

export default InListing
