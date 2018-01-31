const fs = require('fs');

function IsJsonString(str) {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
}

function getFailedFeatures(testReport) {
  if (testReport && IsJsonString(testReport)) {
    let failedFeatures = [];
    let features = JSON.parse(testReport);
    features.map(function(feature) {
      return feature.elements.map(function(element) {
        failure = feature.uri + ':' + element.line;
        return element.steps.map(function(step) {
          if (step.result.status === 'failed') failedFeatures.push(failure);
        });
      });
    });
    return failedFeatures;
  } else {
    return [];
  }
}

function exitWithResponse(failedFeatures) {
  if (failedFeatures && Object.keys(failedFeatures).length > 0 ) {
    console.log('Failed Features : ' + Object.keys(failedFeatures).length);
    process.exit(1);
  } else {
    console.log('All Features Passed :-)');
    process.exit(0);
  }
}


function extract() {
  let failedFeatures = [];
  const testReport = fs.readFileSync('./reports/cucumber.json', 'utf8');
  failedFeatures = getFailedFeatures(testReport);

  failedFeatures = failedFeatures.reduce(function(map, word) {
    map[word] = (map[word] || 0) + 1;
    return map;
  }, Object.create(null));
  let stream = fs.createWriteStream('./test/rerun/@rerun.feature');
  stream.once('open', function(fd) {
   for(feature in failedFeatures) {
    stream.write(feature + '\n');
   }
   stream.end();
  });
  stream.on('finish', function() {
   exitWithResponse(failedFeatures);
  });
}

extract();

