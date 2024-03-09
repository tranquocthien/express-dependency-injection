import { UseMetadataArgs } from '@core/metadata/args/use';

/**
 * "Use middleware" metadata.
 */
export class UseMetadata {
  // -------------------------------------------------------------------------
  // Properties
  // -------------------------------------------------------------------------

  /**
   * Object class of the middleware class.
   */
  target: Function;

  /**
   * Method used by this "use".
   */
  method: string;

  /**
   * Middleware to be executed by this "use".
   */
  middleware: Function;

  /**
   * Indicates if middleware must be executed after routing action is executed.
   */
  afterAction: boolean;

  // -------------------------------------------------------------------------
  // Constructor
  // -------------------------------------------------------------------------

  constructor(args: UseMetadataArgs) {
    this.target = args.target;
    this.method = args.method as string;
    this.middleware = args.middleware;
    this.afterAction = args.afterAction;
  }
}
