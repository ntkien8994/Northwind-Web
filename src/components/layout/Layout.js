import React, { useState } from 'react'
import { withRouter, Route, Link, Switch } from 'react-router-dom'
import { routes } from '../../routes/router'
import Header from '../header/Header'
import { Layout, Menu, Breadcrumb } from 'antd';
import { Icon } from '@ant-design/compatible';
import AuthWrap from '../authentication/AuthWrap';
import { connect } from 'react-redux';
import { setCurrent, setCollapsed } from '../../actions/layoutAction';

const { Sider, Content, Footer } = Layout
const { SubMenu } = Menu
function breadcrumb(location) {
  const breadcrumbRouters = []
  routes.forEach((route, params, routes) => {
    route.breadcrumbName = route.name

    if (routes.indexOf(route) === 0) return (
      breadcrumbRouters[0] = route
    )

    const pathArr = location.pathname.split('/') || []
    if (route.path == '/' + pathArr[1]) {
      breadcrumbRouters[1] = route
      route.children && route.children.map(children => {
        if (children.path == location.pathname) {
          children.breadcrumbName = children.name
          breadcrumbRouters[2] = children
        }
      })
    }

  })
  return breadcrumbRouters
}
const mapStateToProps = (state) => {
  return {
    ...state.layouts
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setCurrent: (current) => {
      dispatch(setCurrent(current))
    },
    setCollapsed: (collapsed) => {
      dispatch(setCollapsed(collapsed))
    }
  }
}
function ProLayout(props) {
  const { location } = props
  const breadcrumbRouters = breadcrumb(location)
  var current = props.current;
  if (!current) {
    current = {
      key: breadcrumbRouters[breadcrumbRouters.length - 1].name,
      path: breadcrumbRouters[breadcrumbRouters.length - 1].path
    }
  }
  return (

    <Layout style={{ height: '100%' }}>
      <Header/>
      <Layout >
        <Sider
          breakpoint="lg"
          style={{ height: 'calc(100vh - 98px)', overflow: 'auto' }}
          onCollapse={() => props.setCollapsed(!props.collapsed)}
          collapsible={true}
          collapsed={props.collapsed}
        >
          <Menu
            theme="dark"
            onClick={(e) => props.setCurrent(e)}
            selectedKeys={[current.key]}
            mode="inline"
          >
            {
              routes.map((item, menuIdx) => {
                if (item.showmenu) {
                  if (item.children instanceof Array) {
                    return (
                      <SubMenu key={item.name}
                        title={<span><Icon type={item.icon} /><span>{item.name}</span></span>}>
                        {
                          item.children.map((subItem, subItemIdx) => (

                            <Menu.Item key={subItem.name}>
                              <Link to={subItem.path}>{subItem.name}</Link>
                            </Menu.Item>
                          ))
                        }
                      </SubMenu>
                    )
                  } else {
                    return (
                      <Menu.Item key={item.name}>
                        <Link to={item.path}>
                          <Icon type={item.icon} /><span>{item.name}</span>
                        </Link>
                      </Menu.Item>
                    )
                  }
                }

              })
            }
          </Menu>
        </Sider>
        <Layout>
          <Breadcrumb className='bg-white '>
            <Breadcrumb.Item href={breadcrumbRouters[0].path}>
              <Icon type="home" />
              <span>{breadcrumbRouters[0].name}</span>
            </Breadcrumb.Item>
            {breadcrumbRouters.map((breadcrumb, breadcrumbIdx) => {
              if (breadcrumbIdx !== 0) return (
                <Breadcrumb.Item key={breadcrumbIdx}  >
                  <span>{breadcrumb.name}</span>
                </Breadcrumb.Item>
              )
            })}

          </Breadcrumb>
          {/* <PageHeader title={current.key} /> */}
          <div className='bg-white app-body'>
            <Switch>
              {routes.map((route, routeIdx) => {
                if (route['children']) return route['children'].map((children, childrenIdx) => {
                  return (<Route
                    key={children.name}
                    path={children.path}
                    render={props => (
                      <AuthWrap>
                        <children.component {...props} />
                        {/* <AuthWrap>{children.component}</AuthWrap> */}
                      </AuthWrap>
                    )}
                    exact={children.exact} />)
                })
                if (!route['children']) return (<Route key={route.name}
                  path={route.path}
                  exact={route.exact}
                  render={props => (
                    <AuthWrap>
                      <route.component {...props} />
                    </AuthWrap>
                  )}
                />)
              })
              }
            </Switch>
          </div>
          <Footer>
            <span><a href="#">North Wind</a> © 2020</span>
            <span className="ml-auto">Powered by <a href="#">ntk</a></span>
          </Footer>
        </Layout>
      </Layout>

    </Layout>
  )
}
export default connect(mapStateToProps, mapDispatchToProps)(ProLayout)