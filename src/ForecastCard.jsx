import React, { Activity, useState } from 'react'

import ForecastCardFullDesc from './ForecastCardFullDesc'
import ForecastCardSection from './ForecastCardSection'

const ForecastCard = ({ day, top, bottom, theme, format}) => {

    const [showFullDesc, setShowFullDesc] = useState({show: false, desc: '', title: ''})

    const style = {
        backgroundColor: theme.palette.background.paper,
    }

    return <div className='wg-forecasts-card' style={style}>

        <div className='wg-day' style={{ backgroundColor: theme.palette.background.default }}>
            {day}
        </div>

        <Activity mode={!showFullDesc.show ? 'visible': 'hidden'}>
        
            <ForecastCardSection 
                setShowFullDesc={setShowFullDesc}
                data={top} 
                isBottom={false} 
                theme={theme}
                format={format} />

            <ForecastCardSection 
                setShowFullDesc={setShowFullDesc}
                data={bottom} 
                isBottom={true} 
                theme={theme} 
                format={format} />

        </Activity>

        <Activity mode={showFullDesc.show ? 'visible': 'hidden'}>

            <ForecastCardFullDesc 
                style={style}
                desc={showFullDesc.desc} 
                title={showFullDesc.title}
                setShowFullDesc={setShowFullDesc} 
                theme={theme} />

        </Activity>
        
    </div>
}

export default ForecastCard