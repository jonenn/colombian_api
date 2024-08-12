import { getAirports } from '../services/getRequests';
import { useEffect, useState } from 'react';
import { AccordionTitle } from './AccordionTitle';

function AirportsByDepas() {
   const [groupedData, setGroupedData] = useState({});

   useEffect(() => {
      getAllAirports();
   }, []);

   const getAllAirports = async () => {
      try {
         const response = await getAirports();
         const grouped = await groupByDepartment(response);
         setGroupedData(grouped);
      } catch (error) {
         console.error('Error fetching airports:', error);
      }
   };

   const groupByDepartment = (data) => {
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
         <h2>Airports by Department & City</h2>
         {sortedData ? (
            sortedData.map((item) => (
               <div key={item.department}>
                  <AccordionTitle>
                     <h3>{item.department}</h3>
                  </AccordionTitle>
                  {item.cities.map((city) => (
                     <div key={city.cityName}>
                        <h4>{city.cityName}</h4>
                        <ul className="accordion-content">
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

export { AirportsByDepas };
