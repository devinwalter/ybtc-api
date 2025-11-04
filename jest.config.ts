import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/src'],
  modulePaths: ['<rootDir>/src'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@config$': '<rootDir>/src/config',
    '^@config/(.*)$': '<rootDir>/src/config/$1',
    '^@controllers$': '<rootDir>/src/controllers',
    '^@controllers/(.*)$': '<rootDir>/src/controllers/$1',
    '^@middleware$': '<rootDir>/src/middleware',
    '^@middleware/(.*)$': '<rootDir>/src/middleware/$1',
    '^@repositories$': '<rootDir>/src/repositories',
    '^@repositories/(.*)$': '<rootDir>/src/repositories/$1',
    '^@routes$': '<rootDir>/src/routes',
    '^@routes/(.*)$': '<rootDir>/src/routes/$1',
    '^@services$': '<rootDir>/src/services',
    '^@services/(.*)$': '<rootDir>/src/services/$1',
    '^@types$': '<rootDir>/src/types',
    '^@types/(.*)$': '<rootDir>/src/types/$1',
    '^@utils$': '<rootDir>/src/utils',
    '^@utils/(.*)$': '<rootDir>/src/utils/$1',
    '^@constants$': '<rootDir>/src/constants',
    '^@constants/(.*)$': '<rootDir>/src/constants/$1',
    '^@connectors$': '<rootDir>/src/connectors',
    '^@connectors/(.*)$': '<rootDir>/src/connectors/$1',
  },
  collectCoverageFrom: ['src/**/*.{ts,tsx}', '!src/index.ts', '!src/config/'],
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov', 'clover'],
  coverageThreshold: {
    global: {
      statements: 90,
    },
  },
  setupFilesAfterEnv: ['<rootDir>/test/setup.ts'],
};

export default config;
