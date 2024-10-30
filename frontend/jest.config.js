module.exports = {
    roots: ['<rootDir>/src'],
    testMatch: ['**/?(*.)+(test|spec).[jt]s?(x)'],
    transform: {
      '^.+\\.(ts|tsx|js|jsx)$': 'babel-jest', // Para transpilar TypeScript e JavaScript com Babel
    },
    moduleNameMapper: {
      '\\.(css|less|sass|scss)$': 'identity-obj-proxy', // Ignorar importação de arquivos CSS
      '\\.(jpg|jpeg|png|gif|webp|svg)$': '<rootDir>/__mocks__/fileMock.js', // Ignorar assets
    },
    setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
    clearMocks: true,
    testEnvironment: 'jsdom',
    transformIgnorePatterns: [
      'node_modules/(?!(axios)/)', // Exceção para transformar 'axios'
    ],
};