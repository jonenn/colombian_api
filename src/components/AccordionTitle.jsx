function AccordionTitle({ children, onClick, style, expanded }) {
   return (
      <div className="accordion" style={style}>
         <svg
            width="8"
            height="12"
            viewBox="0 0 8 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={`${expanded ? 'rotate-svg' : ''}`}
         >
            <path
               d="M7.35746 6.76427C7.83093 6.36475 7.83093 5.63525 7.35746 5.23573L2.21072 0.89281C1.56054 0.344178 0.565814 0.806353 0.565814 1.65708L0.565815 10.3429C0.565815 11.1936 1.56054 11.6558 2.21072 11.1072L7.35746 6.76427Z"
               fill="#A7AAC2"
            />
         </svg>
         <div className="accordion-title" onClick={onClick}>
            {children}
         </div>
      </div>
   );
}

export { AccordionTitle };
