
import { useWeatherQuery, useForecastQuery } from "@/hooks/useWeather"
import { useSearchParams, useParams } from "react-router-dom"
import { AlertTriangle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import LoadingSkeleton from "@/components/LoadingSkeleton"
import CurrentWeather from "@/components/CurrentWeather"
import HourlyTemperature from "@/components/HourlyTemperature"
import WeatherDetails from "@/components/WeatherDetails"
import WeatherForecast from "@/components/WeatherForecast"
import FavouriteButton from "@/components/FavouriteButton"


const CityPage = () => {
  const [searchParams] = useSearchParams()
  const params = useParams()
  const lat = parseFloat(searchParams.get("lat") || "0")
  const lon = parseFloat(searchParams.get("lon") || "0")
  const coordinates = { lat, lon }

  const weatherQuery = useWeatherQuery(coordinates)
  const forecastQuery = useForecastQuery(coordinates)

  if (weatherQuery.error || forecastQuery.error) {
    return( 
      <Alert variant="destructive">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle> Error </AlertTitle>
        <AlertDescription className="flex flex-col gap-4">
          <p> Failed to load weather data. Please try again! </p>
        </AlertDescription>
      </Alert> 
    )
  }

  if (!weatherQuery.data || !forecastQuery.data || !params.cityName) {
    return <LoadingSkeleton />
  }

  return (
    <div className="space-y-4">
      {/* Favouriate cities */}
      <div className="flex items-center justify-between">
        <h1 className="text-4xl font-bold tracking-tight"> 
          {params.cityName}, {weatherQuery.data.sys.country } 
        </h1>
        <div>
          <FavouriteButton data={{...weatherQuery.data, name: params.cityName}} />
        </div>
      </div>
      
      {/* Current and hourly weather */}

      <div className="grid gap-6">
        <div className="flex flex-col gap-4">
          <CurrentWeather data={weatherQuery.data} />

          <HourlyTemperature
            data={forecastQuery.data}
          />

        </div>
        <div className="grid gap-6 md:grid-cols-2 items-start">
          {/* details */}

          <WeatherDetails data={weatherQuery.data}/>

          {/* forecast */}
          <WeatherForecast data={forecastQuery.data}/>
        </div>
      </div>
    </div>
  )
}

export default CityPage
