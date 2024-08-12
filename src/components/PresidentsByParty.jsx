import { getPresidents } from '../services/getRequests';
import { useEffect, useState } from 'react';

function PresidentsByParty() {
   const [sortedData, setSortedData] = useState(null);

   useEffect(() => {
      getAllPresidents();
   }, []);

   const getAllPresidents = async () => {
      try {
         const response = await getPresidents();
         displayData(response);
      } catch (error) {
         console.log(error);
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
      <div>
         <h1>Presidents by Political Party</h1>
         {sortedData ? (
            sortedData.map((item) => (
               <div key={item.party}>
                  <h2 className="capitalized">{item.party}</h2>
                  <ul>
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
      </div>
   );
}

export { PresidentsByParty };
