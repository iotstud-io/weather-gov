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
        cursor: 'pointer',
        backgroundColor: color, 
        width: 20,
        height: 20,
        fontSize: 17,
        fontWeight: 900,
        margin: '0',
        verticalAlign: 'middle',
        color: theme.palette.background.default,
        borderRadius: '50%',
        padding: 2,
        border: `6px solid ${theme.palette.background.default}`,
        boxSizing: 'content-box',
        lineHeight: '19px',
    }

    const handleClick = () => {
        setActiveAlertData(alerts)
        setShowAlertContent(true)
        setAlertColor(color)
    }

    return <div 
        onClick={() => handleClick()} 
        title={title} 
        className="circ" 
        style={style}>
        {total}
    </div>
}

export default Alert