import axios from 'axios';
import qs from 'querystring';

const api = axios.create({
    baseURL: "http://106.10.35.161:5850"
});

export default {
    getApplicationList() {
        return api.get("/app")
    },

    getRecentBuildList(appId) {
        return api.get(`/app/${appId}/build`)
    },

    getRecentDeployList(appId) {
        return api.get(`/app/${appId}/deploy`)
    },

    getBuildList(appId, branch) {
        return api.get(`/app/${appId}/branch/${branch}`)
    },

    login(id, pw) {
        return api.post("/user/login", qs.stringify({
            "email_id": id,
            "password": pw,
            "name": ""
        }), {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
        })
    },

    build(appId, branch) {
        return api.post(`/app/${appId}/branch`, qs.stringify({
            "branch_name": branch
        }), {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
        })
    },

    deploy(appId, buildId, namespace, yaml) {
        return api.post(`/app/${appId}/deploy`, qs.stringify({
            "build_id": buildId,
            "namespace": namespace,
            "yaml": yaml
        }), {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
        })
    }
}