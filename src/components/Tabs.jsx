import { useState } from 'react';
import '../styles/Tabs.css';

function Tabs({ tabs }) {
   console.log(tabs);
   const [tab, setTab] = useState(0);

   return (
      <>
         <div className="menu">
            {tabs.map((item, index) => {
               return (
                  <div
                     key={index}
                     onClick={() => setTab(index)}
                     className={`tab-title ${
                        tab === index ? 'tab-title__active' : ''
                     }`}
                     data-text={item.label}
                  >
                     {item.label}
                  </div>
               );
            })}
         </div>
         <hr className="separator" />
         {console.log(tab)}
         <div className="content">{tabs[tab] && tabs[tab].content}</div>
      </>
   );
}

export { Tabs };
