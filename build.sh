#!/bin/bash

# check for yarn
if [ ! -f latest.tar.gz]; then
  echo "downloading yarn"
  wget https://yarnpkg.com/latest.tar.gz
fi

touch yarn.lock

# init empty cache file
if [ ! -f .yarn-cache.tgz ]; then
  echo "initialize yarn cache"
  tar cvzf .yarn-cache.tgz --files-from /dev/null
fi

docker build . -t gsc-adsales-web

docker run --rm --entrypoint cat gsc-adsales-web:latest /tmp/yarn.lock > /tmp/yarn.lock
if ! diff -q yarn.lock /tmp/yarn.lock > /dev/null  2>&1; then
  echo "save yarn cache"
  docker run --rm --entrypoint tar gsc-adsales-web:latest czf - /root/.yarn-cache/ > .yarn-cache.tgz
  echo "save yarn.lock"
  cp /tmp/yarn.lock yarn.lock
fi
