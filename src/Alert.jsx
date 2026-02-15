import React from 'react'

const Alert = ({
    alerts, 
    color, 
    title, 
    total, 
    theme, 
    setActiveAlertData,
    setAlertColor, 
    setShowAlertContent
}) => {

    const style = {
        backgroundColor: color, 
        color: theme.palette.background.default,
        border: `6px solid ${theme.palette.background.default}`,
    }

    const handleClick = () => {
        setActiveAlertData(alerts)
        setShowAlertContent(true)
        setAlertColor(color)
    }

    return <div 
        onClick={() => handleClick()} 
        title={title} 
        className='wg-alert-btn' 
        style={style}>
        {total}
    </div>
}

export default Alert