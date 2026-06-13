// metro.config.js — allow bundling the SQLite content database as an asset
const { getDefaultConfig } = require('expo/metro-config');
const config = getDefaultConfig(__dirname);
config.resolver.assetExts.push('db');
module.exports = config;
