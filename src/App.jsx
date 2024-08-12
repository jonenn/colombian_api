import './App.css';
import { AirportsByDepas } from './components/AirportsByDepas';
import { AirportsByRegion } from './components/AirportsByRegion';
import { AttractionsByDepas } from './components/AttractionsByDepas';
import { PresidentsByParty } from './components/PresidentsByParty';
import { Tabs } from './components/Tabs';

function App() {
   const tabList = [
      { label: 'Presidents by Party', content: <PresidentsByParty /> },
      { label: 'Attractions by Departments', content: <AttractionsByDepas /> },
      { label: 'Airports by Departments', content: <AirportsByDepas /> },
      { label: 'Airports by Region', content: <AirportsByRegion /> },
   ];
   return (
      <div className="App">
         <div className="title-container">
            <p className="colombia-title">Colombia API Dashboard</p>
         </div>
         <div className="content-container">
            <Tabs tabs={tabList} />
         </div>
      </div>
   );
}

export default App;
