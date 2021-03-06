import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { hasMany, belongsTo } from 'ember-data/relationships';
import {getDefaultDate} from 'lockerbeast/utils/date-tools';

export default Model.extend({
  name: attr('string'),
  category: belongsTo('category', {inverse: null}),
  comments: hasMany('comment'),
  image: attr('array'),
  created: attr('number', {
    defaultValue: getDefaultDate
  }),
  member: belongsTo('member'),
  ratings: hasMany('rating', {inverse: null}),
  
  getAllRatings() {
    this.getRatingsContainer()
      .then(ratingsContainer => {
        return ratingsContainer.getRatings();
      });
  },

  getRatingsContainer() {
    return this.get('ratableContent')
      .then((ratableContent) => {
        if (!ratableContent) {
          ratableContent = this.store.createRecord('ratable-content', {
            recommendation: this
          });
          return ratableContent.save();
        }
        return ratableContent;
      });
  },

  getAverageRating() {
    return this.getRatingsContainer()
      .then(ratingsContainer => ratingsContainer.getAverageRating());
  }

});
