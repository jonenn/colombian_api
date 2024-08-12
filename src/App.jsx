import './App.css';
import { AirportsByDepas } from './components/AirportsByDepas';
import { AirportsByRegion } from './components/AirportsByRegion';
import { AttractionsByDepas } from './components/AttractionsByDepas';
import { PresidentsByParty } from './components/PresidentsByParty';
import { Tabs } from './components/Tabs';

function App() {
   const tabList = [
      { label: 'Presidents By Party', content: <PresidentsByParty /> },
      { label: 'Attractions By Departments', content: <AttractionsByDepas /> },
      { label: 'Presidents By Party', content: <AirportsByDepas /> },
      { label: 'Presidents By Party', content: <AirportsByRegion /> },
   ];
   return (
      <div className="App">
         <Tabs tabs={tabList} />
      </div>
   );
}

export default App;
