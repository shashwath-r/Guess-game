// To inform next js, this is a client component
"use client";

import { useEffect, useState } from "react";

const HomePage = () => {
  const [name, setName] = useState("");
  const [userData, setUserData] = useState([]);
  const [isDataFetched, setIsDataFetched] = useState(false);
  const [country, setCountry] = useState("");
  const [errorData, setErrorData] = useState("");

  const retrievalKeys = ["age", "gender", "country"];

  const handleClick = (data) => {
    setName(data);
    setIsDataFetched(false);
    setErrorData("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setUserData("");
    setCountry("");
    const apiUrlList = [
      `https://api.agify.io?name=${name}`,
      `https://api.genderize.io?name=${name}`,
      `https://api.nationalize.io?name=${name}`,
    ];

    const dataFetch = apiUrlList.map((url) =>
      fetch(url).then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
    );
    Promise.all(dataFetch)
      .then((responses) => {
        const filteredData = responses.map((obj) =>
          retrievalKeys.reduce((acc, key) => {
            if (obj.hasOwnProperty(key)) {
              acc[key] = obj[key];
            }
            return acc;
          }, {})
        );
        const combinedObject = Object.assign({}, ...filteredData);
        setUserData(combinedObject);
        getCountry(combinedObject.country);
        console.log(combinedObject);
      })
      .catch((e) => {
        console.error("Error while fetching userData:", e);
        setErrorData(e.message);
      });
  };

  const getCountry = (data) => {
    let maxProbability = -1;
    let maxProbabilityCountry = null;

    data.forEach((country) => {
      if (country.probability > maxProbability) {
        maxProbability = country.probability;
        maxProbabilityCountry = country;
      }
    });

    fetch(
      `https://restcountries.com/v2/alpha/${maxProbabilityCountry.country_id}`
    )
      .then((response) => response.json())
      .then((countryData) => {
        setCountry(countryData.name);
        setIsDataFetched(true);
      })
      .catch((e) => {
        console.error("Error while fetching userData:", e);
      });
  };
  return (
    <div className="container w-full m-auto p-4 flex flex-col gap-5 ">
      <form
        className="flex flex-col gap-5 md:w-2/4 w-full m-auto border rounded border-gray-400 py-1 px-2 shadow-3xl"
        onSubmit={handleSubmit}
      >
        <h2 className="text-3xl text-gray-800 font-bold text-center">
          Guess Game
        </h2>
        <label className="text-gray-700 text-sm font-bold">
          Enter a Name
          <input
            type="text"
            className="border rounded border-gray-400 w-full py-1 px-2 font-normal"
            onChange={(e) => handleClick(e.target.value)}
          />
        </label>
        <span className="flex flex-col m-auto">
          <button
            type="submit"
            className="bg-emerald-700 text-white px-3 py-1 font-bold hover:bg-emerald-500 text-xl"
          >
            Guess It
          </button>
        </span>
      </form>
      <div>
        {isDataFetched ? (
          <div className="flex flex-col gap-5 md:w-2/4 w-full m-auto border rounded border-gray-400 py-1 px-2 shadow-3xl">
            <ul>
              <li>Age: {userData.age}</li>
              <li>Gender: {userData.gender}</li>
              <li>Country: {country}</li>
            </ul>
          </div>
        ) : !isDataFetched && errorData ? (
          <div className="flex flex-col gap-5 md:w-2/4 w-full m-auto border rounded border-gray-400 py-1 px-2 shadow-3xl text-red-500">
            {errorData}
          </div>
        ) : (
          <div className="flex flex-col gap-5 md:w-2/4 w-full m-auto border rounded border-gray-400 py-1 px-2 shadow-3xl">
            Click the button to guess the Age, Gender and Nationality
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
