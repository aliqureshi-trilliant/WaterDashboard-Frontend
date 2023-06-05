module.exports = {
    env: { browser: true, es2020: true },
    extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:react/jsx-runtime',
        'plugin:react-hooks/recommended',
    ],
    parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
    settings: { react: { version: '18.2' } },
    plugins: ['react-refresh'],
    rules: {
        'react-refresh/only-export-components': 'warn',
        'react/prop-types': 0,
        'quotes': ['error','single'],
        'indent': ['error', 4],
        'semi': ['error', 'always'],
        'no-multi-spaces': 'error',
        'no-trailing-spaces': 'error',
        'no-unused-vars': 'ignore',
        'eol-last': ['error','always']
    },
};
