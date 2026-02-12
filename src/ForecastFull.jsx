import { useRef } from "react"
import { degToCompass, kmhToMph, GetSvg} from './Functions'
import Forecasts from './Forecasts'

const CARD_SIZE = 275
const CARD_GAP = 16
const SCROLL_STEP = CARD_SIZE + CARD_GAP
const SCROLLBAR_CLIP_SIZE = 24

let root_style = {
    width: "100%",
    height: 'auto',
    display: "flex",
    alignItems: "stretch",
    overflow: "hidden",
    padding: '15px 20px',
    border: '1px solid transparent',
    borderRadius: '10px',
}

let mainCardStyle = {
    width: CARD_SIZE,
    minWidth: CARD_SIZE,
    height: 250,
    borderRadius: 30,
    borderShape: 'squircle',
    textAlign: "center",
    padding: "15px",
}

let arrowButtonStyle = {
    width: 36,
    minWidth: 36,
    height: 36,
    borderRadius: 9999,
    borderColor: "transparent",
    fontSize: 18,
    lineHeight: 1,
    cursor: "pointer",
}

const carouselContainerStyle = {
    flex: "1 1 auto",
    minWidth: 0,
    display: "flex",
    alignItems: "center",
    gap: "10px",
}

const carouselViewportStyle = {
    flex: "1 1 auto",
    minWidth: 0,
    overflow: "hidden",
}

const carouselScrollerStyle = {
    overflowX: "auto",
    overflowY: "hidden",
    scrollBehavior: "smooth",
    scrollSnapType: "x mandatory",
    WebkitOverflowScrolling: "touch",
    scrollbarWidth: "none",
    msOverflowStyle: "none",
    paddingBottom: SCROLLBAR_CLIP_SIZE,
    marginBottom: -SCROLLBAR_CLIP_SIZE,
}

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

const carouselTrackStyle = {
    display: "flex",
    gap: `${CARD_GAP}px`,
}

const c_to_f = c => (c * 9 / 5) + 32
const f_to_c = f => (f - 32) * 5 / 9

const tempColor = (t, u, th) => (
    f => {
        const colors = [
            th.palette.tertiary.dark,
            th.palette.tertiary.main,
            th.palette.info.main,
            th.palette.info.light,
            th.palette.success.light,
            th.palette.success.main,
            th.palette.warning.light,
            th.palette.error.light,
            th.palette.error.main
        ]

        if(f <= 0) return colors[0]
        if(f <= 16) return colors[1]
        if(f <= 32) return colors[2]
        if(f <= 55) return colors[3]
        if(f <= 65) return colors[4]
        if(f <= 80) return colors[5]
        if(f <= 90) return colors[6]
        if(f <= 100) return colors[7]
        if(f >= 101) return colors[8]
    }
)(u === 'f' ? t : (t * 9 / 5 + 32))

const ForecastFull = ({ settings, theme, weather_forecast, weather_observations }) => {

    console.log("ForecastFull", weather_forecast, weather_observations)
    
    let format = 'f'

    if(settings?.temperature_format === 'c') {
        format = 'c'
    }

    const latest_observation = Array.isArray(weather_observations) && weather_observations[0] ? weather_observations[0]: {}
    const latest_forecast = Array.isArray(weather_forecast) && weather_forecast[0] ? weather_forecast[0]: {}
    const today = latest_observation?.startTime?.slice(0, 10) || []
    const todays = Array.isArray(weather_forecast) ? weather_forecast.filter(p => p.startTime.startsWith(today)): []
    const day = todays.find(p => p.isDaytime) || {}
    const night = todays.find(p => !p.isDaytime) || {}
    const t = weather_observations?.find(o => o?.properties?.temperature?.value != null)?.properties?.temperature?.value || null
    const t_formatted = !t ? '--': format === 'f' ? Math.round(c_to_f(t)): Math.round(t)
    const todayName = new Date().toLocaleDateString(undefined, { weekday: 'long' })
    const tcolor = tempColor(t, 'c', theme)
    const current_humidity = weather_observations?.find(o => o?.properties?.relativeHumidity?.value != null)?.properties?.relativeHumidity?.value || null
    const current_wind_speed = weather_observations?.find(o => o?.properties?.windSpeed?.value != null)?.properties?.windSpeed?.value || null
    const current_wind_direction = weather_observations?.find(o => o?.properties?.windDirection?.value != null)?.properties?.windDirection?.value || null
    const current_wind_gust = weather_observations?.find(o => o?.properties?.windGust?.value != null)?.properties?.windGust?.value || null

    const scrollerRef = useRef(null)

    root_style = {
        ...root_style,
        boxShadow: `2px 2px 2px ${theme.palette.background.shadow}`,
        background:
            `linear-gradient(${theme.palette.background.default}, ${theme.palette.background.default}) padding-box,
             linear-gradient(135deg, ${theme.palette.background.paper}, ${theme.palette.background.shadow}) border-box`
    }

    mainCardStyle = {
        ...mainCardStyle,
        backgroundColor: theme.palette.background.paper
    }

    arrowButtonStyle = {
        ...arrowButtonStyle,
        background: theme.palette.background.paper,
        color: theme.palette.text.primary,
    }

    const instanceTempStyle = { 
        ...temp_style, 
        textShadow: `2px 2px 2px ${theme.palette.background.shadow}`,
        outline: `3px solid ${tcolor}`,
        backgroundColor: theme.palette.background.paper,
    }

    const handleShift = direction => {

        const scroller = scrollerRef.current

        if (!scroller) {
            return
        }

        scroller.scrollBy({
            left: direction * SCROLL_STEP,
            behavior: "smooth",
        })
    }

    return <div style={root_style}>

        <div style={{...mainCardStyle, marginRight: 10}}>

            <div className='flx justify-between align-center gap10' style={{ width: '100%' }}>

                <div style={instanceTempStyle}>
                    {t_formatted}°{format.toUpperCase()}
                </div>

                <div>
                    <h2 className='txt-center'>{todayName}</h2>
                    <div className='txt-center' style={{ fontSize: 22 }}>
                        {day.temperature || '--'}° / {night.temperature || '--'}°
                    </div>
                </div>

            </div>

            <div className='flx justify-center align-center'  style={{ margin: '18px 0 0 0', gap: 16 }}>

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

            <div className='flx justify-left align-center txt-left gap10' style={{ margin: '15px 0 0 0' }}>
                
                {latest_forecast?.shortForecast &&
                <div style={{flexShrink: 0 }}>
                    {GetSvg(60, 60, latest_forecast.shortForecast)}
                </div>}

                <div style={{ fontSize: 15}}>
                    {latest_forecast?.detailedForecast || ''}
                </div>

            </div>

        </div>

        <div style={carouselContainerStyle}>

            <button
                type="button"
                style={arrowButtonStyle}
                onClick={() => handleShift(-1)}
                aria-label="Scroll forecast left"
            >
                &#8249;
            </button>

            <div style={carouselViewportStyle} aria-label="Forecast carousel">

                <div ref={scrollerRef} style={carouselScrollerStyle}>

                    <div style={carouselTrackStyle}>

                        <Forecasts forecasts={weather_forecast} theme={theme} />

                    </div>

                </div>
            </div>

            <button
                type="button"
                style={arrowButtonStyle}
                onClick={() => handleShift(1)}
                aria-label="Scroll forecast right"
            >
                &#8250;
            </button>

        </div>
    </div>
}

export default ForecastFull
