# Weather.gov Dashboard Component

This component renders weather data in IoT Studio using the `api.weather.gov` public API device.

To work correctly, the paired IoT Studio variable profile must include:

- `office_id`
- `grid_x`
- `grid_y`
- `station_id`
- `zone_id`

These values are location-specific.

## Build A Full Location Variable Profile

### 1) Get latitude/longitude for your location

Use any source that gives decimal coordinates, for example:

- https://www.google.com/maps
- https://www.openstreetmap.org

Example format: `39.7456,-97.0892` (latitude,longitude).

### 2) Open the Weather.gov `points` endpoint

Visit:

`https://api.weather.gov/points/{latitude},{longitude}`

Example:

`https://api.weather.gov/points/39.7456,-97.0892`

From the JSON response, copy:

- `properties.gridId` -> `office_id`
- `properties.gridX` -> `grid_x`
- `properties.gridY` -> `grid_y`
- `properties.forecastZone` -> contains `zone_id` (last path segment)
- `properties.observationStations` -> URL used to find `station_id`

### 3) Get `zone_id`

From `properties.forecastZone`, use the last segment of the URL.

Example:

- `forecastZone`: `https://api.weather.gov/zones/forecast/KSZ009`
- `zone_id`: `KSZ009`

You can open the URL directly to confirm:

`https://api.weather.gov/zones/forecast/{zone_id}`

### 4) Get the closest `station_id`

Open the URL from `properties.observationStations`, or use:

`https://api.weather.gov/gridpoints/{office_id}/{grid_x},{grid_y}/stations`

This response includes nearby stations. Use the first station (typically the closest).

Take the ID from either:

- `features[0].properties.stationIdentifier`
- or the last segment of `features[0].id` (for example `https://api.weather.gov/stations/KMYZ` -> `KMYZ`)

### 5) Create the IoT Studio variable profile

Use the values you found:

- `office_id`: from `gridId`
- `grid_x`: from `gridX`
- `grid_y`: from `gridY`
- `station_id`: from stations list
- `zone_id`: from `forecastZone`

Once this profile is saved, it can be selected as the location context when pairing the Weather.gov device with this dashboard component.

## API Reference

- Weather.gov Web API docs: https://www.weather.gov/documentation/services-web-api
- Points endpoint: https://api.weather.gov/points/{latitude},{longitude}
- Gridpoint stations endpoint: https://api.weather.gov/gridpoints/{office_id}/{grid_x},{grid_y}/stations
- Forecast zone endpoint: https://api.weather.gov/zones/forecast/{zone_id}
