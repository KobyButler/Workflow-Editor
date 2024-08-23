module.exports = {
    setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],
    transformIgnorePatterns: [
        '/node_modules/(?!react-dnd|react-dnd-html5-backend|dnd-core|@react-dnd)'
    ],
    moduleNameMapper: {
        '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
        '\\.(gif|ttf|eot|svg|woff2?)$': '<rootDir>/src/__mocks__/fileMock.js'
    },
};
