#!/bin/bash
printenv

# wait until both subgraphs are available
./wait-for-it.sh -h playback -p 4002
./wait-for-it.sh -h spotify -p 4002

echo starting router

./router -c router.yaml
