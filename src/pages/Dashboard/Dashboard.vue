<template>
  <div class="dashboard-page">
    <h1 class="page-title">Dashboard</h1>

    <b-row>
      <b-col lg="3" sm="6" xs="12"  v-for="index in 4" :key="index">
        <div class="pb-xlg h-100">
          <Widget class="h-100 mb-0" :title="'Cluster1 - Node' + index">
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
            <div class="pod-state-container">
              <div class="pod"></div>
              <div class="pod"></div>
              <div class="pod"></div>
              <div class="pod warning"></div>
              <div class="pod warning"></div>
              <div class="pod"></div>
              <div class="pod"></div>
              <div class="pod error"></div>
              <div class="pod"></div>
              <div class="pod warning"></div>
              <div class="pod"></div>
              <div class="pod"></div>
              <div class="pod"></div>
              <div class="pod"></div>
              <div class="pod"></div>
              <div class="pod"></div>
              <div class="pod"></div>
              <div class="pod"></div>
              <div class="pod"></div>
              <div class="pod"></div>
              <div class="pod"></div>
              <div class="pod"></div>
            </div>
          </Widget>
        </div>
      </b-col>
    </b-row>
    <b-row>
      <b-col lg="3" sm="6" xs="12" v-for="index in 10" :key="index">
        <div class="pb-xlg h-100">
          <Widget class="h-100 mb-0" :title="'[Production] Application' + index">
            <div class="d-flex justify-content-between align-items-center mb-lg">
              <h2>4,332k</h2>
              <i class="la la-arrow-right text-success rotate-315" />
            </div>
            <div class="d-flex flex-wrap justify-content-between">
              <div class="mt">
                <h6>30</h6><p class="text-muted mb-0 mr"><small>Pod</small></p>
              </div>
              <div class="mt">
                <h6>0</h6><p class="text-muted mb-0"><small>Restart</small></p>
              </div>
              <div class="mt">
                <h6>4.5%</h6><p class="text-muted mb-0 mr"><small>Error</small></p>
              </div>
            </div>
            <div class="pod-state-container">
              <div class="pod"></div>
              <div class="pod"></div>
              <div class="pod"></div>
              <div class="pod warning"></div>
              <div class="pod warning"></div>
              <div class="pod"></div>
              <div class="pod"></div>
              <div class="pod error"></div>
              <div class="pod"></div>
              <div class="pod warning"></div>
              <div class="pod"></div>
              <div class="pod"></div>
              <div class="pod"></div>
              <div class="pod"></div>
              <div class="pod"></div>
              <div class="pod"></div>
              <div class="pod"></div>
              <div class="pod"></div>
              <div class="pod"></div>
              <div class="pod"></div>
              <div class="pod"></div>
              <div class="pod"></div>
            </div>
          </Widget>
        </div>
      </b-col>
    </b-row>
  </div>
</template>

<script>
/* eslint-disable */
import 'imports-loader?jQuery=jquery,this=>window!flot';
import 'imports-loader?jQuery=jquery,this=>window!flot/jquery.flot.pie';
import 'imports-loader?jQuery=jquery,this=>window!flot/jquery.flot.resize';
/* eslint-enable */
import Widget from '@/components/Widget/Widget';

export default {
  name: 'Dashboard',
  components: {
    Widget
  },
  data() {
    return {
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
  },
};
</script>

<style src="./Dashboard.scss" lang="scss" />
