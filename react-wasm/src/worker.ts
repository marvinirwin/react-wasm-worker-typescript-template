import ReactWasm from './wasm/react-wasm.js';

import {buffer, filter, map} from "rxjs/operators";
import {Subject} from "rxjs";

const stdOut$: Subject<number> = new Subject();
const stdErr$: Subject<number> = new Subject();
const stdOutFinished$ = stdOut$.pipe(filter(a => a === 10));
const stdErrFinished$ = stdErr$.pipe(filter(a => a === 10));
export const bufferedStdOut$ = stdOut$.pipe(buffer(stdOutFinished$), map(byteArray => {
    return byteArray.map(c => String.fromCharCode(c)).join('');
}));
export const bufferedStdErr$ = stdErr$.pipe(buffer(stdErrFinished$), map(byteArray => {
    return byteArray.map(c => String.fromCharCode(c)).join('');
}));
bufferedStdOut$.subscribe(v => console.log(v));
bufferedStdErr$.subscribe(v => console.warn(v));

// @ts-ignore
self.window = self;

// @ts-ignore
const ctx: Worker = self as any;

// Respond to message from parent thread
ctx.onmessage = (ev) => {
    let message: string = ev.data;
    const Module = {};
    // @ts-ignore
    Module.stdout = v => stdOut$.next(v);
    // @ts-ignore
    Module.stderr = v => stdErr$.next(v);
    // @ts-ignore
    Module.MEMFS = [
        {
            name: 'input.txt',
            data: (new TextEncoder()).encode(message),
        }
    ];
    // @ts-ignore
    Module.arguments = ['input.txt'];
    // @ts-ignore
    Module.callback = files => {
        console.log(files.MEMFS);
        const v = files.MEMFS.pop().data;
        ctx.postMessage(new TextDecoder('utf-8').decode(v));
    };
    // @ts-ignore
    ReactWasm(Module);
};
