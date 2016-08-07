import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('recommendation-listings/listing', 'Integration | Component | recommendation listings/listing', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{recommendation-listings/listing}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#recommendation-listings/listing}}
      template block text
    {{/recommendation-listings/listing}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
