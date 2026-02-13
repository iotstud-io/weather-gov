import React, { Activity } from "react"

import { 
    f_to_c,
    c_to_f, 
    degToCompass, 
    kmhToMph, 
    GetSvg, 
    tempColor
} from './Functions'

import Alerts from './Alerts'

let temp_style = {
    flexShrink: 0,
    borderRadius: '50%',
    width: '90px',
    height: '90px',
    textAlign: 'center',
    margin: '0',
    fontSize: '28px',
    fontWeight: 'bold',
    padding: '22px 0',
}

const Today = ({ 
    mainCardStyle,
    setActiveAlertData,
    setAlertColor,
    setShowAlertContent,
    format,
    weather_forecast=[], 
    weather_observations=[],
    weather_alerts, 
    theme 
}) => {

    const latest_observation = Array.isArray(weather_observations) && weather_observations[0] ? weather_observations[0]: {}
    const latest_forecast = Array.isArray(weather_forecast) && weather_forecast[0] ? weather_forecast[0]: {}
    const t = weather_observations?.find(o => o?.properties?.temperature?.value != null)?.properties?.temperature?.value || null
    const current_humidity = weather_observations?.find(o => o?.properties?.relativeHumidity?.value != null)?.properties?.relativeHumidity?.value || null
    const current_wind_speed = weather_observations?.find(o => o?.properties?.windSpeed?.value != null)?.properties?.windSpeed?.value || null
    const current_wind_direction = weather_observations?.find(o => o?.properties?.windDirection?.value != null)?.properties?.windDirection?.value || null
    const current_wind_gust = weather_observations?.find(o => o?.properties?.windGust?.value != null)?.properties?.windGust?.value || null
    const today = latest_observation?.startTime?.slice(0, 10) || []
    const todays = Array.isArray(weather_forecast) ? weather_forecast.filter(p => p.startTime.startsWith(today)): []
    const day = todays.find(p => p.isDaytime) || {}
    const night = todays.find(p => !p.isDaytime) || {}
    const day_formatted = !day?.temperature ? '--': format === 'c' ? Math.round(f_to_c(day.temperature)): Math.round(day.temperature)
    const night_formatted = !night?.temperature ? '--': format === 'c' ? Math.round(f_to_c(night.temperature)): Math.round(night.temperature)
    const t_formatted = !t ? '--': format === 'f' ? Math.round(c_to_f(t)): Math.round(t)
    const todayName = new Date().toLocaleDateString(undefined, { weekday: 'long' })
    const tcolor = tempColor(t, 'c', theme)
    const detailed_forecast = latest_forecast?.detailedForecast || ''

    const instanceTempStyle = { 
        ...temp_style, 
        textShadow: `2px 2px 2px ${theme.palette.background.shadow}`,
        outline: `3px solid ${tcolor}`,
        backgroundColor: theme.palette.background.paper,
    }

    mainCardStyle = {
        ...mainCardStyle,
        backgroundColor: theme.palette.background.paper,
        border: `2px solid ${theme.palette.background.paper}`,
    }

    return <div style={{...mainCardStyle, marginRight: 10}}>

        <Activity mode={weather_alerts.length > 0 ? 'visible': 'hidden'}>
            <Alerts 
                setActiveAlertData={setActiveAlertData} 
                setAlertColor={setAlertColor}
                setShowAlertContent={setShowAlertContent} 
                weather_alerts={weather_alerts} 
                theme={theme} />
        </Activity>

        <div className='flx justify-between align-center gap10' style={{ width: '100%' }}>

            <div style={instanceTempStyle}>
                {t_formatted}°{format.toUpperCase()}
            </div>

            <div>

                <h2 className='txt-center'>{todayName}</h2>

                <div className='txt-center' style={{ fontSize: 22 }}>
                    {day_formatted}°{format.toUpperCase()} / {night_formatted}°{format.toUpperCase()}
                </div>

            </div>

        </div>

        <div className='flx justify-center align-center'  style={{ margin: '14px 0 0 0', gap: 16 }}>

            {current_wind_speed && current_wind_direction && current_wind_gust &&
            <div className='flx justify-center align-center gap2'>
                {GetSvg(16, 16, "windpointer")} 
                {degToCompass(current_wind_direction)}
                {kmhToMph(current_wind_speed)}- 
                {kmhToMph(current_wind_gust)}
            </div>}

            {current_humidity && 
            <div className='flx justify-center align-center gap2'>
                {GetSvg(16, 16, "humiditydrop")} {Math.round(current_humidity)}%
            </div>}

            {latest_forecast?.probabilityOfPrecipitation?.value && 
            <div className='flx justify-center align-center gap2'>
                {GetSvg(18, 18, "LightRain")} {latest_forecast.probabilityOfPrecipitation.value}%
            </div>}

        </div>

        <div className='flx justify-left align-center txt-left gap10' style={{ margin: '10px 0 0 0' }}>
            
            {latest_forecast?.shortForecast &&
            <div style={{flexShrink: 0 }}>
                {GetSvg(60, 60, latest_forecast.shortForecast)}
            </div>}

            <div style={{ fontSize: 15}}>
                {detailed_forecast.length <= 80 ? detailed_forecast: detailed_forecast.substring(0, 80) + '...'}
            </div>

        </div>
    </div>
}

export default Today