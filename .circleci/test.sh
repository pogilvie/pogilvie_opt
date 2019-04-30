#!/usr/bin/env bash

HOST=https://circleci.com/api/v1.1/project/github/pogilvie/pogilvie_opt/tree/master

curl --user ${CIRCLE_TOKEN}: \
     --request POST \
     --form revision=fd51145 \
     --form config=@test.yml \
     --form notify=false \
     $HOST

