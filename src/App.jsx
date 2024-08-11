import { useState } from 'react';
import './App.css';
import { getPresidents } from './services/getRequests';
import { useEffect } from 'react';

function App() {
   const [AllPresidents, setAllPresidents] = useState(null);
   useEffect(() => {
      getAllPresidents();
   }, []);

   const getAllPresidents = async () => {
      try {
         const response = await getPresidents();
         setAllPresidents(response);
      } catch (error) {
         console.log(error);
      }
   };

   return (
      <>
         <p>{JSON.stringify(AllPresidents && AllPresidents)}</p>
      </>
   );
}

export default App;
