import React from "react";
import ChatInterface from "./components/ChatInterface";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import FileSearch from "./components/FileSearch";
import AppLayout from "./components/AppLayout";

const App: React.FC = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <AppLayout>
          <ChatInterface />
        </AppLayout>
      ),
      children: [
        {
          path: "c/:threadId",
          element: (
            <AppLayout>
              <ChatInterface />
            </AppLayout>
          ),
        },
      ],
    },
    {
      path: "/file-search/:threadId",
      element: (
        <AppLayout>
          <FileSearch />
        </AppLayout>
      ),
    },
  ]);

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
