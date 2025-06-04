import React, { useState } from 'react';
import Button from '../components/common/Button';
import { Mic, MicOff, Video, VideoOff, MonitorSmartphone, PhoneOff, MessageSquare, MessageSquareOff } from 'lucide-react';
import { PageType } from '../App';

interface MentorCallPageProps {
  navigate: (page: PageType) => void;
}

interface Message {
  id: number;
  sender: 'user' | 'mentor';
  text: string;
  time: string;
}

const MentorCallPage: React.FC<MentorCallPageProps> = ({ navigate }) => {
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [videoEnabled, setVideoEnabled] = useState(true);
  const [chatOpen, setChatOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      sender: 'mentor',
      text: 'Hello! I\'m Sarah, your career mentor. How can I help you today?',
      time: '2:32 PM'
    }
  ]);

  // Toggle audio
  const toggleAudio = () => {
    setAudioEnabled(!audioEnabled);
  };

  // Toggle video
  const toggleVideo = () => {
    setVideoEnabled(!videoEnabled);
  };

  // Toggle chat panel
  const toggleChat = () => {
    setChatOpen(!chatOpen);
  };

  // End call
  const endCall = () => {
    navigate('results');
  };

  // Send message
  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (message.trim()) {
      const newMessage: Message = {
        id: messages.length + 1,
        sender: 'user',
        text: message,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      
      setMessages([...messages, newMessage]);
      setMessage('');
      
      // Simulate mentor response
      setTimeout(() => {
        const responseMessage: Message = {
          id: messages.length + 2,
          sender: 'mentor',
          text: 'That\'s a great question about UX/UI design careers. The field is growing rapidly, and I\'d recommend starting with some online courses to build your portfolio.',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        
        setMessages(prev => [...prev, responseMessage]);
      }, 2000);
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto h-[calc(100vh-64px)] flex flex-col">
        {/* Header */}
        <div className="py-4 px-6 border-b border-gray-800 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold">Career Guidance Session</h1>
            <p className="text-gray-400 text-sm">with Sarah Johnson, UX/UI Career Specialist</p>
          </div>
          
          <div className="flex items-center">
            <div className="bg-green-500 h-2 w-2 rounded-full mr-2"></div>
            <span className="text-sm">1:32:45</span>
          </div>
        </div>
        
        {/* Main content */}
        <div className="flex-grow flex">
          {/* Video area */}
          <div className={`flex-grow ${chatOpen ? 'hidden md:block md:flex-grow' : 'w-full'}`}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 h-full">
              {/* Mentor video (larger) */}
              <div className="md:col-span-2 bg-gray-800 rounded-xl overflow-hidden relative h-full flex items-center justify-center">
                {videoEnabled ? (
                  <img 
                    src="https://images.pexels.com/photos/3184405/pexels-photo-3184405.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                    alt="Mentor" 
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <div className="text-center">
                    <div className="w-24 h-24 rounded-full bg-gray-700 flex items-center justify-center mx-auto mb-4">
                      <span className="text-4xl">SJ</span>
                    </div>
                    <p>Sarah Johnson</p>
                  </div>
                )}
                
                {/* Name overlay */}
                <div className="absolute bottom-4 left-4 bg-black bg-opacity-50 px-3 py-1 rounded-lg">
                  Sarah Johnson (Mentor)
                </div>
                
                {/* Muted indicator */}
                {!audioEnabled && (
                  <div className="absolute top-4 right-4">
                    <MicOff className="text-red-500" />
                  </div>
                )}
              </div>
              
              {/* User video (smaller) */}
              <div className="bg-gray-800 rounded-xl overflow-hidden relative h-full flex items-center justify-center">
                {videoEnabled ? (
                  <img 
                    src="https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                    alt="User" 
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <div className="text-center">
                    <div className="w-16 h-16 rounded-full bg-gray-700 flex items-center justify-center mx-auto mb-2">
                      <span className="text-2xl">JD</span>
                    </div>
                    <p className="text-sm">You</p>
                  </div>
                )}
                
                {/* Name overlay */}
                <div className="absolute bottom-4 left-4 bg-black bg-opacity-50 px-3 py-1 rounded-lg text-sm">
                  You
                </div>
              </div>
            </div>
          </div>
          
          {/* Chat panel */}
          {chatOpen && (
            <div className="w-full md:w-80 border-l border-gray-800 flex flex-col">
              <div className="p-4 border-b border-gray-800">
                <h2 className="font-bold">Chat</h2>
              </div>
              
              {/* Messages */}
              <div className="flex-grow overflow-y-auto p-4 space-y-4">
                {messages.map(msg => (
                  <div 
                    key={msg.id} 
                    className={`${msg.sender === 'user' ? 'ml-auto' : 'mr-auto'} max-w-xs`}
                  >
                    <div 
                      className={`rounded-lg p-3 ${
                        msg.sender === 'user' 
                          ? 'bg-blue-600 text-white' 
                          : 'bg-gray-700 text-white'
                      }`}
                    >
                      {msg.text}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      {msg.sender === 'user' ? 'You' : 'Sarah'}, {msg.time}
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Message input */}
              <div className="p-4 border-t border-gray-800">
                <form onSubmit={sendMessage} className="flex">
                  <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="flex-grow bg-gray-700 text-white rounded-l-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Type a message..."
                  />
                  <button
                    type="submit"
                    className="bg-blue-600 text-white rounded-r-lg px-4 py-2 font-medium"
                  >
                    Send
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
        
        {/* Controls */}
        <div className="py-6 px-4 border-t border-gray-800 flex items-center justify-center space-x-4">
          <Button
            variant={audioEnabled ? "secondary" : "danger"}
            onClick={toggleAudio}
            className="rounded-full w-12 h-12 flex items-center justify-center"
          >
            {audioEnabled ? <Mic /> : <MicOff />}
          </Button>
          
          <Button
            variant={videoEnabled ? "secondary" : "danger"}
            onClick={toggleVideo}
            className="rounded-full w-12 h-12 flex items-center justify-center"
          >
            {videoEnabled ? <Video /> : <VideoOff />}
          </Button>
          
          <Button
            variant="secondary"
            className="rounded-full w-12 h-12 flex items-center justify-center"
          >
            <MonitorSmartphone />
          </Button>
          
          <Button
            variant="danger"
            onClick={endCall}
            className="rounded-full w-16 h-16 flex items-center justify-center"
          >
            <PhoneOff className="w-6 h-6" />
          </Button>
          
          <Button
            variant={chatOpen ? "primary" : "secondary"}
            onClick={toggleChat}
            className="rounded-full w-12 h-12 flex items-center justify-center"
          >
            {chatOpen ? <MessageSquareOff /> : <MessageSquare />}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MentorCallPage;