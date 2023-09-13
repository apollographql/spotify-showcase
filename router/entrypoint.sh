#!/bin/bash

# wait until both subgraphs are available
case "$WAIT" in
 true) 
    ./wait-for-it.sh -h playback -p 4002
    ./wait-for-it.sh -h spotify -p 4001 ;;
esac

echo starting router 

./router -c router.yaml