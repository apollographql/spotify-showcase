set -euo pipefail

# If the `.env` file (in the directory above the one this script is in) doesn't exist, tell the user to create it
ROOT_DIR="$(dirname "$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )")"

if [ ! -f "$ROOT_DIR"/.env ]; then
    echo "Please create a .env file in the root directory of the project. See k8s/README.md for more information."
    exit 1
fi

# Create the required k8s secret from the env file
kubectl create secret generic graphos --from-env-file="$ROOT_DIR"/.env
