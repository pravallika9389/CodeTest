var SectionMaster = require('../models/sectionmaster-model').SectionMaster,
    QuestionsMaster = require('../models/questionsmaster-model').QuestionsMaster;

exports.getQuestions = (sectionUuid) => {
  return new Promise(
    (resolve, reject) => {
      QuestionsMaster.find({'sectionUuid': sectionUuid})
      .then(questions => {
        resolve(questions);
      })
      .catch(err => {
        console.log('QuestionsMaster.getQuestions() returning err ' + err);
        reject(err);
      });
  });
}

exports.addQuestion = (questionObj) => {
  return new Promise(
    (resolve, reject) => {
      var questionToSave = new QuestionsMaster({
        uuid: utilities.getUuid(),
        timestamp: utilities.getTimestamp(),
        question: questionObj.question,
        sectionUuid: questionObj.sectionUuid
      });
      questionToSave.save()
      .then(savedQuestion => { resolve(savedQuestion); })
      .catch(err => { reject(err); })
  });
}
