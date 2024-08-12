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
      { label: 'Airports By Departments', content: <AirportsByDepas /> },
      { label: 'Airports By Region', content: <AirportsByRegion /> },
   ];
   return (
      <div className="App">
         <h1>Colombia API Dashboard</h1>
         <Tabs tabs={tabList} />
      </div>
   );
}

export default App;
