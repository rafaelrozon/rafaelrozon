module.exports = {
    root: true,
    env: {
        jest: true,
        browser: true,
        node: true
    },
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:react-hooks/recommended',
        'plugin:import/recommended',
        'plugin:import/typescript',
        'prettier'
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaFeatures: {
            jsx: true
            // modules: true
        }
    },
    plugins: ['@typescript-eslint', '@emotion', 'react'],
    rules: {
        '@typescript-eslint/no-unused-vars': ['error', { varsIgnorePattern: 'jsx' }]
    },
    overrides: [
        {
            files: ['*.ts', '*.tsx'], // Your TypeScript files extension
            parserOptions: {
                project: ['./tsconfig.json'] // Specify it only for TypeScript files
            }
        }
    ]
};
