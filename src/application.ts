import { controllers } from './modules/index';
import express, { Application as ExApplication, Handler } from 'express';
import { createExpressServer } from 'routing-controllers';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import { customMiddlewares } from './middlewares';
import TimeLeaveBenefitController from './modules/timeLeaveBenefit/timeLeaveBenefitController';
const compression = require('compression');

class Application {
  private _instance: ExApplication;

  get instance(): ExApplication {
    return this._instance;
  }

  constructor() {
    this._instance = createExpressServer({
      routePrefix: '/api/v1/',
      cors: true,
      controllers: [...controllers],
    });
    this._instance.use(compression());
    this._instance.use(express.json());
    // this.init();
  }

  //   private init() {
  //     const swaggerDocument = YAML.load('./swagger.yaml');
  //     this._instance.use(
  //       '/api-docs',
  //       swaggerUi.serve,
  //       swaggerUi.setup(swaggerDocument)
  //     );
  //     this._instance.use(customMiddlewares);
  //   }
}
export default new Application();
