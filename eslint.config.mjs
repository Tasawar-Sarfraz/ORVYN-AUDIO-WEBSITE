export default [
  {
    ignores: ['.next/**', 'out/**', 'node_modules/**', '**/*.ts', '**/*.tsx', '**/*.css'],
  },
  {
    files: ['**/*.js', '**/*.mjs'],
    rules: {
      'no-unused-vars': 'warn',
      'no-undef': 'error',
    },
  },
];
