import nunjucks from 'nunjucks';
import axios from 'axios';
import Promise from 'bluebird';

export default class PipelineController {

  handle() {
    return axios.get('https://jenkins.url/blue/organizations/jenkins/GUI%2FCI-Multibranch/activity').then((res) => {
      return nunjucks.renderString((response))
    });
  }
}
