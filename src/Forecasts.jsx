import React from 'react'

import ForecastCard from './ForecastCard'

const Forecasts = ({ forecasts=[], format, theme }) => {

    if(forecasts.length === 0) { 
        return null 
    }

    const cards = []
    const day = new Date().toLocaleDateString('en-US', { weekday: 'long' })
    
    let i = 0

    if(!forecasts[0].isDaytime) {
        i = 1
    }

    for(i; i < forecasts.length; i += 2) {

        const a = forecasts[i]
        const b = forecasts[i + 1] 
        const a_day = new Date(a.startTime).toLocaleDateString('en-US', { weekday: 'long' })
                
        if(a_day === day) {
            continue
        }

        if(!a || !b) {
            continue
        }

        cards.push(
            <ForecastCard 
                day={a_day}
                key={a.startTime} 
                top={a} 
                bottom={b} 
                theme={theme} 
                format={format} />
        )
    }

    return cards
}

export default Forecasts