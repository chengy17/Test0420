#!/bin/bash

git add .
git commit --date=$(date "+%H%M%S") -am "autoCommit"
git push

