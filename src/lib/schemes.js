'use strict';
const manifestScheme = require('./schemes/manifest.scheme.json');
const jsonRpcRequest = require('./schemes/json-rpc-request.scheme.json');
const jsonRpcResponse = require('./schemes/json-rpc-response.scheme.json');


module.exports = {
  manifest: manifestScheme,
  jsonRpcRequest: jsonRpcRequest,
  jsonRpcResponse: jsonRpcResponse
};