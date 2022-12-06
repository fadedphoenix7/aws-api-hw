const {lamda} = require('../connection/aws');

const pullParams = {
    FunctionName : 'uady-lambda-hour-ranges',
    InvocationType : 'RequestResponse',
};

const getLamda = (res) => {
  try{
    lamda.invoke(pullParams, function(err, data) {
      if (err) return res.status(500).send(err)
      pullResults = JSON.parse(data.Payload);
      res.status(pullResults.statusCode).send(pullResults.body)   
   });
  }
  catch(err){
    res.status(500).send(err);
  }
  
}

module.exports = {getLamda}