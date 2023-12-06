set -euo pipefail

# Get the directory right above the one where the script is stored (root of Git repo)
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
ROOT_DIR="$(dirname "$SCRIPT_DIR")"

docker build "$ROOT_DIR" -f "$ROOT_DIR"/subgraphs/spotify/Dockerfile -t spotify:latest &
docker build "$ROOT_DIR" -f "$ROOT_DIR"/subgraphs/playback/Dockerfile -t playback:latest &
docker build "$ROOT_DIR"/router -t router:latest &
docker build "$ROOT_DIR"/coprocessor -t coprocessor:latest &

wait
