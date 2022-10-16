import { DataSource } from 'typeorm'
import { configs } from './configs'

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: configs.dbHost,
  port: configs.dbPort,
  username: configs.dbUserName,
  password: configs.dbPassword,
  database: configs.dbName,
  entities: ['../dist/entity/*.js'],
  synchronize: true,
  logging: false,
})
