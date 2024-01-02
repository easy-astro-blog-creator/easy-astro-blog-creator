#!/bin/bash

# Stop on first error
set -e

# Run cargo build
cargo build

# Install the latest version of daisyui
npm install -D daisyui@latest
