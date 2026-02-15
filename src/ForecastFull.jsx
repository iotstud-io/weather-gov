import React, { Activity, useRef, useState } from "react"

import Forecasts from './Forecasts'
import Today from "./Today"
import AlertContent from "./AlertContent"
import FullDesc from "./FullDesc"

const CARD_SIZE = 275
const CARD_GAP = 15
const SCROLL_STEP = CARD_SIZE + CARD_GAP

const ForecastFull = ({ 
    settings, 
    theme, 
    weather_alerts=[], 
    weather_forecast=[], 
    weather_observations=[],
    weather_gridpoint_data={}
}) => {

    let format = 'f'

    if(settings?.temperature_format === 'c') {
        format = 'c'
    }

    const scrollerRef = useRef(null)
    const [showAlertContent, setShowAlertContent] = useState(false)
    const [activeAlertData, setActiveAlertData] = useState([])
    const [alertColor, setAlertColor] = useState(null)
    const [showFullDesc, setShowFullDesc] = useState({hide: true, desc: ''})

    const root_style = {
        boxShadow: `2px 2px 2px ${theme.palette.background.shadow}`,
        background:
            `linear-gradient(${theme.palette.background.default}, ${theme.palette.background.default}) padding-box,
             linear-gradient(135deg, ${theme.palette.background.paper}, ${theme.palette.background.shadow}) border-box`
    }

    const arrowButtonStyle = {
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

    return <div className="wg-forecast-root" style={root_style}>

        <Activity mode={showAlertContent ? 'visible': 'hidden'}>
            <AlertContent
                alerts={activeAlertData} 
                color={alertColor}
                theme={theme}
                setActiveAlertData={setActiveAlertData}
                setShowAlertContent={setShowAlertContent} 
                weather_alerts={weather_alerts} />
         </Activity>

        <Activity mode={(!showAlertContent && showFullDesc.hide) ? 'visible': 'hidden'}>
            <Today 
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
                setShowFullDesc={setShowFullDesc} 
                theme={theme}
                desc={showFullDesc.desc} />
        </Activity>

        <div className='wg-carousel-container'>

            <button
                type="button"
                className="wg-carousel-btn"
                style={arrowButtonStyle}
                onClick={() => handleShift(-1)}
                aria-label="Scroll forecast left"
            >
                &#8249;
            </button>

            <div className='wg-carousel-viewport' aria-label="Forecast carousel">

                <div ref={scrollerRef} className='wg-carousel-scroller'>

                    <div className='wg-carousel-tracker'>

                        <Forecasts format={format} forecasts={weather_forecast} theme={theme} />

                    </div>

                </div>
            </div>

            <button
                type="button"
                className="wg-carousel-btn"
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
