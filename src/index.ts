import {UxperienceApplication} from './application';
import {ApplicationConfig} from '@loopback/core';

export {UxperienceApplication};

export async function main(options?: ApplicationConfig) {
  const app = new UxperienceApplication(options);
  await app.boot();
  await app.start();
  return app;
}
