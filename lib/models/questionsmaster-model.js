var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var questionSchema = Schema({
  uuid: {type: String, required: true},
  timestamp: {type: Date, required: true},
  question: {type: String, required: true},
  sectionUuid: {type: String, ref: 'SectionMaster'},
  // optionUuid: {type: String, ref: 'OptionsMaster'}
});

exports.QuestionsMaster = mongoose.model('QuestionsMaster', questionSchema);
