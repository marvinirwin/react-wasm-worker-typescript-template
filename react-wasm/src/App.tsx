import React, {useEffect, useState} from 'react';
import './App.css';
/* eslint import/no-webpack-loader-syntax:0 */
// @ts-ignore
import MyWorker from 'worker-loader?name=dist/[name].js!./worker'

const w = new MyWorker();

const App: React.FC = () => {
    let message = 'I just travelled through Browser -> Worker -> Wasm -> Browser!';
    const [reply, setReply] = useState(`Sent "${message}" to executable`);
    useEffect(() => {

        w.onmessage = (e: MessageEvent) => setReply(e.data) ;
        w.postMessage(message);

    }, [message]);
  return (
    <div className="App">
        <span>{reply}</span>
    </div>
  );
};

export default App;
