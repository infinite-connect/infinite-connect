import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-500 text-gray-800">
      <div className="flex gap-4">
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="w-24" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="w-24" alt="React logo" />
        </a>
      </div>
      <h1 className="text-4xl font-bold text-blue-600">배포 테스트</h1>
      <div className="p-6 bg-white shadow-md rounded-lg mt-6">
        <button
          className="px-4 py-2 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-700 transition"
          onClick={() => setCount((count) => count + 1)}
        >
          count is {count}
        </button>
        <button
          onClick={() => console.log('click')}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700 transition"
        >
          알림 권한 요청하기
        </button>
        <p className="mt-2 text-gray-600">
          Edit <code className="font-mono bg-gray-200 px-1">src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="mt-4 text-sm text-gray-500">Click on the Vite and React logos to learn more</p>
    </div>
  );
}

export default App;
