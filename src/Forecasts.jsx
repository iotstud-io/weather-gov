import React from 'react'
import { GetSvg} from './Functions'

let cardStyle = {
    width: 275,
    minWidth: 275,
    height: 240,
    borderRadius: 30,
    borderShape: 'squircle',
    textAlign: "center",
    padding: 0,
    margin: 0,
    position: 'relative'
}

const CardSection = (data, theme, isBottom = false) => (
    <div 
        className='flx justify-left align-center gap10' 
        style={{ 
            padding: !isBottom ? '20px 10px 10px 10px': '10px',
            margin: '0',
            height: '50%', 
            borderTop: isBottom ? `1px solid ${theme.palette.background.default}`: 'none' 
        }}>

        <div style={{ marginLeft: '0 6px'}}>

            <div style={{fontSize: 22, fontWeight: 'bold'}}>{data.temperature}°</div>

            <div style={{marginTop: 5}}>{GetSvg(45, 45, data.shortForecast, data.isDaytime)}</div>
            
        </div>

        <div>

            <div className='txt-left' style={{ fontSize: 15}}>
                
                {data.shortForecast}

                {data.windDirection && data.windSpeed && `
                    with winds from
                    ${data.windDirection} @ 
                    ${data.windSpeed}
                `}

                {(data.probabilityOfPrecipitation.value > 0) && `
                    and a ${data.probabilityOfPrecipitation.value}% chance of precipitation
                `}
                    
            </div>
        </div>

    </div>
)

const Forecasts = ({ forecasts=[], theme }) => {

    if(forecasts.length === 0) { 
        return null 
    }

    cardStyle = {
        ...cardStyle,
        backgroundColor: theme.palette.background.paper,
        scrollSnapAlign: "start",
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

        cards.push(
            <div style={cardStyle} key={a?.startTime}>

                <div style={{
                    position: 'absolute', 
                    top: '-10px', 
                    left: '50%', 
                    transform: 'translateX(-50%)',
                    fontSize: 16, 
                    background: theme.palette.background.default,
                    padding: '4px 12px 2px 12px',
                    borderRadius: 10,
                }}>
                    {a_day}
                </div>
                
                {CardSection(a, theme, false)}

                {CardSection(b, theme, true)}
                
            </div>
        )
    }

    return cards
}

export default Forecasts