import { moduleForModel, test } from 'ember-qunit';

moduleForModel('member-social', 'Unit | Model | member social', {
  // Specify the other units that are required for this test.
  needs: ['model:member']
});

test('it exists', function(assert) {
  let model = this.subject();
  // let store = this.store();
  assert.ok(!!model);
});
