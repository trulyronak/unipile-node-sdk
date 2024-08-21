/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

const config = {
  //   preset: 'ts-jest',
  testEnvironment: 'node',
  verbose: true,
  transform: {
    '^.+\\.[tj]sx?$': 'babel-jest',
  },
  //   moduleFileExtensions: ['js', 'ts', 'json'],
  modulePathIgnorePatterns: ['/node_modules/'],
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageReporters: ['html'],
  moduleNameMapper: {
    '^(.+)\\.js$': '$1',
  },
};

export default config;
