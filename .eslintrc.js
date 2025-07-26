module.exports = {
  root: true,
  extends: '@react-native',
  env: {
    jest: true,
  },
  overrides: [
    {
      files: [
        '**/*.test.js',
        '**/*.test.ts',
        '**/*.test.tsx',
        '**/*.spec.js',
        '**/*.spec.ts',
        '**/*.spec.tsx',
        'jest.setup.js',
      ],
      env: {
        jest: true,
      },
    },
  ],
};
