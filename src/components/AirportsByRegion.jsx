import { getAirports, getRegionById } from '../services/getRequests';
import { useEffect, useMemo, useState } from 'react';
import { AccordionTitle } from './AccordionTitle';

function AirportsByRegion() {
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
                  count: 0,
               };
         }

         if (
            !regionMap[regionName].departments[departmentName].cities[cityName]
               .types[type]
         ) {
            regionMap[regionName].departments[departmentName].cities[
               cityName
            ].types[type] = {
               count: 0,
            };
         }

         const typeData =
            regionMap[regionName].departments[departmentName].cities[cityName]
               .types[type];
         typeData.count += 1;
         regionMap[regionName].departments[departmentName].cities[
            cityName
         ].count += 1;
         regionMap[regionName].departments[departmentName].count =
            (regionMap[regionName].departments[departmentName].count || 0) + 1;
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
                        count: typeData.count,
                     };
                  });

                  return {
                     city,
                     count: groupedData[region].departments[department].cities[
                        city
                     ].count,
                     types,
                  };
               });

               return {
                  department,
                  count: groupedData[region].departments[department].count,
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

   const toggleAccordion = (region) => {
      setExpanded(expanded === region ? null : region);
   };

   return (
      <div>
         <div className="main-title">
            <h2>Airports by Region {`(${initialData.length})`}</h2>
            <p>{measuredTime} sec</p>{' '}
         </div>
         {displayData && displayData.length > 0 ? (
            displayData.map((item) => (
               <div key={item.region}>
                  <AccordionTitle
                     onClick={() => toggleAccordion(item.region)}
                     style={{
                        borderRadius: expanded === item.region ? '' : '.3rem',
                     }}
                     expanded={expanded === item.region}
                  >
                     <h3>
                        {item.region}
                        {` (${Object.values(item.departments).reduce(
                           (acc, dept) => acc + dept.count,
                           0
                        )})`}
                     </h3>
                  </AccordionTitle>
                  {item.departments.map((department) => (
                     <div
                        key={department.department}
                        className="accordion-content"
                        style={{
                           display: expanded === item.region ? 'block' : 'none',
                        }}
                     >
                        <h4>{department.department}</h4>
                        {department.cities.map((city) => (
                           <div key={city.city}>
                              <h5>{city.city}</h5>
                              <ul>
                                 {city.types.map((type) => (
                                    <li className="li--region" key={type.type}>
                                       <strong>Type:</strong> {type.type} <br />
                                       <strong>Qty:</strong> {type.count}
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
