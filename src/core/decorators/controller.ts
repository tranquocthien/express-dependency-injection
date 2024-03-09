import { getMetadataArgsStorage } from '@core/metadata';
import { ControllerOptions } from '@core/decorators/options/controller';

/**
 * Defines a class as a controller.
 * Each decorated controller method is served as a controller action.
 * Controller actions are executed when request come.
 *
 * @param baseRoute Extra path you can apply as a base route to all controller actions
 * @param options Extra options that apply to all controller actions
 */
export function Controller(
  baseRoute?: string,
  options?: ControllerOptions
): Function {
  return function (object: Function) {
    getMetadataArgsStorage().controllers.push({
      type: 'default',
      target: object,
      route: baseRoute || '/',
      options: options as ControllerOptions,
    });
  };
}
