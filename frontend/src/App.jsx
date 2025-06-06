import Sidebar from './Components/Sidebarr';
import ChatContainer from './Components/ChatContainer';

export default function App() {
  return (
   <div className="h-screen flex bg-white text-gray-800">
  <Sidebar />
  <ChatContainer />
</div>

  );
}
