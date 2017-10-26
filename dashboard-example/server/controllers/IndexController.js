import nunjucks from 'nunjucks';
import path from 'path';
import scheduler from './../../config/scheduler.json';
import container from '../container';

export default class IndexController {

  constructor() {

  }

  handle(io, page = 0) {
    this._io = io;

    this.getPageById({ pageNumber: 0});
  }

  getPageById({ pageNumber = 0})
  {
      const job = scheduler.pages[pageNumber] || scheduler.pages[0];
      pageNumber = (scheduler.pages[pageNumber]) ? pageNumber : 0;
      console.log(job.type, 'end');

      if (this._timer) {
        clearInterval(this._timer);
      }

      const that = this;
      this._timer = setTimeout((that, job) => {
        this.sendPageToClient({ pageNumber, job })
      }, job.duration * 1000);
  }

  sendPageToClient({ pageNumber, job }) {
    if (job.type === "display-html") {
          this._io.emit('display-html', nunjucks.render(path.resolve(__dirname, '../../client/templates/' + job.data)));
    } else {
        const controllerResult = container.get(job.data).handle().then((res) => {
          console.log('resolve');
          if (controllerResult === null) {
            this.stopAndDispatchNext({ pageNumber });
          } else {
            this._io.emit('display-html', container.get(job.data).handle());
          }
        }).catch((err) => {
            console.log('rejected');
            console.log(err);
            this.stopAndDispatchNext({ pageNumber });
        });
    }

  }

  stopAndDispatchNext({ pageNumber })
  {
    clearInterval(this._timer);
    this.getPageById({ pageNumber: pageNumber+1 });
  }

  getWidgets({ io }) {

  }
}
