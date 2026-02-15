import React from 'react'

const AlertContent = ({
    alerts=[], 
    color, 
    setActiveAlertData, 
    setShowAlertContent, 
}) => {

    const showAllAlertsInfo = () => {

        const infos = []

        alerts.forEach(alert => {
            infos.push(
                <div key={alert.properties.id}>
                    <div style={{fontWeight: 900}}>{alert.properties.headline}</div>
                    <div>{alert.properties.description}</div>
                    <div>{alert.properties.instruction}</div>
                </div>
            )
        })

        return infos
    }

    const button_style = { 
        border: `2px solid ${color}`, 
    }

    const style = {
        border: `2px solid ${color}`,
        marginRight: 10,
    }

    const handleClose = () => {
        setActiveAlertData([])
        setShowAlertContent(false)
    }

    return <div className='wg-main-card txt-center' style={style}>

        <div className='wg-alert-content txt-left'>

            {showAllAlertsInfo()}

            <div 
                style={button_style}
                className="wg-btn txt-center" 
                onClick={() => handleClose()}>
                DONE
            </div>

        </div>

    </div>
}

export default AlertContent