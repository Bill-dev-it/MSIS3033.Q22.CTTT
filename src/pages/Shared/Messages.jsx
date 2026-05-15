import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { Send, UserCircle, Search, MoreVertical, MessageSquare } from 'lucide-react';

const Messages = () => {
  const { user } = useAuth();
  const { data, addMessage, markMessagesAsRead } = useData();
  const [activeContactId, setActiveContactId] = useState(null);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef(null);

  // Find all unique contacts we've chatted with or who have applied to us
  const getContacts = () => {
    let contactsSet = new Set();
    
    // 1. Anyone we have a message history with
    data.messages?.forEach(m => {
      if (m.senderId === user.id) contactsSet.add(m.receiverId);
      if (m.receiverId === user.id) contactsSet.add(m.senderId);
    });

    // 2. If company, anyone who applied to their internships
    if (user.role === 'Company') {
      const myInternships = data.internships.filter(i => i.companyId === user.refId);
      data.applications.forEach(app => {
        if (myInternships.some(i => i.id === app.internshipId)) {
          const studentUser = data.users.find(u => u.refId === app.studentId && u.role === 'Student');
          if (studentUser) contactsSet.add(studentUser.id);
        }
      });
    }

    // 3. If student, any company they applied to
    if (user.role === 'Student') {
      data.applications.forEach(app => {
        if (app.studentId === user.refId) {
          const internship = data.internships.find(i => i.id === app.internshipId);
          if (internship) {
            const companyUser = data.users.find(u => u.refId === internship.companyId && u.role === 'Company');
            if (companyUser) contactsSet.add(companyUser.id);
          }
        }
      });
    }

    return Array.from(contactsSet).map(id => data.users.find(u => u.id === id)).filter(Boolean);
  };

  const contacts = getContacts();

  useEffect(() => {
    if (contacts.length > 0 && !activeContactId) {
      setActiveContactId(contacts[0].id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contacts.length]);

  useEffect(() => {
    if (activeContactId) {
      markMessagesAsRead(activeContactId, user.id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeContactId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeContactId, data.messages]);

  const activeContact = contacts.find(c => c.id === activeContactId);
  
  const conversation = data.messages?.filter(
    m => (m.senderId === user.id && m.receiverId === activeContactId) || 
         (m.senderId === activeContactId && m.receiverId === user.id)
  ).sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp)) || [];

  const handleSend = (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !activeContactId) return;

    addMessage({
      id: `m${Date.now()}`,
      senderId: user.id,
      receiverId: activeContactId,
      content: newMessage,
      timestamp: new Date().toISOString(),
      read: false
    });
    setNewMessage('');
  };

  const formatTime = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="max-w-6xl mx-auto h-[calc(100vh-8rem)] bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden flex">
      {/* Contacts Sidebar */}
      <div className="w-80 border-r border-slate-200 flex flex-col bg-slate-50">
        <div className="p-4 border-b border-slate-200 bg-white">
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">Messages</h2>
          <div className="mt-4 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search messages..." 
              className="w-full pl-9 pr-4 py-2 bg-slate-100 border-transparent rounded-lg focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-sm"
            />
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          {contacts.length === 0 ? (
            <p className="text-center text-slate-500 text-sm mt-10">No messages yet.</p>
          ) : (
            contacts.map(contact => {
              const lastMsg = data.messages?.filter(m => 
                (m.senderId === user.id && m.receiverId === contact.id) || 
                (m.senderId === contact.id && m.receiverId === user.id)
              ).sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))[0];

              const unread = data.messages?.filter(m => m.senderId === contact.id && m.receiverId === user.id && !m.read).length || 0;

              return (
                <button
                  key={contact.id}
                  onClick={() => setActiveContactId(contact.id)}
                  className={`w-full flex items-start space-x-3 p-3 rounded-xl transition-all ${activeContactId === contact.id ? 'bg-indigo-50 border border-indigo-100' : 'hover:bg-white border border-transparent'}`}
                >
                  <img src={contact.avatar} alt={contact.name} className="h-10 w-10 rounded-full border border-slate-200 bg-white" />
                  <div className="flex-1 text-left min-w-0">
                    <div className="flex justify-between items-baseline mb-0.5">
                      <p className={`text-sm font-semibold truncate ${unread > 0 ? 'text-slate-900' : 'text-slate-700'}`}>{contact.name}</p>
                      {lastMsg && <span className="text-xs text-slate-400 ml-2 shrink-0">{formatTime(lastMsg.timestamp)}</span>}
                    </div>
                    <p className={`text-xs truncate ${unread > 0 ? 'font-semibold text-indigo-600' : 'text-slate-500'}`}>
                      {lastMsg ? lastMsg.content : 'Start a conversation'}
                    </p>
                  </div>
                  {unread > 0 && (
                    <div className="w-5 h-5 bg-indigo-600 rounded-full flex items-center justify-center text-[10px] font-bold text-white shrink-0 mt-1">
                      {unread}
                    </div>
                  )}
                </button>
              );
            })
          )}
        </div>
      </div>

      {/* Chat Area */}
      {activeContact ? (
        <div className="flex-1 flex flex-col bg-white relative">
          {/* Chat Header */}
          <div className="h-16 px-6 border-b border-slate-200 flex items-center justify-between shrink-0 bg-white/80 backdrop-blur-md absolute top-0 w-full z-10">
            <div className="flex items-center space-x-3">
              <img src={activeContact.avatar} alt={activeContact.name} className="h-9 w-9 rounded-full border border-slate-200" />
              <div>
                <p className="font-bold text-slate-900">{activeContact.name}</p>
                <p className="text-xs text-slate-500">{activeContact.role}</p>
              </div>
            </div>
            <button className="text-slate-400 hover:text-slate-600 p-2">
              <MoreVertical className="h-5 w-5" />
            </button>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-6 pt-24 space-y-4 bg-slate-50">
            {conversation.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-slate-400">
                <UserCircle className="h-12 w-12 mb-2 opacity-50" />
                <p>Send a message to start chatting with {activeContact.name}</p>
              </div>
            ) : (
              conversation.map((msg, idx) => {
                const isMe = msg.senderId === user.id;
                return (
                  <div key={idx} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[70%] rounded-2xl px-4 py-2.5 shadow-sm ${isMe ? 'bg-indigo-600 text-white rounded-br-sm' : 'bg-white border border-slate-200 text-slate-800 rounded-bl-sm'}`}>
                      <p className="text-sm leading-relaxed">{msg.content}</p>
                      <p className={`text-[10px] mt-1 text-right ${isMe ? 'text-indigo-200' : 'text-slate-400'}`}>
                        {formatTime(msg.timestamp)}
                      </p>
                    </div>
                  </div>
                );
              })
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Chat Input */}
          <div className="p-4 bg-white border-t border-slate-200 shrink-0">
            <form onSubmit={handleSend} className="flex space-x-3">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 px-4 py-3 bg-slate-50 border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-colors"
              />
              <button 
                type="submit"
                disabled={!newMessage.trim()}
                className="w-12 h-12 bg-indigo-600 text-white rounded-xl flex items-center justify-center shadow-md hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Send className="h-5 w-5 ml-1" />
              </button>
            </form>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center bg-slate-50 text-slate-400">
          <MessageSquare className="h-16 w-16 mb-4 text-slate-300" />
          <p className="text-lg font-medium text-slate-500">Select a conversation to start messaging</p>
        </div>
      )}
    </div>
  );
};

export default Messages;
