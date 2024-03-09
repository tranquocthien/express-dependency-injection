/* eslint-disable @typescript-eslint/ban-types */

/**
 * Extra options that apply to each controller action.
 */
export interface ControllerOptions {
  /**
   * If set to false, class-transformer won't be used to perform request serialization.
   */
  transformRequest?: boolean;

  /**
   * If set to false, class-transformer won't be used to perform response serialization.
   */
  transformResponse?: boolean;
}

/**
 * Controller metadata used to storage information about registered controller.
 */
export interface ControllerMetadataArgs {
  /**
   * Indicates object which is used by this controller.
   */
  target: Function;

  /**
   * Base route for all actions registered in this controller.
   */
  route: string;

  /**
   * Controller type. Can be default or json-typed. Json-typed controllers operate with json requests and responses.
   */
  type: 'default' | 'json';

  /**
   * Options that apply to all controller actions.
   */
  options: ControllerOptions;
}
