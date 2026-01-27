import { useState, useEffect, useRef } from 'react';
import type { Order } from './App';

interface AdminProps {
  orders: Order[];
  onUpdateStatus: (orderId: string, newStatus: string) => void;
  onLogout: () => void;
}

interface Message { id: number; text: string; sender: 'user' | 'bot' | 'admin'; }
interface Review { id: number; date: string; stars: number; text: string; user: string; }

export default function Admin({ orders, onUpdateStatus, onLogout }: AdminProps) {
  const [pass, setPass] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  // Chat logic
  const [chatMessages, setChatMessages] = useState<Message[]>([]);
  const [reply, setReply] = useState("");
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Review logic
  const [reviews, setReviews] = useState<Review[]>([]);

  // Load dữ liệu
  useEffect(() => {
    const loadData = () => {
      // Load Chat
      const savedChat = localStorage.getItem("chat_messages");
      if (savedChat) setChatMessages(JSON.parse(savedChat));

      // Load Reviews
      const savedReviews = localStorage.getItem("customer_reviews");
      if (savedReviews) setReviews(JSON.parse(savedReviews));
    };
    
    loadData();
    const interval = setInterval(loadData, 2000); // Cập nhật mỗi 2 giây
    return () => clearInterval(interval);
  }, []);

  useEffect(() => { chatEndRef.current?.scrollIntoView({ behavior: "smooth" }); }, [chatMessages]);

  const handleReply = () => {
    if (!reply.trim()) return;
    const newMsg: Message = { id: Date.now(), text: reply, sender: 'admin' };
    const updatedChat = [...chatMessages, newMsg];
    setChatMessages(updatedChat);
    localStorage.setItem("chat_messages", JSON.stringify(updatedChat));
    setReply("");
  };

  if (!isLoggedIn) {
    return (
      <div style={{ maxWidth: '400px', margin: '100px auto', padding: '30px', border: '1px solid #ddd', borderRadius: '8px', textAlign: 'center' }}>
        <h2 style={{ color: '#D4AF37' }}>QUẢN TRỊ VIÊN</h2>
        <input type="password" placeholder="Mật khẩu (admin123)" value={pass} onChange={(e) => setPass(e.target.value)} style={{ width: '100%', padding: '10px', marginBottom: '15px' }} />
        <button onClick={() => pass === 'admin123' ? setIsLoggedIn(true) : alert('Sai mật khẩu!')} style={{ width: '100%', padding: '10px', backgroundColor: '#000', color: '#fff', border: 'none', cursor: 'pointer' }}>Đăng nhập</button>
        <p onClick={onLogout} style={{ marginTop: '15px', cursor: 'pointer', textDecoration: 'underline' }}>Quay về trang chủ</p>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '1200px', margin: '20px auto', padding: '20px' }}>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2 style={{ color: '#D4AF37' }}>DASHBOARD QUẢN TRỊ</h2>
        <button onClick={onLogout} style={{padding: '8px 15px', cursor: 'pointer'}}>Đăng xuất</button>
      </div>

      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
        
        {/* 1. QUẢN LÝ ĐƠN HÀNG */}
        <div style={{ flex: 2, minWidth: '600px' }}>
          <h3 style={{ marginBottom: '10px', borderBottom: '2px solid #D4AF37', display: 'inline-block' }}>📦 Đơn Đặt Lịch</h3>
          <div style={{ overflowX: 'auto', backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #eee', maxHeight: '400px', overflowY: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead style={{ position: 'sticky', top: 0, backgroundColor: '#333', color: '#fff' }}>
                <tr>
                  <th style={{ padding: '10px' }}>Mã</th>
                  <th style={{ padding: '10px' }}>Dịch vụ</th>
                  <th style={{ padding: '10px' }}>Chi tiết</th>
                  <th style={{ padding: '10px' }}>Trạng thái</th>
                  <th style={{ padding: '10px' }}>Xử lý</th>
                </tr>
              </thead>
              <tbody>
                {orders.length === 0 && <tr><td colSpan={5} style={{padding:'20px', textAlign:'center'}}>Chưa có đơn hàng</td></tr>}
                {orders.map((order) => (
                  <tr key={order.id} style={{ borderBottom: '1px solid #eee' }}>
                    <td style={{ padding: '10px', fontWeight: 'bold' }}>{order.id}</td>
                    <td style={{ padding: '10px' }}>{order.service}</td>
                    <td style={{ padding: '10px', fontSize: '13px' }}>{order.details}</td>
                    <td style={{ padding: '10px', color: order.status === 'Đã xác nhận' ? 'green' : 'orange' }}>{order.status}</td>
                    <td style={{ padding: '10px' }}>
                      {order.status === 'Chờ xác nhận' && (
                        <button onClick={() => onUpdateStatus(order.id, 'Đã xác nhận')} style={{ background: 'green', color: '#fff', border: 'none', padding: '5px', borderRadius: '4px', cursor: 'pointer' }}>Duyệt</button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* 3. QUẢN LÝ ĐÁNH GIÁ (MỚI) */}
          <h3 style={{ marginBottom: '10px', marginTop: '30px', borderBottom: '2px solid #D4AF37', display: 'inline-block' }}>⭐ Đánh Giá Khách Hàng</h3>
          <div style={{ maxHeight: '300px', overflowY: 'auto', backgroundColor: '#fff', border: '1px solid #eee', borderRadius: '8px', padding: '10px' }}>
            {reviews.length === 0 && <p style={{textAlign:'center', color:'#999'}}>Chưa có đánh giá nào.</p>}
            {reviews.map((rv) => (
              <div key={rv.id} style={{ borderBottom: '1px solid #eee', padding: '10px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontWeight: 'bold', color: '#D4AF37' }}>{'★'.repeat(rv.stars)}</span>
                  <span style={{ fontSize: '12px', color: '#888' }}>{rv.date}</span>
                </div>
                <p style={{ margin: '5px 0', fontStyle: 'italic' }}>"{rv.text}"</p>
              </div>
            ))}
          </div>
        </div>

        {/* 2. CHAT VỚI KHÁCH */}
        <div style={{ flex: 1, minWidth: '300px', height: '600px', display: 'flex', flexDirection: 'column', border: '1px solid #D4AF37', borderRadius: '8px', backgroundColor: '#fff' }}>
          <div style={{ padding: '15px', background: '#D4AF37', color: '#000', fontWeight: 'bold' }}>💬 HỖ TRỢ TRỰC TUYẾN</div>
          <div style={{ flex: 1, padding: '15px', overflowY: 'auto', background: '#f9f9f9', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {chatMessages.length === 0 && <p style={{textAlign:'center', color:'#999'}}>Chưa có tin nhắn.</p>}
            {chatMessages.map((msg) => (
              <div key={msg.id} style={{
                alignSelf: msg.sender === 'admin' ? 'flex-end' : 'flex-start',
                background: msg.sender === 'admin' ? '#000' : '#fff',
                color: msg.sender === 'admin' ? '#D4AF37' : '#000',
                padding: '8px', borderRadius: '8px', maxWidth: '80%', fontSize: '13px', border: '1px solid #ddd'
              }}>
                <strong style={{display:'block', fontSize:'10px', opacity:0.7}}>{msg.sender === 'user' ? 'Khách' : (msg.sender === 'bot' ? 'Bot' : 'Tôi')}</strong>
                {msg.text}
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>
          <div style={{ padding: '10px', borderTop: '1px solid #eee', display: 'flex' }}>
            <input type="text" value={reply} onChange={(e) => setReply(e.target.value)} placeholder="Trả lời khách..." style={{ flex: 1, padding: '8px', border: '1px solid #ccc' }} onKeyDown={(e) => e.key === 'Enter' && handleReply()} />
            <button onClick={handleReply} style={{ background: '#000', color: '#D4AF37', border: 'none', padding: '0 15px', cursor: 'pointer' }}>Gửi</button>
          </div>
        </div>

      </div>
    </div>
  );
}