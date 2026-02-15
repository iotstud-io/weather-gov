import React from 'react'

import { f_to_c, GetSvg } from './Functions'

const ForecastCardSection = ({ data, isBottom = false, theme, format, setShowFullDesc }) => {

    const t_formatted = !data?.temperature ? '--': format === 'c' ? Math.round(f_to_c(data.temperature)): Math.round(data.temperature)

    return <div 
        className='wg-forecast-card-section flx justify-left align-center gap20'
        onClick={() => setShowFullDesc({show: true, desc: data.detailedForecast, title: data.name})}
        style={{ borderTop: isBottom ? `1px solid ${theme.palette.background.default}`: 'none' }}>

        <div style={{ marginLeft: 10}}>

            <div style={{fontSize: 22, fontWeight: 'bold'}}>
                {t_formatted}°{format.toUpperCase()}
            </div>

            <div>{GetSvg(42, 42, data.shortForecast, data.isDaytime)}</div>
            
        </div>

        <div 
            className='txt-left' 
            style={{ 
                fontSize: 17, 
                fontWeight: 'bold', 
                lineHeight: '20px',
            }}>
            
            {data.shortForecast}
                
        </div>

    </div>
}

export default ForecastCardSection