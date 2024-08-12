import { getAttractionById, getAttractions } from '../services/getRequests';
import { useEffect, useState } from 'react';

function AttractionsByDepas() {
   const [groupedData, setGroupedData] = useState({});

   useEffect(() => {
      getAllAttractions();
   }, []);

   const getAllAttractions = async () => {
      try {
         const response = await getAttractions();
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

   const displayData = (data) => {
      return Object.keys(data).map((department) => ({
         department,
         cities: Object.keys(data[department].cities).map((cityName) => ({
            cityName,
            ...data[department].cities[cityName],
         })),
      }));
   };

   const sortedData = groupedData ? displayData(groupedData) : [];

   return (
      <div>
         <h1>Attractions by Department & City</h1>
         {sortedData ? (
            sortedData.map((item) => (
               <div key={item.department}>
                  <h2>{item.department}</h2>
                  {item.cities.map((city) => (
                     <div key={city.cityName}>
                        <h3>{city.cityName}</h3>
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
