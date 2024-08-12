import { useState } from 'react';

function Tabs({ tabs }) {
   console.log(tabs);
   const [tab, setTab] = useState(0);

   return (
      <div>
         {tabs.map((item, index) => {
            return (
               <div key={index} onClick={() => setTab(index)}>
                  {item.label}
               </div>
            );
         })}
         {console.log(tab)}
         <div>{tabs[tab] && tabs[tab].content}</div>
      </div>
   );
}

export { Tabs };
