import { useState } from 'react';

function Tabs({ tabs }) {
   console.log(tabs);
   const [tab, setTab] = useState(0);

   return (
      <div>
         {tabs.map((item, index) => {
            return (
               <div key={index} onClick={() => setTab(index)}>
                  {tab}
                  {item.label}
               </div>
            );
         })}
      </div>
   );
}

export { Tabs };
