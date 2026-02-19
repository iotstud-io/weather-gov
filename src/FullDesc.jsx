import React from 'react'

const FullDesc = ({ desc, setShowFullDesc, theme }) => {

    const style = {
        border: `2px solid ${theme.palette.background.paper}`,
        marginRight: 10,
        paddingTop: 20,
        fontSize: 16,
    }

    const button_style = { 
        border: `2px solid ${theme.palette.background.paper}`, 
    }

    const handleHide = () => {
        setShowFullDesc({hide: true, desc: ''})
    }

    return <div className='txt-left wg-main-card' style={style} onClick={() =>handleHide()}>
        
        {desc}

        <div className='wg-btn' style={button_style} onClick={() => handleHide()}>
            DONE
        </div>

    </div>
}

export default FullDesc