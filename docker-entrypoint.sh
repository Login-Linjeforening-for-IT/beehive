#!/bin/sh

set -e

echo "Setting env vars"

# Set the default API_URL if it's not already set
API_URL="${API_URL:-https://api.login.com}"

# Directory containing the JS files
TARGET_DIR="/usr/share/nginx/html/static/js"

# Check if the target directory exists
if [ -d "$TARGET_DIR" ]; then
    # Use find to list all files in the directory, then replace the placeholder in each file
    find "$TARGET_DIR" -type f -exec sed -i "s|API_URL_PLACEHOLDER|${API_URL}|g" {} +
else
    echo "Target directory $TARGET_DIR does not exist."
fi

