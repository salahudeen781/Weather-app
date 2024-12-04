"use client";
import axios from "axios";
import Image from "next/image";
import { BsSearch } from "react-icons/bs";
import { useState } from "react";
import Weather from "./components/Weather";
import Spinner from "./components/Spinner";

export default function Home() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState({});
  const [loading, setLoading] = useState(false);

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}`;
  //console.log(city);

  const fetchWeather = (e) => {
    e.preventDefault();
    setLoading(true);
    axios.get(url).then((response) => {
      setWeather(response.data);
      // console.log(response.data);
    });
    setCity("");
    setLoading(false);
  };

  if (loading) {
    return <Spinner />;
  } else {
    return (
      <div>
        {/*overlay ("API Key:", process.env.NEXT_WEATHER_APP);*/}
        <div className="absolute top-0 left-0 right-0 bottom-0 bg-black/50 z-[1]" />

        {/*Backgroundimage*/}
        <Image
          src="https://images.unsplash.com/photo-1561553873-e8491a564fd0?q=80&w=2147&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Unsplash Image"
          layout="fill"
          className="object-cover"
        />

        {/*search*/}
        <div className="relative flex justify-between items-center max-w-[500px]w-full m-auto p-6 text-white z-10">
          <form
            onSubmit={fetchWeather}
            className=" flex items-center justify-between w-full  m-auto p-3 bg-transparent border border-gray-300 text-white rounded-2xl "
          >
            <div>
              <input
                type="text"
                className="bg-transparent border-none text-white focus:outline-none"
                placeholder="Search City"
                onChange={(e) => setCity(e.target.value)}
              ></input>
            </div>
            <button onClick={fetchWeather}>
              <BsSearch size={20} />
            </button>
          </form>
        </div>

        {/* weather */}
        {weather.main && <Weather data={weather} />}
      </div>
    );
  }
}
