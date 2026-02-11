import { useRef } from "react"

const FORECAST_CARD_COUNT = 7
const CARD_SIZE = 250
const CARD_GAP = 16
const SCROLL_STEP = CARD_SIZE + CARD_GAP
const SCROLLBAR_CLIP_SIZE = 24

const layoutStyle = {
    width: "100%",
    display: "flex",
    alignItems: "stretch",
    gap: "16px",
    overflow: "hidden",
}

const cardStyle = {
    width: CARD_SIZE,
    minWidth: CARD_SIZE,
    height: CARD_SIZE,
    border: "1px solid #d1d5db",
    borderRadius: 12,
    background: "#ffffff",
    boxSizing: "border-box",
    flex: "0 0 auto",
}

const carouselContainerStyle = {
    flex: "1 1 auto",
    minWidth: 0,
    display: "flex",
    alignItems: "center",
    gap: "8px",
}

const arrowButtonStyle = {
    width: 36,
    minWidth: 36,
    height: 36,
    borderRadius: 9999,
    border: "1px solid #d1d5db",
    background: "#ffffff",
    color: "#111827",
    fontSize: 18,
    lineHeight: 1,
    cursor: "pointer",
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

const carouselTrackStyle = {
    display: "flex",
    gap: `${CARD_GAP}px`,
}

const forecastCardStyle = {
    ...cardStyle,
    scrollSnapAlign: "start",
}

const ForecastFull = ({ weather_forecast, weather_observations }) => {

    const scrollerRef = useRef(null)

    console.log("ForecastFull", weather_forecast, weather_observations)

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

    return <div style={layoutStyle}>
        
        <div style={cardStyle} />

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
                        {Array.from({ length: FORECAST_CARD_COUNT }).map((_, index) => (
                            <div style={forecastCardStyle} key={index} />
                        ))}
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
