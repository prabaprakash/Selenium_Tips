# Selenium_Tips for Nightwatch Cucumber

# Docker CMD
```
docker run -d -v /etc/localtime:/etc/localtime:ro --env GRID_BROWSER_TIMEOUT=30 -p 4445:4444 --env GRID_MAX_SESSION=5 --env GRID_CLEAN_UP_CYCLE=5000   --name selenium-hub selenium/hub:3.6.0
docker run -d -v /etc/localtime:/etc/localtime:ro --env NODE_MAX_SESSION=1 --env NODE_CLEAN_UP_CYCLE=5000    --link selenium-hub:hub selenium/node-chrome:3.6.0
```
# Infrastruture Tips:

1. 2 Core Processor - Go with 2 Parallel Threads - 4 Docker Chrome Node - 1 Hub

Note: Even if you have 16 GB doesn't matter. please go with 2 Parallel Threads

Formula
```
if 2 Core/ 4 GB then Go with Go with 2 Parallel Threads - 4 Docker Chrome Node - 1 Hub

if 4 Core/ 6 GB then Go with Go with 4 Parallel Threads - 6 Docker Chrome Node - 1 Hub

if 6 Core/ 8 GB then Go with Go with 6 Parallel Threads - 8 Docker Chrome Node - 1 Hub

if 8 Core/ 10 GB then Go with Go with 8 Parallel Threads - 10 Docker Chrome Node - 1 Hub
```

# Cucumber Tips

1.  Should have 10 Scenarios per Feature File
Note:
Nightwatch Cucumber Parallel Threads go by Feature Files not by Scenarios

```
30 Scenarios per Feature File - having 30 Feature File

1 Feature File taken 2 min
```

```
4 Threads = 30 Feature Files / 4 = 7.5 = 7.5 * 2 min =  
```




