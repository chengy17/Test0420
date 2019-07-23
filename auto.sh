#!/bin/bash

git add .
git commit --date=$(date "+%H%M%S") -a -m "autoCommit"
git push

