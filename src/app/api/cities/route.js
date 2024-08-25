// src/app/api/cities/route.js
import fs from 'fs';
import path from 'path';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const cityName = searchParams.get('city');

  const citiesDir = path.join(process.cwd(), 'src', 'data', 'cities');

  if (cityName) {
    // Fetch data for a specific city
    const cityDir = path.join(citiesDir, cityName.toLowerCase());
    if (fs.existsSync(cityDir)) {
      try {
        const teams = fs.readdirSync(cityDir)
          .filter(file => file.endsWith('.json'))
          .map(file => {
            const filePath = path.join(cityDir, file);
            const fileContents = fs.readFileSync(filePath, 'utf8');
            console.log(`File contents for ${file}:`, fileContents); // Log file contents
            try {
              return JSON.parse(fileContents);
            } catch (parseError) {
              console.error(`Error parsing ${file}:`, parseError);
              return null;
            }
          })
          .filter(team => team !== null);

        return new Response(JSON.stringify({ name: cityName, teams }), {
          headers: { 'Content-Type': 'application/json' },
        });
      } catch (err) {
        console.error(`Error processing city ${cityName}:`, err);
        return new Response(JSON.stringify({ error: `Error processing city: ${err.message}` }), {
          status: 500,
          headers: { 'Content-Type': 'application/json' },
        });
      }
    } else {
      return new Response(JSON.stringify({ error: 'City not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }
  } else {
    // List all cities
    const citiesFile = path.join(citiesDir, 'cities.json');
    if (fs.existsSync(citiesFile)) {
      try {
        const fileContents = fs.readFileSync(citiesFile, 'utf8');
        console.log("Cities file contents:", fileContents); // Log file contents
        const cities = JSON.parse(fileContents);
        return new Response(JSON.stringify(cities), {
          headers: { 'Content-Type': 'application/json' },
        });
      } catch (err) {
        console.error("Error reading or parsing cities.json:", err);
        return new Response(JSON.stringify({ error: `Error processing cities: ${err.message}` }), {
          status: 500,
          headers: { 'Content-Type': 'application/json' },
        });
      }
    } else {
      return new Response(JSON.stringify({ error: 'Cities data not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }
  }
}