import Head from 'next/head'
import Link from 'next/link'
import Router from 'next/router'

import { PureComponent } from 'react'

import Avatar from 'react-md/lib/Avatars'
import Button from 'react-md/lib/Buttons/Button'
import FontIcon from 'react-md/lib/FontIcons'
import ListItem from 'react-md/lib/Lists/ListItem'
import NavigationDrawer from 'react-md/lib/NavigationDrawers'
import SelectField from 'react-md/lib/SelectFields'

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

export default class Dashboard extends PureComponent {
  constructor() {
    super()
    this.state = {
      role: 'Broadcaster'
    }
  }
  render() {
    const closeButton = (
      <Button
        icon
        tooltipLabel='Close the interactive demo'
        tooltipDelay={150}
        tooltipPosition='left'
      >
        close
      </Button>
    )
    let navItems = [
      {
        roles: ['Broadcaster', 'Ad Agency', 'Advertiser'],
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
        roles: ['Broadcaster'],
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
        roles: ['Broadcaster', 'Ad Agency'],
        component: <ListItem
          key='2'
          component={NavigationLink}
          href='/place'
          leftIcon={<FontIcon>face</FontIcon>}
          tileClassName='md-list-tile--mini'
          primaryText={'Place Order'}
        />,
      },
      {
        roles: ['Ad Agency'],
        component: <ListItem
          key='3'
          component={NavigationLink}
          href='/map'
          leftIcon={<FontIcon>perm_contact_calendar</FontIcon>}
          tileClassName='md-list-tile--mini'
          primaryText={'Ad-to-spot mapping'}
        />,
      },
      {
        roles: ['Broadcaster'],
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
        roles: ['Broadcaster', 'Ad Agency', 'Advertiser'],
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

    return <div>
      <Head>
        <link rel='stylesheet' href='/static/react-md.min.css' />
        <link rel='stylesheet' href='https://fonts.googleapis.com/css?family=Roboto:300,400,500' />
        <link rel='stylesheet' href='https://fonts.googleapis.com/css?family=Material+Icons' />
        <script src='https://api.mapbox.com/mapbox-gl-js/v0.33.1/mapbox-gl.js'></script>
        <link href='https://api.mapbox.com/mapbox-gl-js/v0.33.1/mapbox-gl.css' rel='stylesheet' />
      </Head>
      <NavigationDrawer
        navItems={navItems.filter(navItem => {
          let result = false
          if(navItem.roles.indexOf(this.state.role) > -1) result = true
          return result
        }).map(navItem => navItem.component)}
        contentClassName='md-grid'
        drawerHeaderChildren={[
          /*
          <Avatar
            key={avatarSrc}
            src={avatarSrc}
            role='presentation'
            iconSized
            style={{alignSelf: 'center', marginLeft: 16, marginRight: 16, flexShrink: 0}}
          />,*/
          <SelectField
            id='account-switcher'
            defaultValue={this.state.role}
            menuItems={['Broadcaster', 'Ad Agency', 'Advertiser']}
            key='account-switcher'
            position={SelectField.Positions.BELOW}
            className='md-select-field--toolbar'
            onChange={val => {
              this.setState({role: val})
              Router.push('/')
            }}
          />
        ]}
        mobileDrawerType={NavigationDrawer.DrawerTypes.TEMPORARY_MINI}
        tabletDrawerType={NavigationDrawer.DrawerTypes.PERSISTENT_MINI}
        desktopDrawerType={NavigationDrawer.DrawerTypes.PERSISTENT_MINI}
        toolbarTitle='Ad Sales dashboard'
        toolbarActions={closeButton}
      >
        {this.props.children}
      </NavigationDrawer>
    </div>
  }
}
