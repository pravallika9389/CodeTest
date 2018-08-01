var OptionsMaster = require('../models/optionsmaster-model').OptionsMaster,
    QuestionsMaster = require('../models/questionsmaster-model').QuestionsMaster;

exports.getOptionsByQUuid = (questionUuid) => {
  return new Promise(
    (resolve, reject) => {
      OptionsMaster.find({'questionUuid': questionUuid})
      .then(options => {
        resolve(options);
      })
      .catch(err => {
        console.log('OptionsMaster.getOptions() returning err ' + err);
        reject(err);
      });
  });
}

exports.addOption = (optionObj) => {
  return new Promise(
    (resolve, reject) => {
      var optionToSave = new OptionsMaster({
        uuid: utilities.getUuid(),
        timestamp: utilities.getTimestamp(),
        option: optionObj.option,
        ipath: '',
        questionUuid: optionObj.questionUuid
      });
      optionToSave.save()
      .then(savedOption => { resolve(savedOption); })
      .catch(err => { reject(err); })
  });
}
