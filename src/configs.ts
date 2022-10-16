export const configs = {
  dbHost: process.env.DB_HOST ?? 'localhost',
  dbPort: Number(process.env.DB_PORT) ?? 3306,
  dbUserName: process.env.DB_USERNAME ?? 'test',
  dbPassword: process.env.DB_PASSWORD ?? 'test',
  dbName: process.env.DB_NAME ?? 'test',
}
