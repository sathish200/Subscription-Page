import React, { useState } from 'react'
import Button from '../controls/Button'
import { Popup } from '../popupwindow/popupwindow'
import { Tabs } from '../tabs/tabs'
import logo from '../../asserts/images/logo.png'
interface HeaderProps {
  [x: string]: any
  className?: string
}
const Header = (props: HeaderProps) => {
  const [activeTab, setActiveTab] = useState("overview");
  const tabs = [
    {
      label: "Overview",
      value: "overview",
      content: <div>No Results to Display.</div>,
    },
    {
      label: "Projects",
      value: "projects",
      content: <div>No Results to Display.</div>,
    },
    {
      label: "Tutorials",
      value: "analytics",
      content: <div>No Results to Display.</div>,
    },
  ];
  return (
    <>
      <header className={`shadow w-100 p-3 ${props?.className}`}>
        <div className='d-flex align-items-center justify-content-between'>
          <div className="logo" tabIndex={0} title='logo'>
            <img src = {logo} alt='Crazy Experiments' width={45}/>
          </div>
          <div className="notification-section d-flex align-items-center">
            <Popup trigger={<Button icon='icon-pw-ui-notification' className='px-1'/>} preferredPosition="auto" popupClassName={'max-w-350 w-100'}>
              <div className='w-100'>
                <h3 className='font-18 mb-2'>Notifications</h3>
                <Tabs tabs={tabs} selected={activeTab} onSelect={setActiveTab} size='sm' />
              </div>
            </Popup>
            {/* <Button className='menubutton font-0' icon={props.menuCollapsed ? 'icon-pw-close font-16 mx-2' : 'icon-pw-menu font-16 mx-2'} label='expand button' onClick={props?.collapseToggle}/> */}
          </div>
        </div>
      </header>
    </>
  )
}

export default Header