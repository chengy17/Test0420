#!/bin/bash
curTime=$(date "+%H%M%S")
commitInfo = "autoCommit:"+curTime
git add .
git commit -m commitInfo
git push
