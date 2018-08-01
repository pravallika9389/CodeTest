/*
 * This script is intended to be used by testers or for demo purposes.
 * This script sets up a sample database.
 */
const mongoose = require('mongoose');
const app = require('express')();
const utilities = require('../lib//models/utilities');
const configuration = require('../configuration').configuration;
const SectionMaster = require('../lib/models/sectionmaster-model').SectionMaster;
const QuestionsMaster = require('../lib/models/questionsmaster-model').QuestionsMaster;
const OptionsMaster = require('../lib/models/optionsmaster-model').OptionsMaster;

const opts = { server: { socketOptions: { keepAlive: 1 } } };

var section1 = new SectionMaster({
  uuid: utilities.getUuid(),
  timestamp: utilities.getTimestamp(),
  sectionname: 'Vehicle',
  status: 'active',
  catid: '1'
});
var section2 = new SectionMaster({
  uuid: utilities.getUuid(),
  timestamp: utilities.getTimestamp(),
  sectionname: 'Driver',
  status: 'active',
  catid: '1'
});
var section3 = new SectionMaster({
  uuid: utilities.getUuid(),
  timestamp: utilities.getTimestamp(),
  sectionname: 'Policy',
  status: 'active',
  catid: '1'
});
var sections = [section1.save(), section2.save(), section3.save()];

var question1 = new QuestionsMaster({
  uuid: utilities.getUuid(),
  timestamp: utilities.getTimestamp(),
  question: 'Select the Vehicle Manufacturer',
  sectionUuid: section1.uuid
});
var question2 = new QuestionsMaster({
  uuid: utilities.getUuid(),
  timestamp: utilities.getTimestamp(),
  question: 'Select the Model',
  sectionUuid: section1.uuid
});
var question3 = new QuestionsMaster({
  uuid: utilities.getUuid(),
  timestamp: utilities.getTimestamp(),
  question: 'Select the Fuel Type',
  sectionUuid: section1.uuid
});
var questions = [question1.save(), question2.save(), question3.save()];

var option1 = new OptionsMaster({
  uuid: utilities.getUuid(),
  timestamp: utilities.getTimestamp(),
  option: 'Maruti',
  ipath: '',
  questionUuid: question1.uuid
});
var option2 = new OptionsMaster({
  uuid: utilities.getUuid(),
  timestamp: utilities.getTimestamp(),
  option: 'Hyundai',
  ipath: '',
  questionUuid: question1.uuid
});
var option3 = new OptionsMaster({
  uuid: utilities.getUuid(),
  timestamp: utilities.getTimestamp(),
  option: 'Honda',
  ipath: '',
  questionUuid: question1.uuid
});
var option4 = new OptionsMaster({
  uuid: utilities.getUuid(),
  timestamp: utilities.getTimestamp(),
  option: 'Alto',
  ipath: '',
  questionUuid: question2.uuid
});
var option5 = new OptionsMaster({
  uuid: utilities.getUuid(),
  timestamp: utilities.getTimestamp(),
  option: 'Wagonar',
  ipath: '',
  questionUuid: question2.uuid
});
var option6 = new OptionsMaster({
  uuid: utilities.getUuid(),
  timestamp: utilities.getTimestamp(),
  option: 'Ertiga',
  ipath: '',
  questionUuid: question2.uuid
});
var option7 = new OptionsMaster({
  uuid: utilities.getUuid(),
  timestamp: utilities.getTimestamp(),
  option: 'Swift',
  ipath: '',
  questionUuid: question2.uuid
});
var option8 = new OptionsMaster({
  uuid: utilities.getUuid(),
  timestamp: utilities.getTimestamp(),
  option: 'Elite',
  ipath: '',
  questionUuid: question2.uuid
});
var option9 = new OptionsMaster({
  uuid: utilities.getUuid(),
  timestamp: utilities.getTimestamp(),
  option: 'Creta',
  ipath: '',
  questionUuid: question2.uuid
});
var option10 = new OptionsMaster({
  uuid: utilities.getUuid(),
  timestamp: utilities.getTimestamp(),
  option: 'Verna',
  ipath: '',
  questionUuid: question2.uuid
});
var option11 = new OptionsMaster({
  uuid: utilities.getUuid(),
  timestamp: utilities.getTimestamp(),
  option: 'Grand',
  ipath: '',
  questionUuid: question2.uuid
});
var option12 = new OptionsMaster({
  uuid: utilities.getUuid(),
  timestamp: utilities.getTimestamp(),
  option: 'Eon',
  ipath: '',
  questionUuid: question2.uuid
});
var option13 = new OptionsMaster({
  uuid: utilities.getUuid(),
  timestamp: utilities.getTimestamp(),
  option: 'Xcent',
  ipath: '',
  questionUuid: question2.uuid
});
var option14 = new OptionsMaster({
  uuid: utilities.getUuid(),
  timestamp: utilities.getTimestamp(),
  option: 'Petrol',
  ipath: '',
  questionUuid: question3.uuid
});
var option15 = new OptionsMaster({
  uuid: utilities.getUuid(),
  timestamp: utilities.getTimestamp(),
  option: 'Diesel',
  ipath: '',
  questionUuid: question3.uuid
});
var option16 = new OptionsMaster({
  uuid: utilities.getUuid(),
  timestamp: utilities.getTimestamp(),
  option: 'CNG',
  ipath: '',
  questionUuid: question3.uuid
});

var options = [ option1.save(), option2.save(), option3.save(), option4.save(), option5.save(),
                option6.save(), option7.save(), option8.save(), option9.save(), option10.save(),
                option11.save(), option12.save(), option13.save(), option14.save(), option15.save(),
                option16.save()];

// return mongodb connection string
var getDbConnection = (env) => {
  if (!env || env === undefined) { env = app.get('env'); }

  switch(env) {
    case 'development': return configuration.mongo.development.connectionString;
    case 'test': return configuration.mongo.test.connectionString;
    case 'production': return configuration.mongo.production.connectionString;
    default: return null;
  }
};

//jshint unused:false
var setupDB = (dbConnection) => {
  return new Promise((resolve, reject) => {
    var dbConnectionMustBeClosedOnExit = false;
    if (!dbConnection || dbConnection === undefined) {
      mongoose.connect(getDbConnection(app.get('env')));
      dbConnectionMustBeClosedOnExit = true; // DB connection must not be closed if sent by a calling method
    }
    Promise.all([
      sections,
      questions,
      options,
    ])
    .then(messages => {
      messages.forEach(m => {console.info('\nsaved %j', m);});
      if (dbConnectionMustBeClosedOnExit) { mongoose.disconnect(); }
      resolve(true);
    })
    .catch(err => {
      if (dbConnectionMustBeClosedOnExit) { mongoose.disconnect(); }
      reject(err);
    });
  });
};


  if (require.main === module) {
    setupDB()
    .then(result => { console.info('result: ' + result); })
    .catch(err => { console.error('err: ' + err); });
  }
  else {
    module.exports = {setupDB};
  }
