import React from "react"
import ContentLoader from "react-content-loader"

const Skeleton = () => (
    <ContentLoader
        className="pizza-block"
        speed={2}
        width={280}
        height={465}
        viewBox="0 0 280 465"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
    >
        <circle cx="134" cy="136" r="125" />
        <rect x="0" y="288" rx="10" ry="10" width="280" height="18" />
        <rect x="0" y="318" rx="0" ry="0" width="280" height="88" />
        <rect x="0" y="421" rx="10" ry="10" width="95" height="30" />
        <rect x="51" y="441" rx="0" ry="0" width="5" height="6" />
        <rect x="131" y="412" rx="25" ry="25" width="152" height="45" />
        <rect x="213" y="431" rx="0" ry="0" width="1" height="1" />
    </ContentLoader>
)

export default Skeleton
