import { handler } from '../src/functions/health/health';
import { expect } from 'chai';

describe('Health function', () => {
  it('should return the correct message', async () => {
    const response = await handler();

    expect(response.statusCode).to.be.equal(200);
    expect(JSON.parse(response.body)).to.deep.equal({
      message: 'Hello, World!'
    });
  });
});
