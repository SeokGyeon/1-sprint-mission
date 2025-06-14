require('dotenv').config({ path: '.env.test' });

module.exports = {
  testEnvironment: 'node',
  verbose: true,
  testMatch: ['**/*.test.ts'],
  transform: {
    '^.*\\.ts$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'js'],
};
