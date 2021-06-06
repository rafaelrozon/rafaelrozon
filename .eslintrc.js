module.exports = {
    env: {
        jest: true
    },
    extends: [
        'airbnb',
        // 'plugin:@typescript-eslint/recommended',
        'plugin:import/errors',
        'plugin:import/warnings',
        // 'plugin:import/typescript',
        'prettier'
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
            modules: true
        },
        ecmaVersion: 2018,
        sourceType: 'module'
    },
    plugins: ['@typescript-eslint', 'react'],
    rules: {
        'import/no-extraneous-dependencies': [
            'off',
            {
                devDependencies: ['**/*.stories.tsx', '**/*.test.tsx', '**/*.spec.js']
            }
        ],
        'import/prefer-default-export': 'off',
        'react/jsx-filename-extension': ['error', { extensions: ['.jsx', '.tsx', '.stories.tsx'] }],
        'class-methods-use-this': 'off',
        "arrow-body-style": "off",
        "import/extensions": "off"
    },
    overrides: [
        {
            files: ['babel.config.js', 'jest.config.js', 'webpack.**.js', '.prettier.js'],
            rules: {
                '@typescript-eslint/no-var-requires': 'off'
            }
        }
    ]
};
