import Head from 'next/head'
import Link from 'next/link'
import Router from 'next/router'

import { PureComponent } from 'react'

import Avatar from 'react-md/lib/Avatars'
import Button from 'react-md/lib/Buttons/Button'
import FontIcon from 'react-md/lib/FontIcons'
import ListItem from 'react-md/lib/Lists/ListItem'
//import NavigationDrawer from 'react-md/lib/NavigationDrawers'
import Drawer from 'react-md/lib/Drawers'
import Toolbar from 'react-md/lib/Toolbars'
import SelectField from 'react-md/lib/SelectFields'
import { inject, observer } from 'mobx-react'

//const avatarSrc = 'https://cloud.githubusercontent.com/assets/13041/19686250/971bf7f8-9ac0-11e6-975c-188defd82df1.png'
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

@inject('store') @observer
export default class Dashboard extends PureComponent {
  /*
  constructor(props) {
    super(props)
    console.log('constructor')
    this.state = {
      username: props.store.username,
    }
  }
  */
  componentDidMount() {
    this.props.store.start()
  }
  componentWillUnmount() {
    this.props.store.stop()
  }
  render() {
    let navItems = [
      {
        roles: ['BroadcasterA', 'AgencyA', 'AdvertiserA', 'AdvertiserC'],
        component: <ListItem
          key='0'
          component={NavigationLink}
          href='/'
          leftIcon={<FontIcon>account_box</FontIcon>}
          tileClassName='md-list-tile--mini'
          primaryText={'Home'}
        />,
      },
      {
        roles: ['BroadcasterA'],
        component: <ListItem
          key='1'
          component={NavigationLink}
          href='/release'
          leftIcon={<FontIcon>account_circle</FontIcon>}
          tileClassName='md-list-tile--mini'
          primaryText={'Release Inventory'}
        />,
      },
      {
        roles: ['AgencyA'],
        component: <ListItem
          key='2'
          component={NavigationLink}
          href='/place'
          leftIcon={<FontIcon>face</FontIcon>}
          tileClassName='md-list-tile--mini'
          primaryText={'Place Orders'}
        />,
      },
      {
        roles: ['AgencyA'],
        component: <ListItem
          key='3'
          component={NavigationLink}
          href='/map'
          leftIcon={<FontIcon>perm_contact_calendar</FontIcon>}
          tileClassName='md-list-tile--mini'
          primaryText={'Map Ads'}
        />,
      },
      {
        roles: ['BroadcasterA'],
        component: <ListItem
          key='4'
          component={NavigationLink}
          href='/report'
          leftIcon={<FontIcon>perm_identity</FontIcon>}
          tileClassName='md-list-tile--mini'
          primaryText={'Report Aired Ads'}
        />,
      },
      {
        roles: ['BroadcasterA', 'AgencyA', 'AdvertiserA', 'AdvertiserC'],
        component: <ListItem
          key='5'
          component={NavigationLink}
          href='/trace'
          leftIcon={<FontIcon>record_voice_over</FontIcon>}
          tileClassName='md-list-tile--mini'
          primaryText={'Trace Ads'}
        />,
      },
    ]

    let menuItems = this.props.store.users.map( user => user.name)
    const header = <Toolbar className='md-divider-border md-divider-border--bottom'/>
    return <div>
      <Head>
        <link rel='stylesheet' href='/static/react-md.min.css' />
        <link rel='stylesheet' href='https://fonts.googleapis.com/css?family=Roboto:300,400,500' />
        <link rel='stylesheet' href='https://fonts.googleapis.com/css?family=Material+Icons' />
        <script src='https://api.mapbox.com/mapbox-gl-js/v0.33.1/mapbox-gl.js'></script>
        <link href='https://api.mapbox.com/mapbox-gl-js/v0.33.1/mapbox-gl.css' rel='stylesheet' />
      </Head>
      <Drawer
        visible
        position='left'
        navItems={navItems.filter(navItem => {
          let result = false
          if(navItem.roles.indexOf(this.props.store.username) > -1) result = true
          return result
        }).map(navItem => navItem.component)}
        type={Drawer.DrawerTypes.PERSISTENT}
        header={header}
      >
        <Toolbar
          colored
          fixed
          title='Ad Sales'
          titleStyle={{
            width: '220px',
          }}
          titleMenu={
            <SelectField
              id='account-switcher'
              label='User selection'
              menuItems={['BroadcasterA', 'AgencyA', 'AdvertiserA', 'AdvertiserC']}
              value={this.props.store.username}
              onChange={val => {
                this.props.store.username = val
                Router.push('/')
              }}
            />
          }
        >
        </Toolbar>
      </Drawer>
      <div className='md-drawer-relative md-toolbar-relative'>
        {this.props.children}
      </div>
    </div>
  }
}
