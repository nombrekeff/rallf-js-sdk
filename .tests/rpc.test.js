const jsonrpc = require('../src/lib/jsonrpc');

describe('jsonrpc should', () => {
  it(`be defined`, () => {
    expect(jsonrpc).toBeDefined();
  });

  function validResponse(response) {
    expect(response.jsonrpc).toEqual('2.0');
    expect(response.method).toEqual('test');
    expect(response.result).toEqual({});
    expect(response.error).toBeFalsy();
  }


  it('should generate a valid request', () => {
    let request = jsonrpc.request('test', {}, 'id');
    expect(request.jsonrpc).toEqual('2.0');
    expect(request.params).toEqual({});
    expect(request.method).toEqual('test');
    expect(request.id).toEqual('id');
  });

  it('should generate a valid response without error', () => {
    let response = jsonrpc.response('test', 'id', {}, null);
    validResponse(response);
  });

  it('should generate a valid response with error', () => {
    let response = jsonrpc.response('test', 'id', {}, {});
    expect(response.jsonrpc).toEqual('2.0');
    expect(response.method).toEqual('test');
    expect(response.error).toEqual({});
    expect(response.result).not.toEqual({});
  });

});