#!/bin/bash
let curTime=$(date "+%H%M%S")
let commitInfo = "autoCommit"+curTime
git add .
git commit -m commitInfo
git push
