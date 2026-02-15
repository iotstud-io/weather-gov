import React from 'react'

const ForecastCardFullDesc = ({ desc, setShowFullDesc, style, theme, title }) => {

    const button_style = { 
        border: `2px solid ${theme.palette.background.default}`, 
    }

    const handleHide = () => {
        setShowFullDesc({hide: true, desc: ''})
    }

    const cardStyle = {
        ...style,
        cursor: 'pointer',
        border: `2px solid ${theme.palette.background.paper}`,
        padding: '8px 15px 15px 15px',
    }

    return <div 
        className='wg-forecasts-card txt-left' 
        style={cardStyle} 
        onClick={() => handleHide()}>

        <div className='wg-forecast-desc'>

            <h3 className='txt-center'>{title}</h3>

            <div className='txt-left' style={{ fontSize: 18 }}>{desc}</div>

            <div className='wg-btn' style={button_style}>
                DONE
            </div>

        </div>
    </div>
}

export default ForecastCardFullDesc