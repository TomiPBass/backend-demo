import { databaseModels } from '@backend-demo/backend-libs/tables';
import { Sequelize } from 'sequelize-typescript';

export const databaseProviders = [
	{
		provide: 'SEQUELIZE',
		useFactory: async () => {
			const sequelize = new Sequelize({
				dialect: 'postgres',
				host: 'localhost',
				port: 54320,
				username: 'postgres',
				password: 'postgres',
				database: 'backend-demo',
			});
			sequelize.addModels(databaseModels);
			await sequelize.sync();
			return sequelize;
		},
	},
];
