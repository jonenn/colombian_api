import { useState } from 'react';
import '../styles/Tabs.css';

function Tabs({ tabs }) {
   console.log(tabs);
   const [tab, setTab] = useState(0);

   return (
      <>
         <div className="menu-container">
            {tabs.map((item, index) => {
               return (
                  <div
                     key={index}
                     onClick={() => setTab(index)}
                     className="tab-title"
                     data-text={item.label}
                  >
                     {item.label}
                  </div>
               );
            })}
         </div>
         {console.log(tab)}
         <div>{tabs[tab] && tabs[tab].content}</div>
      </>
   );
}

export { Tabs };
