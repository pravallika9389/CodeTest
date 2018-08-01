var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var sectionSchema = Schema({
  uuid: {type: String, required: [true, 'Section uuid is required']},
  timestamp: {type: Date, required: [true, 'Section creation timestamp is required']},
  sectionname: {type: String, required: [true, 'Section Name is required']},
  status: {type: String, required: [true, 'user\'s current status is required']},
  catid: String
});

exports.SectionMaster = mongoose.model('SectionMaster', sectionSchema);
