/* eslint-disable */
export default {
  displayName: 'netflicks',
  preset: '../../jest.preset.js',
  coverageDirectory: '../../coverage/apps/netflicks',
  transform: {
    '^.+\\.(ts|mjs|js|html)$': [
      'jest-preset-angular',
      {
        tsconfig: '<rootDir>/tsconfig.spec.json',
        stringifyContentPathRegex: '\\.(html|svg)$',
      },
    ],
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'html', 'mjs'],
  transformIgnorePatterns: [
    'node_modules/(?!.*\\.mjs$|swiper|ssr-window|dom7|tslib).*/',
  ],
  snapshotSerializers: [
    'jest-preset-angular/build/serializers/no-ng-attributes',
    'jest-preset-angular/build/serializers/ng-snapshot',
    'jest-preset-angular/build/serializers/html-comment',
  ],
};
