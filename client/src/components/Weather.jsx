function Weather(props) {
  const { weatherData, event } = props;

  return (
    <div className="flex flex-row flex-wrap justify-evenly mt-5 mb-10">
      <div className=" text-white border border-gray-700 bg-gray-700 rounded-lg w-80 p-5">
        <p>{event?.location?.city} Forecast:</p>
        {weatherData.length > 0
          ? 
          weatherData.map((day, idx) => (
              <div key={idx}>
                {new Date(day.dt * 1000).toLocaleDateString([], { weekday:"short", month: "short", day: "numeric"}) + " "}
                {day.weather[0].main + " "}
                {Math.round(day.temp.day)}&#176;F / {Math.round(day.temp.night)}&#176;F
              </div>
            ))
          : <p>"Weather Forecast Not Available"</p>}
      </div>
    </div>
  );
}

export default Weather;
