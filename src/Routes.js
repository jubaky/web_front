import Vue from 'vue';
import Router from 'vue-router';

import Layout from '@/components/Layout/Layout';
import Login from '@/pages/Login/Login';
import ErrorPage from '@/pages/Error/Error';

import DashboardPage from '@/pages/Dashboard/Dashboard'

import ApplicationDashboardPage from '@/pages/Application/Dashboard/Dashboard';
import ApplicationBuildPage from '@/pages/Application/Build/Build';
import ApplicationDeploymentPage from '@/pages/Application/Deployment/Deployment';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login,
    },
    {
      path: '/error',
      name: 'Error',
      component: ErrorPage,
    },
    {
      path: '/app',
      name: 'Layout',
      component: Layout,
      children: [
        // main pages
        {
          path: 'dashboard',
          name: 'Dashboard',
          component: DashboardPage,
        },
        {
          path: 'application/:appId/dashboard',
          name: 'ApplicationDashboard',
          component: ApplicationDashboardPage,
          props: true
        },
        {
          path: 'application/:appId/build',
          name: 'ApplicationBuild',
          component: ApplicationBuildPage,
          props: true
        },
        {
          path: 'application/:appId/deployment',
          name: 'ApplicationDeployment',
          component: ApplicationDeploymentPage,
          props: true
        },
      ],
    },
  ],
});
