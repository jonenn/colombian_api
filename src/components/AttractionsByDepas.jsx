import { getAttractionById, getAttractions } from '../services/getRequests';
import { useEffect, useMemo, useState } from 'react';
import { AccordionTitle } from './AccordionTitle';

function AttractionsByDepas() {
   const [groupedData, setGroupedData] = useState([]);
   const [initialData, setInitialData] = useState([]);
   const [expanded, setExpanded] = useState(null);

   useEffect(() => {
      getAllAttractions();
   }, []);

   const getAllAttractions = async () => {
      try {
         const response = await getAttractions();
         setInitialData(response);
         const grouped = await groupByDepartment(response);
         setGroupedData(grouped);
      } catch (error) {
         console.error('Error fetching attractions:', error);
      }
   };

   const getAnAttraction = async (id) => {
      try {
         const response = await getAttractionById(id);
         return response.name;
      } catch (error) {
         console.error('Error fetching department:', error);
         return 'Unknown Department';
      }
   };

   const groupByDepartment = async (data) => {
      const departmentMap = {};

      const promises = data.map(async (attraction) => {
         const departmentId = attraction.city.departmentId;
         const cityName = attraction.city.name;
         const departmentName = await getAnAttraction(departmentId);

         if (!departmentMap[departmentName]) {
            departmentMap[departmentName] = { cities: {} };
         }

         if (!departmentMap[departmentName].cities[cityName]) {
            departmentMap[departmentName].cities[cityName] = {
               attractions: [],
               count: 0,
            };
         }

         departmentMap[departmentName].cities[cityName].attractions.push(
            attraction
         );
         departmentMap[departmentName].cities[cityName].count += 1;
      });

      await Promise.all(promises);

      return departmentMap;
   };

   const displayData = useMemo(() => {
      return Object.keys(groupedData).map((department) => ({
         department,
         cities: Object.keys(groupedData[department].cities).map(
            (cityName) => ({
               cityName,
               ...groupedData[department].cities[cityName],
            })
         ),
      }));
   }, [groupedData]);

   const toggleAccordion = (department) => {
      setExpanded(expanded === department ? null : department);
   };

   return (
      <div>
         <h2>Attractions by Department & City {`(${initialData.length})`}</h2>
         {displayData.length > 0 ? (
            displayData.map((item) => (
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
                        {` (${
                           item &&
                           item.cities.reduce(
                              (acc, city) => acc + city.count,
                              0
                           )
                        })`}
                     </h3>
                  </AccordionTitle>
                  {item.cities.map((city) => (
                     <div
                        key={city.cityName}
                        className="accordion-content"
                        style={{
                           display:
                              expanded === item.department ? 'block' : 'none',
                        }}
                     >
                        <h4>{city.cityName}</h4>

                        <ul>
                           {city.attractions.map((attraction) => (
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

export { AttractionsByDepas };
