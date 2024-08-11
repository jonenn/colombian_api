import { useState } from 'react';
import './App.css';
import { getPresidents } from './services/getRequests';
import { useEffect } from 'react';

function App() {
   //  const [allPresidents, setAllPresidents] = useState(null);
   const [groupedData, setGroupedData] = useState(null);

   useEffect(() => {
      getAllPresidents();
   }, []);

   const getAllPresidents = async () => {
      try {
         const response = await getPresidents();
         //  setAllPresidents(response);
         const grouped = groupByParty(response);
         setGroupedData(grouped);
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

   return (
      <div className="App">
         <h1>Presidents by Political Party</h1>
         {groupedData ? (
            Object.keys(groupedData).map((party) => (
               <div key={party}>
                  <h2 className="party-title">{party}</h2>
                  <ul>
                     {groupedData[party].map((president) => (
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
         <p>{console.log(groupedData)}</p>
      </div>
   );
}

export default App;
