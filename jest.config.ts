import type { Config } from 'jest';

const config: Config = {
  verbose: true,
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.{js,jsx}'],
  coverageDirectory: 'coverage',
  testEnvironment: 'jsdom',
};

export default config;
