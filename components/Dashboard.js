import Head from 'next/head'
import Link from 'next/link'
import Router from 'next/router'

import { PureComponent } from 'react'

import Avatar from 'react-md/lib/Avatars'
import Button from 'react-md/lib/Buttons/Button'
//import FontIcon from 'react-md/lib/FontIcons'
import Drawer from 'react-md/lib/Drawers'
import Toolbar from 'react-md/lib/Toolbars'
import SelectField from 'react-md/lib/SelectFields'

import { inject, observer } from 'mobx-react'

const avatarSrc = '/static/ibmlogo-grey-54x20.png'

class NavigationLink extends PureComponent {
  render() {
    const { href, as, children, ..._props } = this.props
    return <div {..._props} style={{padding: 0}}>
      <Link href={href} as={as}>
        <a className='md-list-tile md-list-tile--mini' style={{width: '100%', overflow: 'hidden'}}>
          {children}
        </a>
      </Link>
    </div>
  }
}

/*
let navIcons = [
  'account_box',
  'account_circle',
  'face',
  'perm_contact_calendar',
  'perm_identity',
  'record_voice_over',
]
*/

@inject('store') @observer
export default class Dashboard extends PureComponent {
  componentDidMount() {
    this.props.store.start()
  }
  componentWillUnmount() {
    this.props.store.stop()
  }
  render() {
    let { store } = this.props
    let navItems = store.navItems.map( (navItem, i) => {
      //navItem.component.leftIcon = <FontIcon>{navIcons[i]}</FontIcon>
      navItem.component.component = NavigationLink
      /*
      navItem.component.onClick = () => {
        store.navItems.map( obj => {
          obj.component.key == navItem.component.key ? obj.component.active = true : obj.component.active = false
        })
      }
      */
      return navItem
    })

    let menuItems = store.users.map( user => user.name)
    const drawerHeader = <Toolbar className='md-divider-border md-divider-border--bottom'>
      <div className='md-title md-title--toolbar'>{store.toolbarTitle}</div>
    </Toolbar>
    let styleLink = store.users.filter( user => user.name == store.username)[0].styleLink
    return <div>
      <Head>
        <link rel='stylesheet' href={`${styleLink}`} />
        <link rel='stylesheet' href='https://fonts.googleapis.com/css?family=Roboto:300,400,500' />
        <link rel='stylesheet' href='https://fonts.googleapis.com/css?family=Material+Icons' />
        <title>{store.title}</title>
        <script src='https://api.mapbox.com/mapbox-gl-js/v0.33.1/mapbox-gl.js'></script>
        <link href='https://api.mapbox.com/mapbox-gl-js/v0.33.1/mapbox-gl.css' rel='stylesheet' />
      </Head>
      <Drawer
        defaultVisible
        position='left'
        navItems={navItems.filter(navItem => {
          let result = false
          if(navItem.roles.indexOf(store.username) > -1) result = true
          return result
        }).map(navItem => navItem.component)}
        header={drawerHeader}
      >
      </Drawer>
        <Toolbar
          colored
          fixed
          titleMenu={
            <SelectField
              id='account-switcher'
              label='User selection'
              menuItems={['BroadcasterA', 'AgencyA', 'AdvertiserA', 'AdvertiserC']}
              value={store.username}
              onChange={val => {
                store.username = val
                Router.push('/')
              }}
            />
          }
          className='md-drawer-relative'
        />
      <div className='md-drawer-relative md-toolbar-relative'>
        {this.props.children}
      </div>
    </div>
  }
}
