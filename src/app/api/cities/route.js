import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const cityName = searchParams.get('city');
  const teamName = searchParams.get('team');
  const dataType = searchParams.get('type'); 

  console.log("API called with params:", { cityName, teamName, dataType });

  const citiesDir = path.join(process.cwd(), 'src', 'data', 'cities');

  try {
    if (cityName && teamName && dataType) {
      // Fetch specific data for a team
      if (!['attractions', 'restaurants', 'hotels', 'info'].includes(dataType)) {
        return NextResponse.json({ error: 'Invalid data type' }, { status: 400 });
      }

      const dataPath = path.join(citiesDir, cityName.toLowerCase(), teamName.toLowerCase(), `${dataType}.json`);
      console.log("Looking for data file:", dataPath);
      
      const fileContents = await fs.readFile(dataPath, 'utf8');
      const data = JSON.parse(fileContents);
      console.log(`${dataType} data found for ${teamName}`);
      return NextResponse.json(data);
    } else if (cityName) {
      // Fetch data for a specific city
      const citiesPath = path.join(citiesDir, 'cities.json');
      console.log("Looking for cities file:", citiesPath);
      
      const citiesFileContents = await fs.readFile(citiesPath, 'utf8');
      const citiesData = JSON.parse(citiesFileContents);
      const cityData = citiesData.cities.find(city => city.name.toLowerCase() === cityName.toLowerCase());
      
      if (cityData) {
        console.log("City data found:", cityData);
        return NextResponse.json(cityData);
      } else {
        console.log("City not found in cities.json");
        return NextResponse.json({ error: 'City not found' }, { status: 404 });
      }
    } else {
      // List all cities
      const citiesPath = path.join(citiesDir, 'cities.json');
      console.log("Looking for cities file:", citiesPath);
      
      const fileContents = await fs.readFile(citiesPath, 'utf8');
      const citiesData = JSON.parse(fileContents);
      console.log("Cities data found");
      return NextResponse.json(citiesData);
    }
  } catch (err) {
    console.error("Error processing request:", err);
    if (err.code === 'ENOENT') {
      return NextResponse.json({ error: 'Requested data not found' }, { status: 404 });
    }
    return NextResponse.json({ error: `Error processing request: ${err.message}` }, { status: 500 });
  }
}