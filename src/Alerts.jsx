import React from 'react'
import Alert from './Alert'

const Alerts = ({ setActiveAlertData, setAlertColor, setShowAlertContent, theme, weather_alerts }) => {

    const alerts = { high: [], medium: [], low: [] }
    const totals = { all: 0, high: 0, medium: 0, low: 0 }

    if(weather_alerts.length > 0) {

        totals.all = weather_alerts.length

        weather_alerts.forEach(alert => {

            if(alert.properties.severity === 'Extreme' || alert.properties.severity === 'Severe') {
                totals.high++
                alerts.high.push(alert)
            }
            
            if(alert.properties.severity === 'Moderate') {
                totals.medium++
                alerts.medium.push(alert)
            }
            
            if(alert.properties.severity === 'Minor' || alert.properties.severity === 'Unknown') {
                totals.low++
                alerts.low.push(alert)
            }
        })
    }

    const showHighAlerts = () => {
        if(totals.high > 0) {
            return <Alert 
                alerts={alerts.high}
                setActiveAlertData={setActiveAlertData}
                setAlertColor={setAlertColor}
                setShowAlertContent={setShowAlertContent}
                theme={theme} 
                title="Extreme/Severe Weather Alerts" 
                color={theme.palette.error.dark} 
                total={totals.high} />
        }
    }

    const showMediumAlerts = () => {
        if(totals.medium > 0) {
            return <Alert 
                alerts={alerts.medium}
                setActiveAlertData={setActiveAlertData}
                setAlertColor={setAlertColor}
                setShowAlertContent={setShowAlertContent}
                theme={theme} 
                title="Moderate Weather Alerts" 
                color={theme.palette.warning.dark} 
                total={totals.medium} />
        }
    }

    const showLowAlerts = () => {
        if(totals.low > 0) {
            return <Alert 
                alerts={alerts.low}
                setActiveAlertData={setActiveAlertData}
                setAlertColor={setAlertColor}
                setShowAlertContent={setShowAlertContent}
                theme={theme} 
                title="Minor Weather Alerts" 
                color={theme.palette.warning.light} 
                total={totals.low} />
        }
    }

    return <div className='wg-alert-container flx justify-center align-center nw gap2'>
        {showHighAlerts()}
        {showMediumAlerts()}
        {showLowAlerts()}
    </div>
}

export default Alerts