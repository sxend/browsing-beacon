declare var describe: any;
declare var it: any;
declare var expect: any;
import {TypeChecker} from '../src/utils/type-checker';

describe("test", () => {
  it('sample', function() {
    expect(TypeChecker.isString("")).to.be.true;
  });
});
