import { getAirports, getRegionById } from '../services/getRequests';
import { useEffect, useMemo, useState } from 'react';
import { AccordionTitle } from './AccordionTitle';

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
         console.log(grouped);
      } catch (error) {
         console.error('Error fetching airports:', error);
      }
   };

   const getARegion = async (id) => {
      try {
         const response = await getRegionById(id);
         return response.name;
      } catch (error) {
         console.error('Error fetching region:', error);
         return 'Unknown Region';
      }
   };

   const groupByRegion = async (data) => {
      const regionMap = {};

      const promises = data.map(async (airport) => {
         const { department, city, type } = airport;
         const departmentName = department?.name;
         const regionId = department?.regionId;
         const cityName = city?.name;
         const regionName = await getARegion(regionId);

         if (!regionMap[regionName]) {
            regionMap[regionName] = { departments: {} };
         }

         if (!regionMap[regionName].departments[departmentName]) {
            regionMap[regionName].departments[departmentName] = { cities: {} };
         }

         if (
            !regionMap[regionName].departments[departmentName].cities[cityName]
         ) {
            regionMap[regionName].departments[departmentName].cities[cityName] =
               {
                  types: {},
               };
         }

         if (
            !regionMap[regionName].departments[departmentName].cities[cityName]
               .types[type]
         ) {
            regionMap[regionName].departments[departmentName].cities[
               cityName
            ].types[type] = {
               airports: [],
               count: 0,
            };
         }

         const typeData =
            regionMap[regionName].departments[departmentName].cities[cityName]
               .types[type];
         typeData.airports.push(airport);
         typeData.count += 1;
      });

      await Promise.all(promises);

      return regionMap;
   };

   const displayData = useMemo(() => {
      return Object.keys(groupedData).map((region) => {
         const departments = Object.keys(groupedData[region].departments).map(
            (department) => {
               const cities = Object.keys(
                  groupedData[region].departments[department].cities
               ).map((city) => {
                  const types = Object.keys(
                     groupedData[region].departments[department].cities[city]
                        .types
                  ).map((type) => {
                     const typeData =
                        groupedData[region].departments[department].cities[city]
                           .types[type];
                     return {
                        type,
                        airports: typeData.airports,
                        count: typeData.count,
                     };
                  });

                  return {
                     city,
                     types,
                  };
               });

               return {
                  department,
                  cities,
               };
            }
         );

         return {
            region,
            departments,
         };
      });
   }, [groupedData]);

   return (
      <div>
         <h2>Airports by Region</h2>
         {displayData && displayData.length > 0 ? (
            displayData.map((item) => (
               <div key={item.region}>
                  <AccordionTitle>
                     <h3>{item.region}</h3>
                  </AccordionTitle>
                  {item.departments.map((department) => (
                     <div key={department.department}>
                        <h4>{department.department}</h4>
                        {department.cities.map((city) => (
                           <div key={city.city}>
                              <h5>{city.city}</h5>
                              <ul className="accordion-content">
                                 {city.types.map((type) => (
                                    <li key={type.type}>
                                       <strong>Type:</strong> {type.type} <br />
                                       <strong>Count:</strong> {type.count}
                                       <ul>
                                          {type.airports.map((airport) => (
                                             <li
                                                key={airport.id}
                                                className="capitalized"
                                             >
                                                {airport.name}
                                             </li>
                                          ))}
                                       </ul>
                                    </li>
                                 ))}
                              </ul>
                           </div>
                        ))}
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
