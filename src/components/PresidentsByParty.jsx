import { getPresidents } from '../services/getRequests';
import { useEffect, useState } from 'react';
import '../styles/Accordion.css';
import { AccordionTitle } from './AccordionTitle';

function PresidentsByParty() {
   const [sortedData, setSortedData] = useState({});

   useEffect(() => {
      getAllPresidents();
   }, []);

   const getAllPresidents = async () => {
      try {
         const response = await getPresidents();
         displayData(response);
      } catch (error) {
         console.error('Error fetching presidents:', error);
      }
   };

   const groupByParty = (data) => {
      return data.reduce((acc, president) => {
         const party = president.politicalParty.toLowerCase();
         if (!acc[party]) {
            acc[party] = [];
         }
         acc[party].push(president);
         return acc;
      }, {});
   };

   const countByParty = (data) => {
      console.log(data);
      return Object.keys(data).reduce((acc, party) => {
         acc[party] = data[party].length;
         return acc;
      }, {});
   };

   const sortByCount = (groupedData, countedData) => {
      console.log(groupedData);
      console.log(countedData);
      return Object.keys(groupedData)
         .map((party) => ({
            party,
            count: countedData[party],
            presidents: groupedData[party],
         }))
         .sort((a, b) => b.count - a.count);
   };

   const displayData = (data) => {
      const grouping = groupByParty(data);
      const counting = countByParty(grouping);
      const sorting = sortByCount(grouping, counting);
      setSortedData(sorting);
   };

   return (
      <>
         <h2>Presidents by Political Party</h2>
         {sortedData.length > 0 ? (
            sortedData.map((item) => (
               <div key={item.party}>
                  <AccordionTitle>
                     <h3 className="capitalized">{item.party}</h3>
                     <h3>Count</h3>
                  </AccordionTitle>
                  <ul className="accordion-content">
                     {item.presidents.map((president) => (
                        <li key={president.id}>
                           {president.name} {president.lastName}
                        </li>
                     ))}
                  </ul>
               </div>
            ))
         ) : (
            <p>Loading...</p>
         )}
      </>
   );
}

export { PresidentsByParty };
