import React from 'react';
import ChatInterface from './components/ChatInterface';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const App: React.FC = () => {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <ChatInterface />,
      children: [
        {
          path: "c/:threadId",
          element: <ChatInterface />,
        }
      ]
    },
  ]);

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
