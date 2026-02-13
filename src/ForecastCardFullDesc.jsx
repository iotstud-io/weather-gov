import React from 'react'

const ForecastCardFullDesc = ({ desc, setShowFullDesc, style, theme, title }) => {

    const button_style = { 
        cursor: 'pointer', 
        borderRadius: '100vh', 
        border: `2px solid ${theme.palette.background.default}`, 
        padding: '6px 30px 9px 30px', 
        width: 'fit-content', 
        margin: '4px auto 0 auto',
        textAlign: 'center',
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
        className='txt-left' 
        style={cardStyle} 
        onClick={() => handleHide()}>

        <div style={{ width: '245px', height: '100%', overflowY: 'auto' }}>

            <h3 className='txt-center'>{title}</h3>

            <div className='txt-left' style={{ fontSize: 18 }}>{desc}</div>

            <div style={button_style}>
                DONE
            </div>

        </div>
    </div>
}

export default ForecastCardFullDesc