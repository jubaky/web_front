<template>
  <div class="login-page">
    <b-container>
      <h5 class="logo">
        <i class="fa fa-circle text-gray" />
        Jubaky K8S
        <i class="fa fa-circle text-warning" />
      </h5>
      <Widget class="mx-auto" title="<h3 class='mt-0'>Login to your Web App</h3>" customHeader>
        <p class="text-muted fs-sm">
          계정 생성은 관리자에게 문의해주세요.
        </p>
        <form class="mt" @submit.prevent="login">
          <b-alert class="alert-sm" variant="danger" :show="!!errorMessage">
            {{errorMessage}}
          </b-alert>
          <div class="form-group">
            <input class="form-control no-border" ref="username"
              required type="text" name="username" placeholder="Username" />
          </div>
          <div class="form-group">
            <input class="form-control no-border" ref="password"
            required type="password" name="password" placeholder="Password" />
          </div>
          <div class="clearfix">
            <div class="btn-toolbar float-right">
              <b-button type="submit" size="sm" variant="inverse">Login</b-button>
            </div>
          </div>
        </form>
      </Widget>
    </b-container>
  </div>
</template>

<script>
import Widget from '@/components/Widget/Widget';
import Api from '@/api/api';

export default {
  name: 'LoginPage',
  components: { Widget },
  data() {
    return {
      errorMessage: null,
    };
  },
  methods: {
    login() {
      const username = this.$refs.username.value;
      const password = this.$refs.password.value;

      if (username.length !== 0 && password.length !== 0) {
        Api.login(username, password)
                .then(response => {
                  if (response.data.code === 0) {
                    window.localStorage.setItem('authenticated', 'true');
                    this.$router.push('/app/dashboard');
                  } else {
                    this.errorMessage = response.data.message;
                  }
                });
      }
    },
  },
  created() {
    if (window.localStorage.getItem('authenticated') === 'true') {
      this.$router.push('/app/dashboard');
    }
  },
};
</script>

<style src="./Login.scss" lang="scss" scoped />
