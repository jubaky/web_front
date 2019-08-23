<template>
  <nav
    :class="{sidebar: true, sidebarStatic, sidebarOpened}"
    @mouseenter="sidebarMouseEnter"
    @mouseleave="sidebarMouseLeave"
  >
    <header class="logo">
      <router-link to="/app"><span class="text-warning">Jubaky</span> K8S</router-link>
    </header>
    <ul class="nav">
      <NavLink
        header="Dashboard"
        link="/app/dashboard"
        iconName="flaticon-home"
        index="dashboard"
        isHeader
      />
      <h5 class="navTitle">APPLICATION</h5>
      <NavLink
        :activeItem="activeItem"
        v-for="app in applicationList"
        :key="app.id"
        :header="app.name"
        :link="'/app/application/' + app.id"
        iconName="flaticon-app"
        index="application"
        :childrenLinks="[
          { header: 'Dashboard', link: '/app/application/' + app.id + '/dashboard' },
          { header: 'Build', link: '/app/application/' + app.id + '/build' },
          { header: 'Deployment', link: '/app/application/' + app.id + '/deployment' },
        ]"
      />
    </ul>
    <p>
    <h5 class="navTitle">
      PROGRESS ITEMS
    </h5>
    <div class="sidebarAlerts">
      <b-alert
        v-for="alert in alerts"
        :key="alert.id"
        class="sidebarAlert" variant="transparent"
        show dismissible
      >
        <span>{{alert.title}}</span><br />
        <b-progress class="sidebarProgress progress-xs mt-1"
          :variant="alert.color" :value="alert.value" :max="100" />
        <small>{{alert.footer}}</small>
      </b-alert>
    </div>
  </nav>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import isScreen from '@/core/screenHelper';
import NavLink from './NavLink/NavLink';
import Api from '@/api/api';

export default {
  name: 'Sidebar',
  components: { NavLink },
  data() {
    return {
      alerts: [
        {
          id: 0,
          title: '[Build] Application1',
          value: 15,
          footer: 'Changed by Admin... 65%',
          color: 'info',
        },
        {
          id: 1,
          title: '[Deploy] Application2',
          value: 20,
          footer: 'Deploy to Production (master)',
          color: 'danger',
        },
      ],
      applicationList: []
    };
  },
  methods: {
    ...mapActions('layout', ['changeSidebarActive', 'switchSidebar']),
    setActiveByRoute() {
      const paths = this.$route.fullPath.split('/');
      paths.pop();
      this.changeSidebarActive(paths.join('/'));
    },
    sidebarMouseEnter() {
      if (!this.sidebarStatic && (isScreen('lg') || isScreen('xl'))) {
        this.switchSidebar(false);
        this.setActiveByRoute();
      }
    },
    sidebarMouseLeave() {
      if (!this.sidebarStatic && (isScreen('lg') || isScreen('xl'))) {
        this.switchSidebar(true);
        this.changeSidebarActive(null);
      }
    },
    updateApplicationList() {
      const that = this;

      Api.getApplicationList()
              .then(response => {
                that.applicationList = response.data.data;
              });
    }
  },
  created() {
    this.setActiveByRoute();
    this.updateApplicationList();
  },
  computed: {
    ...mapState('layout', {
      sidebarStatic: state => state.sidebarStatic,
      sidebarOpened: state => !state.sidebarClose,
      activeItem: state => state.sidebarActiveElement,
    }),
  },
};
</script>

<!-- Sidebar styles should be scoped -->
<style src="./Sidebar.scss" lang="scss" scoped/>
