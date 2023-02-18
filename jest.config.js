const nextJest = require('next/jest')

const createJestConfig = nextJest({
    dir: './'
})

const customJestConfig = {
    moduleDirectories: ['node_modules', '<rootDir>/'],
    testEnvironment: 'jest-environment-jsdom',
    moduleNameMapper: {
        '^@firebase/app': require.resolve('@firebase/app'),
        '^@firebase/firestore': require.resolve('@firebase/firestore'),
        '^@firebase/util': require.resolve('@firebase/util'),
        '^@firebase/auth': require.resolve('@firebase/auth')
    }
}

module.exports = createJestConfig(customJestConfig)
