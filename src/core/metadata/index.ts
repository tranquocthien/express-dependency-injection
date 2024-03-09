import { MetadataArgsStorage } from '@core/metadata/builder/metadataArgsStorage';
/**
 * Gets metadata args storage.
 * Metadata args storage follows the best practices and stores metadata in a global variable.
 */
export function getMetadataArgsStorage(): MetadataArgsStorage {
  if (!(global as any).routingControllersMetadataArgsStorage)
    (global as any).routingControllersMetadataArgsStorage =
      new MetadataArgsStorage();

  return (global as any).routingControllersMetadataArgsStorage;
}
