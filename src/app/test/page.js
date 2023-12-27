"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router'; // Change 'next/navigation' to 'next/router'
import Head from 'next/head'; // Add import for next/head
import PlanetInfo from '@/components/PlanetInfo';

export default function Test() { // Use uppercase for component names

  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    const query = e.target.value;
    fetchLocationSuggestions(query);
    setSearchQuery(query);
  };

  async function fetchLocationSuggestions(query) {
    const apiKey = 'a34969ab63msh80603a7461d690fp1fd996jsnc14960cb03f9'; // Replace with your RapidAPI key
    const apiUrl = `https://lasoo-location-service.p.rapidapi.com/location/${query}/clientkey/iphone`;

    try {
      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': apiKey,
          'X-RapidAPI-Host': 'lasoo-location-service.p.rapidapi.com',
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Location suggestions:', data);
        // Handle the suggestions as needed
      } else {
        console.error('Error fetching location suggestions:', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }

  return (
    <>
      <Head>
        <title>Your Page Title</title>
        {/* Add other meta tags or stylesheets if needed */}
      </Head>
      <section className="search-packages section-padding">
        <div>
          <label htmlFor="locationInput">Enter your address:</label>
          <input
            type="text"
            id="locationInput"
            value={searchQuery}
            onChange={handleSearch}
          />
          <p>You entered: {searchQuery}</p>
        </div>
      </section>
      <div>
        <h1>My Next.js App</h1>
        <PlanetInfo />
      </div>
    </>
  );
}