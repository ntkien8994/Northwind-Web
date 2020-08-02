import React from 'react'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import Layout from '../components/layout/Layout'
import NoFound from '../components/pages/noFound/NoFound'
import CallBack from '../components/authentication/CallBack';
import Home from '../components/pages/home/Home';
import CustomerList from '../components/pages/customer/CustomerList';
export const Router = () => (
		<BrowserRouter>
			<div>
				<Switch>
					<Route path='/callback' component={CallBack} />
					<Route component={Layout} />
					<Route component={NoFound}/>
				</Switch>
			</div>
		</BrowserRouter>
)


export const routes = [
	{
		path: '/',
		name: 'Trang chủ',
		icon: 'home',
		showmenu:true,
		exact: true,
		component: Home,
		
	},
	{
		path: '/customers',
		name: 'Khách hàng',
		icon: 'home',
		showmenu:true,
		exact: true,
		component: CustomerList,
	}
]







