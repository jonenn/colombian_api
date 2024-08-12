import './App.css';
import { AirportsByDepas } from './components/AirportsByDepas';
import { AirportsByRegion } from './components/AirportsByRegion';
import { AttractionsByDepas } from './components/AttractionsByDepas';
import { PresidentsByParty } from './components/PresidentsByParty';

function App() {
   return (
      <>
         {/* <PresidentsByParty /> */}
         {/* <AttractionsByDepas /> */}
         {/* <AirportsByDepas /> */}
         <AirportsByRegion />
      </>
   );
}

export default App;
