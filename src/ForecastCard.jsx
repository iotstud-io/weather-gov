import React, { Activity, useState } from 'react'

import ForecastCardFullDesc from './ForecastCardFullDesc'
import ForecastCardSection from './ForecastCardSection'

const ForecastCard = ({ day, top, bottom, style, theme, format}) => {

    const [showFullDesc, setShowFullDesc] = useState({show: false, desc: '', title: ''})

    return <div style={style}>

        <div style={{
            position: 'absolute', 
            top: '50%', 
            left: '50%', 
            transform: 'translateX(-50%) translateY(-50%)',
            fontSize: 14, 
            background: theme.palette.background.default,
            padding: '0 10px 2px 10px',
            borderRadius: 10,
        }}>
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