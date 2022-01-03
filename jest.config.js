module.exports = {
  'roots': [
    '<rootDir>/tests',
    '<rootDir>/server'
  ],
  'transform': {
    '^.+\\.tsx?$': 'ts-jest'
  },
  'testRegex': '(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$',
  'moduleFileExtensions': [
    'ts',
    'tsx',
    'js',
    'jsx',
    'json',
    'node'
  ],
};

