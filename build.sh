#!/usr/bin/env bash
export EMMAKEN_CFLAGS="-s ERROR_ON_UNDEFINED_SYMBOLS=0"
WASM_FILENAME=react-wasm.wasm
JS_FILENAME=react-wasm/src/wasm/react-wasm.js
sudo docker run --rm -v $(pwd):/src trzeci/emscripten-upstream emcc \
    src/main.c \
    --pre-js src/pre.js \
    -s MODULARIZE=1 \
    -s ALLOW_MEMORY_GROWTH=1 \
    -s ERROR_ON_UNDEFINED_SYMBOLS=0 \
    -s EXPORT_NAME='WasmReact'\
    -s ASYNCIFY=1 \
    -s FORCE_FILESYSTEM=1 \
    -o ${JS_FILENAME}

gsed -i.old '1s;^;\/* eslint-disable */\n&;' ${JS_FILENAME}
gsed -i.old '2s;^;\// @ts-ignore;' ${JS_FILENAME}
gsed -i.old "s|$WASM_FILENAME|/$WASM_FILENAME|" ${JS_FILENAME}
gsed -i.old "s|wasmBinaryFile = locateFile|// wasmBinaryFile = locateFile|" ${JS_FILENAME}
mv react-wasm/src/wasm/${WASM_FILENAME} react-wasm/public/${WASM_FILENAME}

