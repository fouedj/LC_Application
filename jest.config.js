module.exports = {
  preset: 'react-native',
  verbose: true,
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  setupFilesAfterEnv: ['./jestSetup.js'],
  transformIgnorePatterns: ['node_modules/(?!@react-native|react-native)'],
  testPathIgnorePatterns: ['./App/navigation/'],
  coveragePathIgnorePatterns: ['./App/navigation/'],
  // moduleNameMapper: {
  //   '.+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$': 'jest-transform-stub',
  // },
  // collectCoverage: true,
  // collectCoverageFrom: [
  //   'app/**/*.js',
  //   '!app/**/*.test.js',
  //   '!**/node_modules/**',
  // ],
  //coverageDirectory: 'coverage',
  //coverageReporters: ['text', 'html'],
};
