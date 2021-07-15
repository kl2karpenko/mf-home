module.exports = {
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '^.+\\.svg$': 'jest-svg-transformer'
  },
  setupFilesAfterEnv: ['<rootDir>/setupTests.ts']
};
