import { ApplicationConfig } from '@loopback/core';
import { RestApplication, RestServer, RestBindings } from '@loopback/rest';
import { MySequence } from './sequence';

/* tslint:disable:no-unused-variable */
// Binding and Booter imports are required to infer types for BootMixin!
import { BootMixin, Booter, Binding } from '@loopback/boot';
/* tslint:enable:no-unused-variable */

import { Class, Repository, RepositoryMixin, juggler } from '@loopback/repository';
import { SSL_OP_NETSCAPE_DEMO_CIPHER_CHANGE_BUG } from 'constants';

export class UxperienceApplication extends BootMixin(
  RepositoryMixin(RestApplication)
) {
  constructor(options?: ApplicationConfig) {
    super({
      rest: {
        port: process.env.PORT || 3000
      }
    });

    // Set up the custom sequence
    this.sequence(MySequence);

    this.projectRoot = __dirname;
    // Customize @loopback/boot Booter Conventions here
    this.bootOptions = {
      controllers: {
        // Customize ControllerBooter Conventions here
        dirs: ['controllers'],
        extensions: ['.controller.js'],
        nested: true
      },
    };


    // let dataSourceConfig = new juggler.DataSource({
    //   name: "db",
    //   connector: "memory"
    // });
    // this.dataSource(dataSourceConfig);

    // Use below for an in-memory database

    // let dataSourceConfig = new juggler.DataSource({
    //   name: "db",
    //   connector: "loopback-connector-mysql",
    //   host: 'localhost',
    //   port: 3306,
    //   database: 'uxperience',
    //   user: 'root',
    //   password: ''

    // });


    // this.dataSource(dataSourceConfig);


    let dataSourceConfig = new juggler.DataSource({
      name: "db",
      connector: "loopback-connector-mysql",
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      database: process.env.DB_DATABASE,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD

    });
    this.dataSource(dataSourceConfig);
  }

  async start() {
    await super.start();

    const server = await this.getServer(RestServer);
    const port = await server.get(RestBindings.PORT);
    console.log(`Server is running at http://127.0.0.1:${port}`);
    console.log(`Try http://127.0.0.1:${port}/ping`);
  }
}
