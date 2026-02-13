import React from 'react'

import { GetSvg } from './Functions'

const FullDesc = ({ desc, mainCardStyle, setShowFullDesc, theme }) => {

    mainCardStyle = {
        ...mainCardStyle,
        border: `2px solid ${theme.palette.background.paper}`,
        marginRight: 10,
        fontSize: 16,
        textAlign: 'left',
    }

    const button_style = { 
        cursor: 'pointer', 
        borderRadius: '100vh', 
        border: `2px solid ${theme.palette.background.paper}`, 
        padding: '8px 30px 11px 30px', 
        width: 'fit-content', 
        margin: '12px auto 0 auto',
        textAlign: 'center',
    }

    const handleHide = () => {
        setShowFullDesc({hide: true, desc: ''})
    }

    return <div className='txt-left' style={mainCardStyle} onClick={() =>handleHide()}>
        
        {desc}

        <div style={button_style} onClick={() => handleHide()}>
            DONE
        </div>

    </div>
}

export default FullDesc