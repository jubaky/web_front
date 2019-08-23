<template>
  <div class="dashboard-page">
    <h1 class="page-title">Dashboard</h1>
    <b-breadcrumb>
      <b-breadcrumb-item>Application</b-breadcrumb-item>
      <b-breadcrumb-item active>Dashboard</b-breadcrumb-item>
    </b-breadcrumb>

    <b-row>
      <b-col lg="3" sm="6" xs="12"  v-for="index in 6" :key="index">
        <div class="pb-xlg h-100">
          <Widget class="h-100 mb-0" title="[Production] Pod : application1-ab3id9s">
            <div class="align-items-center mb-sm">
              <p>CPU <small>60%</small></p>
              <div>
                <trend
                  :data="getRandomData()"
                  :gradient="['#ffc247']"
                  :height="30"
                  smooth />
              </div>
            </div>
            <div class="align-items-center mb-sm">
              <p>Memory <small>4.24GB / 16GB</small></p>
              <div>
                <trend
                  :data="getRandomData()"
                  :gradient="['#9964e3']"
                  :height="30"
                  smooth />
              </div>
            </div>
            <div class="align-items-center">
              <p>Network <small>12MB/s / -8.4MB/s</small></p>
              <div>
                <trend
                  :data="getRandomData()"
                  :gradient="['#3abf94']"
                  :height="30"
                  smooth />
              </div>
            </div>
          </Widget>
        </div>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <Widget title="<h5>Recent <span class='fw-semi-bold'>Build</span></h5>" customHeader>
          <div class="table-resposive">
            <table class="table">
              <thead>
              <tr>
                <th class="hidden-sm-down">#</th>
                <th>Branch</th>
                <th>Create Time</th>
                <th class="hidden-sm-down">Activator</th>
                <th class="hidden-sm-down">Stage</th>
                <th class="hidden-sm-down">Status</th>
                <th class="hidden-sm-down">Recent Result</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="(build, index) in buildList" :key="build.id">
                <td>{{index + 1}}</td>
                <td>
                  {{build.branch}}
                </td>
                <td class="text-semi-muted">
                  {{build.createTime | dateTimeSeconds}}
                </td>
                <td>
                  {{build.creatorName}}
                </td>
                <td>
                  Build
                </td>
                <td class="width-150 text-center">
                  <b-progress
                    variant="primary" :value="build.progressRate" :max="100"
                    class="progress-sm mb-xs"
                    v-if="build.status === 'PROGRESS'"
                  />
                  <b-badge variant="secondary" v-else-if="build.status === 'ABORTED'">ABORTED</b-badge>
                  <b-badge variant="primary" v-else-if="build.status === 'PENDING'">PENDING</b-badge>
                  <b-badge variant="success" v-else-if="build.status === 'SUCCESS'">SUCCESS</b-badge>
                  <b-badge variant="danger" v-else-if="build.status === 'FAILURE'">FAILURE</b-badge>
                  <b-badge variant="warning" v-else>{{build.status}}</b-badge>
                </td>
                <td class="width-150 text-center">
                  <div class="sparkline-chart" :data-index="index" />
                </td>
              </tr>
              </tbody>
            </table>
          </div>
        </Widget>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <Widget title="<h5>Recent <span class='fw-semi-bold'>Deploy</span></h5>" customHeader>
          <div class="table-resposive">
            <table class="table">
              <thead>
              <tr>
                <th class="hidden-sm-down">#</th>
                <th>Namespace</th>
                <th>Source</th>
                <th>Start Time</th>
                <th class="hidden-sm-down">Activator</th>
                <th class="hidden-sm-down">Status</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="(deploy, index) in deployList" :key="deploy.id">
                <td>{{index + 1}}</td>
                <td>
                  {{deploy.namespace}}
                </td>
                <td>
                  <p class="mb-0">
                    <small>
                      <span class="fw-semi-bold">Branch:</span>
                      <span class="text-muted">&nbsp; {{deploy.branch}}</span>
                    </small>
                  </p>
                  <p>
                    <small>
                      <span class="fw-semi-bold">Template:</span>
                      <span class="text-muted">&nbsp; {{deploy.templateName}}</span>
                    </small>
                  </p>
                </td>
                <td class="text-semi-muted">
                  {{deploy.createTime | dateTimeSeconds}}
                </td>
                <td>
                  {{deploy.creatorName}}
                </td>
                <td class="width-150 text-center">
                  <b-badge variant="info" v-if="deploy.status === 'PROGRESS'">PROGRESS</b-badge>
                  <b-badge variant="success" v-else-if="deploy.status === 'SUCCESS'">SUCCESS</b-badge>
                  <b-badge variant="danger" v-else-if="deploy.status === 'FAILURE'">FAILURE</b-badge>
                  <b-badge variant="warning" v-else>{{deploy.status}}</b-badge>
                </td>
              </tr>
              </tbody>
            </table>
          </div>
        </Widget>
      </b-col>
    </b-row>
  </div>
</template>

<script>
  import $ from 'jquery';
  /* eslint-disable */
import 'imports-loader?jQuery=jquery,this=>window!flot';
import 'imports-loader?jQuery=jquery,this=>window!flot/jquery.flot.pie';
import 'imports-loader?jQuery=jquery,this=>window!flot/jquery.flot.resize';
  import 'imports-loader?jQuery=jquery,this=>window!jquery-sparkline';
/* eslint-enable */
import Widget from '@/components/Widget/Widget';

import Api from '@/api/api';

export default {
  name: 'Dashboard',
  components: {
    Widget
  },
  props: {
    appId: {
      required: true
    }
  },
  data() {
    return {
      buildList: [],
      deployList: []
    };
  },
  methods: {
    getRandomData() {
      const arr = [];

      for (let i = 0; i < 25; i += 1) {
        arr.push(Math.random().toFixed(1) * 10);
      }

      return arr;
    },
    initCharts() {
      const that = this;

      $.each($('.sparkline-chart'), (id, chart) => {
        const $chart = $(chart);

        const dataArr = [];
        const colorArr = [];
        const index = that.buildList[$chart.data("index")];

        if (!index) {
          return;
        }

        for (const i of Array(25).keys()) {
          const random = Math.floor(Math.random() * (60-40)) + 40;
          dataArr.push(random);

          if (random % 12 > 1) {
            colorArr.push("#547fff");
          } else {
            colorArr.push("#f55d5d");
          }
        }
        // index.recentHistory.forEach(value => {
        //   dataArr.push(value.duration);
        //
        //   if (value.success) {
        //     colorArr.push("#547fff");
        //   } else {
        //     colorArr.push("#f55d5d");
        //   }
        // });

        $chart.sparkline(dataArr, {
          type: 'bar',
          colorMap: colorArr,
        });
      });
    },
    updateBuildList() {
      // const list = [];
      // for (const i of Array(10).keys()) {
      //   list.push({
      //     id: i,
      //     branch: 'master',
      //     createTime: 1560209340233,
      //     creatorName: 'Administrator',
      //     progressRate: 60,
      //     status: i > 4 ? 'SUCCESS' : 'PROGRESS'
      //   })
      // }
      //
      // this.buildList = list;
      Api.getRecentBuildList(this.appId)
              .then(response => {
                this.buildList = response.data.data;
              });
    },
    updateDeployList() {
      // const list = [];
      // for (const i of Array(10).keys()) {
      //   list.push({
      //     id: i,
      //     namespace: 'production',
      //     branch: 'master',
      //     templateName: 'default',
      //     createTime: 1560209340233,
      //     creatorName: 'Administrator',
      //     status: 'SUCCESS'
      //   })
      // }
      //
      // this.deployList = list;

      Api.getRecentDeployList(this.appId)
              .then(response => {
                this.deployList = response.data.data;
              });
    }
  },
  mounted() {
    this.updateBuildList();
    this.updateDeployList();
  },
  updated() {
    this.initCharts();
  }
};
</script>

<style src="./Dashboard.scss" lang="scss" />
