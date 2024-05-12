#!/usr/bin/env bash
SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )

shopt -s globstar

pnpm madge ${SCRIPT_DIR}/../{src,examples}/**/*.ts -i "${SCRIPT_DIR}/../dependency-graph.png"
