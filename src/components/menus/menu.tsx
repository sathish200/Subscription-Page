import React from 'react'
import { Link } from 'react-router-dom'
import Button from '../controls/Button'
interface menuProps {
  [x: string]: any
  className?: string
  icon?: string
}
const Menu = (props: menuProps) => {
  const menuList = [
    { name: 'Home', path: '/', active: 'active', icon: 'icon-pw-ui-home mx-1' },
    { name: 'About Us', path: '/', active: 'active', icon: '' },
  ]
  return (
    <>
      <nav className={props?.className ? `${props?.menuBar ? 'pw-menus expanded' : 'pw-menus collapsed'} ${props?.className}` : props?.menuBar ? 'pw-menus  expanded' : 'pw-menus collapsed'}>
        <ul className='list-unstyled p-2'>
          {menuList.map((item => <li className='py-2'><Link to={item.path} className={`link text-decoration-none text-dark ${item.active}`}><span className={item.icon}></span>{item.name}</Link></li>))}
        </ul>
      </nav>
    </>
  )
}

export default Menu