import React from 'react'

const AlertContent = ({
    alerts=[], 
    color, 
    mainCardStyle, 
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
        cursor: 'pointer', 
        borderRadius: '100vh', 
        border: `2px solid ${color}`, 
        padding: '8px 30px 11px 30px', 
        width: 'fit-content', 
        margin: '12px auto 0 auto' 
    }

    mainCardStyle = {
        ...mainCardStyle,
        border: `2px solid ${color}`,
        marginRight: 10,
    }

    const handleClose = () => {
        setActiveAlertData([])
        setShowAlertContent(false)
    }

    return <div style={mainCardStyle}>

        <div className="txt-left" style={{ width: '245px', height: '100%', overflowY: 'auto', padding: '0 4px 4px 4px'}}>

            {showAllAlertsInfo()}

            <div 
                style={button_style}
                className="txt-center" 
                onClick={() => handleClose()}>
                DONE
            </div>

        </div>

    </div>
}

export default AlertContent