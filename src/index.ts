import {StarmyAgentApplication} from './application';
import {ApplicationConfig} from '@loopback/core';

export {StarmyAgentApplication};

export async function main(options: ApplicationConfig = {}) {
  const app = new StarmyAgentApplication(options);
  await app.boot();
  await app.start();

  const url = app.restServer.url;
  console.log(`Server is running at ${url}`);

  return app;
}
