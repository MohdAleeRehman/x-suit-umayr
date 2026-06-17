export default {
  testEnvironment: 'node',
  testMatch: ['**/tests/**/*.test.js'],
  collectCoverageFrom: [
    'src/controllers/**/*.js',
    'src/middleware/**/*.js',
    'src/routes/**/*.js'
  ],
  coveragePathIgnorePatterns: ['/node_modules/', '/tests/fixtures/'],
  verbose: true
};
