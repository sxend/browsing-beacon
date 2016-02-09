declare var describe: any;
declare var it: any;
declare var expect: any;
import {isString} from '../src/utils/type-checker';

describe("test", () => {
  it('sample', function() {
    expect(isString("")).to.be.true;
  });
});
