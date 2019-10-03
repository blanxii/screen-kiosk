import container from 'simple-di';

import Sequelize from 'sequelize';

container.register('SQLConnection', () => {
  return new Sequelize(process.env.SQL_DATABASE, process.env.SQL_USER, process.env.SQL_PASSWORD, {
		host: process.env.SQL_HOST,
		dialect: 'mysql',
		pool: {
			max: 1,
			min: 0,
			idle: 10000
		},
	});
});


