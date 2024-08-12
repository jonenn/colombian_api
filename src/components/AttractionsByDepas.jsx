import { getAttractionById, getAttractions } from '../services/getRequests';
import { useEffect, useState } from 'react';

function AttractionsByDepas() {
   // const [sortedData, setSortedData] = useState(null);
   const [allAttractions, setAllAttractions] = useState(null);

   useEffect(() => {
      getAllAttractions();
   }, []);

   const getAllAttractions = async () => {
      try {
         const response = await getAttractions();
         console.log(response[0].city.departmentId);
         setAllAttractions(response);
         // displayData(response);
      } catch (error) {
         console.log(error);
      }
   };

   const getAnAttraction = async (id) => {
      try {
         const response = await getAttractionById(id);
         console.log(response);
      } catch (error) {
         console.log(error);
      }
   };

   // const groupByParty = (data) => {
   //    return data.reduce((acc, president) => {
   //       const party = president.politicalParty.toLowerCase();
   //       if (!acc[party]) {
   //          acc[party] = [];
   //       }
   //       acc[party].push(president);
   //       return acc;
   //    }, {});
   // };

   // const countByParty = (data) => {
   //    console.log(data);
   //    return Object.keys(data).reduce((acc, party) => {
   //       acc[party] = data[party].length;
   //       return acc;
   //    }, {});
   // };

   // const sortByCount = (groupedData, countedData) => {
   //    console.log(groupedData);
   //    console.log(countedData);
   //    return Object.keys(groupedData)
   //       .map((party) => ({
   //          party,
   //          count: countedData[party],
   //          presidents: groupedData[party],
   //       }))
   //       .sort((a, b) => b.count - a.count);
   // };

   // const displayData = (data) => {
   //    const grouping = groupByParty(data);
   //    const counting = countByParty(grouping);
   //    const sorting = sortByCount(grouping, counting);
   //    setSortedData(sorting);
   // };

   return (
      <div>
         <h1>Attractions by Department & City</h1>
         {allAttractions ? JSON.stringify(allAttractions) : <p>Loading...</p>}
      </div>
   );
}

export { AttractionsByDepas };
