# Selenium Tips for Nightwatch Cucumber

# Docker

Hub
```
docker run -d -v /etc/localtime:/etc/localtime:ro --env GRID_BROWSER_TIMEOUT=30 -p 4445:4444 --env GRID_MAX_SESSION=5 --env GRID_CLEAN_UP_CYCLE=5000   --name selenium-hub selenium/hub:3.6.0
```
Node Chrome
```
docker run -d -v /etc/localtime:/etc/localtime:ro --env NODE_MAX_SESSION=1 --env NODE_CLEAN_UP_CYCLE=5000    --link selenium-hub:hub selenium/node-chrome:3.6.0
```
# Nightwatch Cucumber Retry Failed Feature Test:
Nightwatch Cucumber does support rerun failed feature test. bcoz some feature test will be flaky, failed when running parallel threads, could be passed by running single threaded.

Note: It's good to avoid flaky test. fix the falky test

Rerun Process:
1. Inital Nightwatch-Cucmber Config
```
  "cucumberArgs": [
    "--require",
    "./test/features/step_definitions",
    "--require",
    "./test/timeout.js",
    "--format",
    "pretty",
    "--format",
    "json:./reports/cucumber.json",
    "./test/features"
  ]
```
2. npm run nightwatch // with parallell threads
3. After completion of feature test, It will geneate a reports in ``reports\cucmber.json`` folder. reports hold failed and passed test
4. run extractFailedFeatureTest.js , it will genearte a failed test to file ``/test/rerun/@rerun.feature``
5. @rerun.feature
```
/project-dir/test/features/login.feature:72
/project-dir/test/features/search.feature:26
```
6. Nightwatch Cucmber rerun config, please run as single thread
```
nightwatch_config.cucumberArgs = [
	"--require",
	"./test/features/step_definitions",
	"--require",
	"./test/timeout.js",
	"--format",
	"pretty",
	"--format",
	"json:./reports/cucumber.json",
	"./test/rerun"
];
```
7. If you want to retry 2 times, again go with steps 4,5,6.

# Infrastruture Tips:

1. 2 Core Processor - Go with 2 Parallel Threads - 4 Docker Chrome Node - 1 Hub
```
Note: Even if you have 16 GB doesn't matter. please go with 2 Parallel Threads
```
Formula
```
if 2 Core/ 4 GB then Go with Go with 2 Parallel Threads - 4 Docker Chrome Node - 1 Hub

if 4 Core/ 6 GB then Go with Go with 4 Parallel Threads - 6 Docker Chrome Node - 1 Hub

if 6 Core/ 8 GB then Go with Go with 6 Parallel Threads - 8 Docker Chrome Node - 1 Hub

if 8 Core/ 10 GB then Go with Go with 8 Parallel Threads - 10 Docker Chrome Node - 1 Hub
```

# Cucumber Tips

1.  Should have 10 Scenarios per Feature File
```
Note:
Nightwatch Cucumber Parallel Threads go by Feature Files not by Scenarios
```

```
30 Scenarios per Feature File - having 30 Feature File

1 Feature File taken 2 min

4 Threads = 30 Feature Files / 4 = 7.5 = 7.5 * 2 min = 15 min
6 Threads = 30 Feature Files / 6 = 5 = 5 * 2 min = 10 min
8 Threads = 30 Feature Files / 8 = 3.7 = 3.7 * 2 min = 7.4 min
```
Optimized
```
10 Scenarios per Feature File - having 90 Feature File

1 Feature File taken 0.66 min

4 Threads = 90 Feature Files / 4 = 22.5 = (4 threads) 0.66 min + 18.25 = 12.70 min
6 Threads = 90 Feature Files / 6 = 15 =  (6 threads) 0.66m + 9 * 0.66 min = 6.6 min
8 Threads = 90 Feature Files / 8 = 11.25 = (8 threds) 0.66m + 3.25 * 0.66 min = 2.805 min
```



