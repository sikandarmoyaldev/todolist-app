const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

const config = getDefaultConfig(__dirname);

// Watch src/ folder
config.watchFolders = [path.resolve(__dirname, 'src')];

module.exports = config;
