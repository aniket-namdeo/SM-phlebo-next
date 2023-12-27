// PlanetInfo.js

import { useEffect, useState } from 'react';
import axios from 'axios';

const PlanetInfo = () => {
  const [planetData, setPlanetData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const options = {
        method: 'GET',
        url: 'https://planets-info-by-newbapi.p.rapidapi.com/api/v1/planets/',
        headers: {
          'X-RapidAPI-Key': 'a34969ab63msh80603a7461d690fp1fd996jsnc14960cb03f9',
          'X-RapidAPI-Host': 'planets-info-by-newbapi.p.rapidapi.com',
        },
      };

      try {
        const response = await axios.request(options);
        setPlanetData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures the effect runs once after the initial render

  return (
    <div>
      <h1>Planet Information</h1>
      {planetData ? (
        <ul>
          {planetData.map((planet) => (
            <li key={planet.id}>{planet.name}</li>
          ))}
        </ul>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default PlanetInfo;
