import Em from 'ember';
import is from 'lockerbeast/utils/is';
import _ from 'lodash';


const setDefaults = (item) => {
  item.value = item.default || '';
  return item;
};
const applyTransforms = (item) => {
  let transform = is.callable(item.transform) ? item.transform : (c) => c;
  set(item, '_value', transform(get(item,'value')));
  return item;
};
const copyObjectOrArray = (item) => {
  if (is.object(item)) {
    return Object.assign(item);
  }
  else if (is.array(item)) {
    return [].concat(item);
  }
  else {
    return item;
  }
};

const fieldHasValidationFn = (item) => typeof item.validation === "function";
const checkIfFieldFailsValidation = (field) => !field.validation(field.value);


/**
 *
 * @type {
 *   {
 *     formClass: string,
 *     containerClass: string,
 *     fieldWrapperClass: string,
 *     labelWrapperClass: string,
 *     submitBtnClass: string,
 *     submitBtnText: string,
 *     passThrough: null|object,
 *     formFields: array<object>,
 *     _formFields: (Ember.ComputedProperty|*),
 *     allFinalValues: (Ember.Object) cobination of finished form fields and passthrough values,
 *     submitIsDisabled: (Ember.ComputedProperty|*),
 *     callbackSubmit: (Ember.ComputedProperty|*),
 *     actions: {
 *       onSubmitForm: (function())
 *     }
 *   }
 * }
 */
export default Em.Component.extend({

  formClass: 'form form-horizontal',
  containerClass: 'form-group',
  fieldWrapperClass: 'col-sm-10',
  labelClass: 'col-sm-2 control-label',
  submitBtnClass: '',
  submitBtnText: 'Submit',

  passThrough: null,
  formFields: [],

  _formFields: Em.computed('formFields.[]', function () {
    return get(this, 'formFields')
      .map(setDefaults);
  }),

  didReceiveAttrs() {
    this._super(...arguments);
    console.log('DID RECEIVE ATTRS');
    debugger;
    console.log('DID RECEIVE ATTRS');
  },
  allFinalValues: Em.computed('_formFields', 'passThrough', function () {
    const passThrough = is.object(get(this, 'passThrough')) ? get(this, 'passThrough') : {};
    const finalFormValues = _(get(this, '_formFields'))
      .filter((v) => !!v.attr)
      .map(applyTransforms)
      .mapKeys('attr')
      .mapValues('_value')
      .value();

    return _.merge(finalFormValues, passThrough);
  }),

  submitIsDisabled: Em.computed('_formFields.@each.value', function () {
    return get(this, '_formFields')
      .filter(fieldHasValidationFn)
      .some(checkIfFieldFailsValidation);
  }),


  callbackSubmit: Em.computed('onSubmit', function () {
    return is.callable(get(this, 'onSubmit')) ? get(this, 'onSubmit') : (formValues) => formValues;
  }),

  actions: {
    onSubmitForm() {
      this._super(...arguments);

      console.log('SUBMITTED FORM!!');
      debugger;
      this.$('form').trigger('reset');
      get(this, 'callbackSubmit')(this.get('allFinalValues'));
    }
  }
});
