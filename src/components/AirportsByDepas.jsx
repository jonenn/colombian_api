import { getAirports } from '../services/getRequests';
import { useEffect, useState } from 'react';
import { AccordionTitle } from './AccordionTitle';

function AirportsByDepas() {
   const [groupedData, setGroupedData] = useState([]);
   const [initialData, setInitialData] = useState([]);
   const [expanded, setExpanded] = useState(null);
   const [measuredTime, setMeasuredTime] = useState(0);

   useEffect(() => {
      getAllAirports();
   }, []);

   const getAllAirports = async () => {
      try {
         const start = new Date();
         const response = await getAirports();
         const end = new Date();
         const time = (end - start) / 1000;
         console.log(time);
         setMeasuredTime(time);
         setInitialData(response);
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
         count: data[departmentName].count,
         cities: Object.keys(data[departmentName].cities).map((cityName) => ({
            cityName,
            cityCount: data[departmentName].cities[cityName].count,
            airports: data[departmentName].cities[cityName].airports,
         })),
      }));
   };

   const sortedData = groupedData && displayData(groupedData);

   const toggleAccordion = (region) => {
      setExpanded(expanded === region ? null : region);
   };

   return (
      <div>
         <div className="main-title">
            <h2>Airports by Department & City {`(${initialData.length})`}</h2>
            <p>{measuredTime} sec</p>{' '}
         </div>
         {sortedData ? (
            sortedData.map((item) => (
               <div key={item.department}>
                  <AccordionTitle
                     onClick={() => toggleAccordion(item.department)}
                     style={{
                        borderRadius:
                           expanded === item.department ? '' : '.3rem',
                     }}
                     expanded={expanded === item.department}
                  >
                     <h3>
                        {item.department}
                        {` (${item.count})`}
                     </h3>
                  </AccordionTitle>
                  {item.cities.map((city) => (
                     <div
                        key={city.cityName}
                        className="accordion-content col"
                        style={{
                           display:
                              expanded === item.department ? 'block' : 'none',
                        }}
                     >
                        <h4>{city.cityName}</h4>
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

export { AirportsByDepas };
