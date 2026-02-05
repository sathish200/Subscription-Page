import React, { useEffect, useRef } from 'react'
interface PageHeaderProps {
 title?:string
 className?:string
 extras?:any
 icon?:string
 headerclassName?:string
}
export const Pageheader = (props:PageHeaderProps) => {
    const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const setHeaderHeight = () => {
      if (headerRef.current) {
        const height = headerRef.current.offsetHeight;
        document.documentElement.style.setProperty('--page-header-height', `${height}px`);
      }
    };

    setHeaderHeight(); 
    window.addEventListener('resize', setHeaderHeight);

    return () => window.removeEventListener('resize', setHeaderHeight);
  }, []);

  return (
    <>
      <div className={props?.headerclassName ? `${props?.headerclassName} shadow w-100` : 'shadow w-100'} ref={headerRef}>
         <div className='d-flex justify-content-between align-items-center'>
            <h3 className={props?.className} tabIndex={0} aria-label={props?.title}><span className={props?.icon}></span>{props?.title}</h3>
            {props?.extras}
         </div>
      </div>
    </>
  )
}
