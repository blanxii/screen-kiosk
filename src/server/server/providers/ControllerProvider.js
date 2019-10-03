import container from 'simple-di';
import indexController from '../controllers/IndexController';
import PipelineController from '../controllers/PipelineController';

container.register('indexController', () => {
  return new indexController();
});

container.register('pipelineController', () => {
  return new PipelineController();
});
