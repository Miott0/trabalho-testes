module.exports = {
  roots: ['<rootDir>/src'],
  testMatch: ['**/?(*.)+(test|spec).[jt]s?(x)'],
  transform: {
    '^.+\\.(ts|tsx|js|jsx)$': 'babel-jest',
  },
  moduleNameMapper: {
    '\\.(css|less|sass|scss)$': 'identity-obj-proxy',
    '\\.(jpg|jpeg|png|gif|webp|svg)$': '<rootDir>/__mocks__/fileMock.js',
  },
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
  clearMocks: true,
  testEnvironment: 'jsdom',
  transformIgnorePatterns: [
    'node_modules/(?!(axios)/)',
  ],
  
  // Ativação da cobertura de código
  collectCoverage: true,
  collectCoverageFrom: [
    'src/test/*.{ts,tsx}', // Inclui arquivos TypeScript e TSX na pasta src
    '!src/**/*.d.ts',    // Exclui arquivos de declaração de tipos
    '!src/**/index.ts',  // Exclui arquivos de entrada principais (opcional)
  ],
  coverageDirectory: 'coverage', // Diretório onde a cobertura será salva
};
