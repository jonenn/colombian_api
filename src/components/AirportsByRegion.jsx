import { getAirports, getRegionById } from '../services/getRequests';
import { useEffect, useState } from 'react';
import { AccordionTitle } from './AccordionTitle';

function AirportsByRegion() {
   const [groupedData, setGroupedData] = useState({});
   const [initialData, setInitialData] = useState([]);
   const [expanded, setExpanded] = useState(null);
   const [measuredTime, setMeasuredTime] = useState(0);
   const [copyVerified, setCopyVerified] = useState(false);

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
            regionMap[regionName] = { departamento: {} };
         }

         if (!regionMap[regionName].departamento[departmentName]) {
            regionMap[regionName].departamento[departmentName] = { ciudad: {} };
         }

         if (
            !regionMap[regionName].departamento[departmentName].ciudad[cityName]
         ) {
            regionMap[regionName].departamento[departmentName].ciudad[
               cityName
            ] = { tipo: {} };
         }

         if (
            !regionMap[regionName].departamento[departmentName].ciudad[cityName]
               .tipo[type]
         ) {
            regionMap[regionName].departamento[departmentName].ciudad[
               cityName
            ].tipo[type] = 0;
         }

         regionMap[regionName].departamento[departmentName].ciudad[
            cityName
         ].tipo[type] += 1;
      });

      await Promise.all(promises);

      return regionMap;
   };

   const toggleAccordion = (region) => {
      setExpanded(expanded === region ? null : region);
   };

   const calculateTotalCount = (regionData) => {
      return Object.values(regionData.departamento).reduce(
         (deptAcc, dept) =>
            deptAcc +
            Object.values(dept.ciudad).reduce(
               (cityAcc, city) =>
                  cityAcc +
                  Object.values(city.tipo).reduce(
                     (tipoAcc, count) => tipoAcc + count,
                     0
                  ),
               0
            ),
         0
      );
   };

   const copyToClipboard = () => {
      try {
         const dataWithRegionKey = { region: groupedData };
         const dataString = JSON.stringify(dataWithRegionKey, null, 2);
         navigator.clipboard.writeText(dataString);
         setCopyVerified(true);
      } catch (error) {
         console.error('Failed to copy data to clipboard:', error);
      }
   };

   return (
      <div>
         <div className="main-title">
            <h2>Airports by Region {`(${initialData.length})`}</h2>
            {Object.keys(groupedData).length > 0 && (
               <button
                  onClick={copyToClipboard}
                  style={{
                     backgroundColor: copyVerified
                        ? '#A7CFCC'
                        : 'rgba(37, 64, 97, 0.6)',
                     transition: 'background-color 600ms ease-out',
                     outline: 'none',
                     fontSize: '.81rem',
                  }}
               >
                  Copy to Clipboard
               </button>
            )}
            <p>{measuredTime} sec</p>
         </div>
         {/* <div>{JSON.stringify(groupedData)}</div> */}
         {Object.keys(groupedData).length > 0 ? (
            Object.entries(groupedData).map(([region, regionData]) => (
               <div key={region}>
                  <AccordionTitle
                     onClick={() => toggleAccordion(region)}
                     style={{
                        borderRadius: expanded === region ? '' : '.3rem',
                     }}
                     expanded={expanded === region}
                  >
                     <h3>
                        {region}
                        {` (${calculateTotalCount(regionData)})`}
                     </h3>
                  </AccordionTitle>
                  {Object.entries(regionData.departamento).map(
                     ([departmentName, department]) => (
                        <div
                           key={departmentName}
                           className="accordion-content"
                           style={{
                              display: expanded === region ? 'block' : 'none',
                           }}
                        >
                           <h4>{departmentName}</h4>
                           {Object.entries(department.ciudad).map(
                              ([cityName, city]) => (
                                 <div key={cityName}>
                                    <h5>{cityName}</h5>
                                    <ul>
                                       {Object.entries(city.tipo).map(
                                          ([tipo, count]) => (
                                             <li
                                                className="li--region"
                                                key={tipo}
                                             >
                                                <strong>Type:</strong> {tipo}{' '}
                                                <br />
                                                <strong>Qty:</strong> {count}
                                             </li>
                                          )
                                       )}
                                    </ul>
                                 </div>
                              )
                           )}
                        </div>
                     )
                  )}
               </div>
            ))
         ) : (
            <p>Loading...</p>
         )}
      </div>
   );
}

export { AirportsByRegion };
