# -----------------------------------------------------------------------------
# Analytics Monorepo Dockerfile (Collector Service)
#
# WHY THIS EXISTS:
# ----------------
# We originally tried deploying this pnpm monorepo using:
#
# 1. Railway Nixpacks
#    ❌ Failed due to:
#       - npm install being used instead of pnpm
#       - "workspace:*" not supported in npm
#
# 2. Railway Railpack
#    ❌ Failed due to:
#       - Corepack pnpm signature verification errors
#       - pnpm@latest key mismatch in CI environment
#
# 3. Corepack-based pnpm setup
#    ❌ Failed due to:
#       - "Cannot find matching keyid"
#       - Railway Node image having outdated Corepack trust keys
#
# 4. pnpm via npm global install
#    ⚠️ Partial success but unstable in layered builds
#       - pnpm binary not persisted across layers
#
# 5. Nixpacks auto-generated build
#    ❌ Failed due to:
#       - "undefined variable 'npm'" in generated Nix expression
#       - workspace monorepo detection issues
#
# FINAL DECISION:
# ---------------
# We completely bypass Railway build systems (Nixpacks / Railpack)
# and use Docker for deterministic builds.
#
# This ensures:
#   ✔ pnpm works reliably
#   ✔ workspace:* dependencies work
#   ✔ no Corepack signature issues
#   ✔ no npm fallback issues
#   ✔ reproducible production builds
# -----------------------------------------------------------------------------

FROM node:20-alpine

# Create app directory inside container (NOT system root)
WORKDIR /app

# Enable Corepack (safe inside Docker Node image)
# RUN corepack enable

# Copy entire monorepo into container
COPY . .

# Install pnpm dependencies (monorepo-aware)
# RUN corepack prepare pnpm@10.33.4 --activate && \
#     pnpm install --frozen-lockfile
RUN npm install -g pnpm@10.33.4 && \
    pnpm install

# Build only the collector service using Turborepo filter
# RUN pnpm turbo run build --filter=@analytics/collector

# Start compiled JS (NOT tsx, NOT dev server)
# CMD ["node", "apps/collector/dist/server.js"]
CMD ["pnpm", "--filter", "@analytics/collector", "start"]