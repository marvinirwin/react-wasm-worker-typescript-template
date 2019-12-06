import ReactWasm from './wasm/react-wasm.js';
// @ts-ignore
self.window = self;

// @ts-ignore
const ctx: Worker = self as any;

// Respond to message from parent thread
ctx.onmessage = (ev) => {
    debugger;
    // TODO figure out if data is already a Uint8Array
    let message: string = ev.data;
    // TODO get the types for an emscripten Module object so I don't have to tsignore it all
    const Module = {};
    // @ts-ignore
    Module.stdout = v => console.info(v);
    // @ts-ignore
    Module.stderr = v => console.warn(v);
    // @ts-ignore
    Module.MEMFS = [
        {
            name: 'big_blob.txt',
            data: (new TextEncoder()).encode(message),
        }
    ];
    // @ts-ignore
    Module.arguments = ['./big_blob.txt'];
    // @ts-ignore
    Module.callback = files => {
        debugger;
        const v = files.pop().data;
        ctx.postMessage(new TextDecoder('utf-8').decode(v));
    };
    // @ts-ignore
    ReactWasm(Module);
};
