# Use the specified base image
FROM  mcr.microsoft.com/devcontainers/rust:bullseye

# Update packages and install necessary utilities
RUN apt-get update && apt-get install -y xz-utils clang curl

# Add Rust Clippy, Dioxus CLI, WASM target, and Trunk
RUN rustup component add clippy && \
    cargo install dioxus-cli && \
    rustup target add wasm32-unknown-unknown && \
    cargo install --locked trunk


# Download Tailwind CSS and move it to a directory within your repository
RUN curl -sLO https://github.com/tailwindlabs/tailwindcss/releases/latest/download/tailwindcss-linux-x64 && \
    chmod +x tailwindcss-linux-x64 && \
    mv tailwindcss-linux-x64 tailwindcss && \
    chmod +x tailwindcss

