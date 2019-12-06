import React, {useEffect, useState} from 'react';
import './App.css';
/* eslint import/no-webpack-loader-syntax:0 */
// @ts-ignore
import MyWorker from 'worker-loader?name=dist/[name].js!./worker'

const w = new MyWorker();

const App: React.FC = () => {
    const [reply, setReply] = useState('The worker running my .wasm hasnt replied yet...')
    useEffect(() => {
        // @ts-ignore
        w.postMessage('yeet');

        // @ts-ignore
        w.onmessage = e => {
            setReply(e.data)
        };
    }, []);
    console.log(reply);
  return (
    <div className="App">
        <span>{reply}</span>
    </div>
  );
};

export default App;
