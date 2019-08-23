<template>
  <div class="dashboard-page">
    <h1 class="page-title">Deployment</h1>
    <b-breadcrumb>
      <b-breadcrumb-item>Application</b-breadcrumb-item>
      <b-breadcrumb-item active>Deployment</b-breadcrumb-item>
    </b-breadcrumb>

    <b-row>
      <b-col lg="3" sm="6" xs="12">
        <v-select
          id="namespace-select"
          :options="['Production', 'Stage', 'QA', 'Development']"
          v-model="namespace"
        />
      </b-col>
      <b-btn variant="primary" v-b-modal.deploy>Deploy</b-btn>
    </b-row>
    <br>
    <b-row>
      <b-col>
        <Widget title="<h5>Recent <span class='fw-semi-bold'>Deployment</span></h5>" customHeader>
          <div class="table-resposive">
            <table class="table">
              <thead>
              <tr>
                <th class="hidden-sm-down">#</th>
                <th>Source</th>
                <th>Start Time</th>
                <th class="hidden-sm-down">Activator</th>
                <th class="hidden-sm-down">Stage</th>
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

    <b-modal id="deploy" size="lg" body-class="bg-white" title="Deploy">
      <v-select
              id="default-select"
              v-model="build"
              :options="['Large Magellanic Cloud', 'Andromeda Galaxy', 'SextansA']"
      />
      <b-form-textarea v-model="yaml" class="form-control" rows="24"></b-form-textarea>
    </b-modal>
  </div>
</template>

<script>
import $ from 'jquery';
/* eslint-disable */
import 'imports-loader?jQuery=jquery,this=>window!flot';
import 'imports-loader?jQuery=jquery,this=>window!flot/jquery.flot.pie';
import 'imports-loader?jQuery=jquery,this=>window!flot/jquery.flot.resize';
/* eslint-enable */
import Widget from '@/components/Widget/Widget';
import vSelect from 'vue-select';
import Api from '@/api/api';

const sampleYaml = "apiVersion: extensions/v1beta1\n" +
        "kind: Deployment\n" +
        "metadata:\n" +
        "  name: docker-jenkins-sample\n" +
        "  labels:\n" +
        "    app: nginx\n" +
        "spec:\n" +
        "  replicas: 3\n" +
        "  selector:\n" +
        "    matchLabels:\n" +
        "      app: nginx\n" +
        "  template:\n" +
        "    metadata:\n" +
        "      labels:\n" +
        "        app: nginx\n" +
        "    spec:\n" +
        "      containers:\n" +
        "        - name: nginx\n" +
        "          image: nginx:1.7.9\n" +
        "          ports:\n" +
        "            - containerPort: 80";

export default {
  name: 'Dashboard',
  components: {
    Widget, vSelect
  },
  props: {
    appId: {
      required: true
    }
  },
  data() {
    return {
      deployList: [],
      namespace: "Production",
      yaml: sampleYaml
    };
  },
  methods: {
    deploy() {
      this.$router.push({name: 'ApplicationDeploymentRegister', params: {appId: this.appId, namespace: this.namespace}})
    },
    updateDeployList() {
      // const list = [];
      // for (const i of Array(10).keys()) {
      //   list.push({
      //     id: i,
      //     namespace: 'Production',
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
    this.updateDeployList();
  },
};
</script>

<style src="./Deployment.scss" lang="scss" />
