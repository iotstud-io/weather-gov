import React, { Activity, useRef, useState } from "react"

import Forecasts from './Forecasts'
import Today from "./Today"
import AlertContent from "./AlertContent"
import FullDesc from "./FullDesc"

const CARD_SIZE = 275
const CARD_GAP = 16
const SCROLL_STEP = CARD_SIZE + CARD_GAP
const SCROLLBAR_CLIP_SIZE = 24

let root_style = {
    width: "100%",
    height: 'auto',
    display: "flex",
    alignItems: "stretch",
    overflow: "hidden",
    padding: '15px 20px',
    border: '1px solid transparent',
    borderRadius: '10px',
}

let mainCardStyle = {
    width: CARD_SIZE,
    minWidth: CARD_SIZE,
    height: 255,
    borderRadius: 30,
    borderShape: 'squircle',
    textAlign: "center",
    padding: "15px",
    position: 'relative',
}

let arrowButtonStyle = {
    width: 36,
    minWidth: 36,
    height: 36,
    borderRadius: 9999,
    borderColor: "transparent",
    fontSize: 18,
    lineHeight: 1,
    cursor: "pointer",
}

const carouselContainerStyle = {
    flex: "1 1 auto",
    minWidth: 0,
    display: "flex",
    alignItems: "center",
    gap: "10px",
}

const carouselViewportStyle = {
    flex: "1 1 auto",
    minWidth: 0,
    overflow: "visible",
}

const carouselScrollerStyle = {
    overflowX: "auto",
    overflowY: "hidden",
    scrollBehavior: "smooth",
    scrollSnapType: "x mandatory",
    WebkitOverflowScrolling: "touch",
    scrollbarWidth: "none",
    msOverflowStyle: "none",
    paddingBottom: SCROLLBAR_CLIP_SIZE,
    marginBottom: -SCROLLBAR_CLIP_SIZE,
}

const carouselTrackStyle = {
    display: "flex",
    gap: `${CARD_GAP}px`,
}

const ForecastFull = ({ 
    settings, 
    theme, 
    weather_alerts=[], 
    weather_forecast=[], 
    weather_observations=[],
    weather_gridpoint_data={}
}) => {

    console.log(weather_forecast, weather_observations)

    let format = 'f'

    if(settings?.temperature_format === 'c') {
        format = 'c'
    }

    const scrollerRef = useRef(null)
    const [showAlertContent, setShowAlertContent] = useState(false)
    const [activeAlertData, setActiveAlertData] = useState([])
    const [alertColor, setAlertColor] = useState(null)
    const [showFullDesc, setShowFullDesc] = useState({hide: true, desc: ''})

    root_style = {
        ...root_style,
        boxShadow: `2px 2px 2px ${theme.palette.background.shadow}`,
        background:
            `linear-gradient(${theme.palette.background.default}, ${theme.palette.background.default}) padding-box,
             linear-gradient(135deg, ${theme.palette.background.paper}, ${theme.palette.background.shadow}) border-box`
    }

    arrowButtonStyle = {
        ...arrowButtonStyle,
        background: theme.palette.background.paper,
        color: theme.palette.text.primary,
    }

    const handleShift = direction => {

        const scroller = scrollerRef.current

        if(!scroller) {
            return
        }

        scroller.scrollBy({
            left: direction * SCROLL_STEP,
            behavior: "smooth",
        })
    }

    return <div style={root_style}>

        <Activity mode={showAlertContent ? 'visible': 'hidden'}>
            <AlertContent
                alerts={activeAlertData} 
                color={alertColor}
                mainCardStyle={mainCardStyle}
                theme={theme}
                setActiveAlertData={setActiveAlertData}
                setShowAlertContent={setShowAlertContent} 
                weather_alerts={weather_alerts} />
         </Activity>

        <Activity mode={(!showAlertContent && showFullDesc.hide) ? 'visible': 'hidden'}>
            <Today 
                mainCardStyle={mainCardStyle}
                format={format}
                setShowFullDesc={setShowFullDesc}
                setActiveAlertData={setActiveAlertData}
                setAlertColor={setAlertColor}
                setShowAlertContent={setShowAlertContent}
                theme={theme}
                weather_alerts={weather_alerts}
                weather_forecast={weather_forecast}
                weather_observations={weather_observations} 
                weather_gridpoint_data={weather_gridpoint_data} />
        </Activity>

        <Activity mode={showFullDesc.hide ? 'hidden': 'visible'}>
            <FullDesc 
                mainCardStyle={mainCardStyle} 
                setShowFullDesc={setShowFullDesc} 
                theme={theme}
                desc={showFullDesc.desc} />
        </Activity>

        <div style={carouselContainerStyle}>

            <button
                type="button"
                style={arrowButtonStyle}
                onClick={() => handleShift(-1)}
                aria-label="Scroll forecast left"
            >
                &#8249;
            </button>

            <div style={carouselViewportStyle} aria-label="Forecast carousel">

                <div ref={scrollerRef} style={carouselScrollerStyle}>

                    <div style={carouselTrackStyle}>

                        <Forecasts format={format} forecasts={weather_forecast} theme={theme} />

                    </div>

                </div>
            </div>

            <button
                type="button"
                style={arrowButtonStyle}
                onClick={() => handleShift(1)}
                aria-label="Scroll forecast right"
            >
                &#8250;
            </button>

        </div>
    </div>
}

export default ForecastFull
