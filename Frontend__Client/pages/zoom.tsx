import React from "react"
import dynamic from "next/dynamic"

const DynamicComponentWithNoSSR = dynamic(
    () => import('../components/ZoomV2'),
    { ssr: false }
)

const Zoom = () => {
    return (
        <>          
        <link type="text/css" rel="stylesheet" href="https://source.zoom.us/2.4.5/css/bootstrap.css" />
        <link type="text/css" rel="stylesheet" href="https://source.zoom.us/2.4.5/css/react-select.css" />
            <DynamicComponentWithNoSSR />
        </>
    )
}

export default Zoom