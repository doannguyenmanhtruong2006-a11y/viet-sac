import { useState, useRef, useEffect } from 'react';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot' | 'admin'; // Thêm người gửi là admin
}

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  
  // Lấy tin nhắn từ bộ nhớ (nếu có)
  const [messages, setMessages] = useState<Message[]>(() => {
    const saved = localStorage.getItem("chat_messages");
    return saved ? JSON.parse(saved) : [];
  });

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Tự động lưu tin nhắn mỗi khi có thay đổi
  useEffect(() => {
    localStorage.setItem("chat_messages", JSON.stringify(messages));
    scrollToBottom();
  }, [messages]);

  // Kỹ thuật "Polling": Cứ 2 giây kiểm tra xem Admin có trả lời không
  useEffect(() => {
    const interval = setInterval(() => {
      const saved = localStorage.getItem("chat_messages");
      if (saved) {
        const parsed = JSON.parse(saved);
        // Nếu số lượng tin nhắn khác nhau (tức là Admin đã nhắn thêm), thì cập nhật
        if (parsed.length !== messages.length) {
          setMessages(parsed);
        }
      }
    }, 2000);
    return () => clearInterval(interval);
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSend = () => {
    if (!input.trim()) return;

    const userMsg: Message = { id: Date.now(), text: input, sender: 'user' };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput("");

    // Logic trả lời tự động nếu là tin nhắn đầu tiên
    if (messages.length === 0) {
      setTimeout(() => {
        const botMsg: Message = { 
          id: Date.now() + 1, 
          text: "Chào bạn, bạn đang muốn sử dụng dịch vụ nào của Việt Sắc? (Thuê đồ/Chụp ảnh/Makeup)", 
          sender: 'bot' 
        };
        setMessages(prev => [...prev, botMsg]);
      }, 1000);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSend();
  };

  return (
    <div style={{ position: 'fixed', bottom: '20px', right: '20px', zIndex: 9999, fontFamily: 'Segoe UI, sans-serif' }}>
      {!isOpen && (
        <button 
          onClick={() => setIsOpen(true)}
          style={{ width: '60px', height: '60px', borderRadius: '50%', backgroundColor: '#000', color: '#D4AF37', border: '2px solid #D4AF37', fontSize: '30px', cursor: 'pointer', boxShadow: '0 4px 12px rgba(0,0,0,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          💬
        </button>
      )}

      {isOpen && (
        <div style={{ width: '320px', height: '450px', backgroundColor: '#fff', borderRadius: '12px', boxShadow: '0 5px 25px rgba(0,0,0,0.2)', display: 'flex', flexDirection: 'column', overflow: 'hidden', border: '1px solid #ddd' }}>
          <div style={{ backgroundColor: '#000', color: '#D4AF37', padding: '15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontWeight: 'bold' }}>Hỗ trợ trực tuyến</span>
            <button onClick={() => setIsOpen(false)} style={{ background: 'none', border: 'none', color: '#fff', fontSize: '18px', cursor: 'pointer' }}>✖</button>
          </div>

          <div style={{ flex: 1, padding: '15px', overflowY: 'auto', backgroundColor: '#f9f9f9', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {messages.length === 0 && <p style={{ textAlign: 'center', color: '#888', fontSize: '13px' }}>👋 Chào mừng đến với Việt Sắc!</p>}
            
            {messages.map((msg) => (
              <div key={msg.id} style={{
                alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                backgroundColor: msg.sender === 'user' ? '#000' : (msg.sender === 'admin' ? '#D4AF37' : '#e5e5e5'),
                color: msg.sender === 'user' ? '#D4AF37' : (msg.sender === 'admin' ? '#fff' : '#333'),
                padding: '8px 12px', borderRadius: '15px', maxWidth: '80%', fontSize: '14px',
                borderBottomRightRadius: msg.sender === 'user' ? '0' : '15px',
                borderBottomLeftRadius: (msg.sender === 'bot' || msg.sender === 'admin') ? '0' : '15px'
              }}>
                {msg.sender === 'admin' && <small style={{display:'block', fontSize:'10px', opacity: 0.8, marginBottom:'2px'}}>Admin</small>}
                {msg.text}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <div style={{ padding: '10px', borderTop: '1px solid #eee', display: 'flex', gap: '10px' }}>
            <input type="text" placeholder="Nhập tin nhắn..." value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={handleKeyPress} style={{ flex: 1, padding: '10px', borderRadius: '20px', border: '1px solid #ccc', outline: 'none' }} />
            <button onClick={handleSend} style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#D4AF37', color: '#fff', border: 'none', cursor: 'pointer' }}>➤</button>
          </div>
        </div>
      )}
    </div>
  );
}