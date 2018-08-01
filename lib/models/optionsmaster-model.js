var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var optionSchema = Schema({
  uuid: {type: String, required: [true, 'profile uuid is required']},
  timestamp: {type: Date, required: [true, 'creation timestamp is required']},
  option: {type: String, required: [true, 'Option is required']},
  ipath: String,
  questionUuid: {type: String, ref: 'QuestionsMaster'}
});

exports.OptionsMaster  = mongoose.model('OptionsMaster', optionSchema);
