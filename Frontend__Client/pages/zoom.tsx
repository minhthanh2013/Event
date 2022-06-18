import React from "react"
import dynamic from "next/dynamic"

const DynamicComponentWithNoSSR = dynamic(
    () => import('../components/ZoomV2'),
    { ssr: false }
)

const Zoom = () => {
    return (
        <>
            <DynamicComponentWithNoSSR />
        </>
    )
}

export default Zoom