import { getAirports } from '../services/getRequests';
import { useEffect, useState } from 'react';

function AirportsByRegion() {
   const [groupedData, setGroupedData] = useState({});

   useEffect(() => {
      getAllAirports();
   }, []);

   const getAllAirports = async () => {
      try {
         const response = await getAirports();
         const grouped = await groupByRegion(response);
         setGroupedData(grouped);
      } catch (error) {
         console.error('Error fetching airports:', error);
      }
   };

   const groupByRegion = (data) => {
      return data.reduce((acc, airport) => {
         const departmentName = airport.department.name;
         const cityName = airport.city.name;

         if (!acc[departmentName]) {
            acc[departmentName] = { cities: {}, count: 0 };
         }

         if (!acc[departmentName].cities[cityName]) {
            acc[departmentName].cities[cityName] = {
               airports: [],
               count: 0,
            };
         }

         acc[departmentName].cities[cityName].airports.push(airport);
         acc[departmentName].cities[cityName].count += 1;
         acc[departmentName].count += 1;

         return acc;
      }, {});
   };

   const displayData = (data) => {
      return Object.keys(data).map((departmentName) => ({
         department: departmentName,
         departmentCount: data[departmentName].count,
         cities: Object.keys(data[departmentName].cities).map((cityName) => ({
            cityName,
            cityCount: data[departmentName].cities[cityName].count,
            airports: data[departmentName].cities[cityName].airports,
         })),
      }));
   };

   const sortedData = groupedData && displayData(groupedData);

   return (
      <div>
         <h1>Airports by Region</h1>
         {sortedData ? (
            sortedData.map((item) => (
               <div key={item.department}>
                  <h2>{item.department}</h2>
                  {item.cities.map((city) => (
                     <div key={city.cityName}>
                        <h3>{city.cityName}</h3>
                        <ul>
                           {city.airports.map((attraction) => (
                              <li key={attraction.id} className="capitalized">
                                 {attraction.name}
                              </li>
                           ))}
                        </ul>
                     </div>
                  ))}
               </div>
            ))
         ) : (
            <p>Loading...</p>
         )}
      </div>
   );
}

export { AirportsByRegion };
