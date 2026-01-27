// --- KHÔNG import từ App nữa để tránh lỗi vòng lặp ---

// Tự định nghĩa lại kiểu dữ liệu đơn hàng ngay tại đây
interface Order {
  id: string;
  date: string;
  service: string;
  status: string;
  details: string;
}

export default function UserProfile({ phone, orders, onLogout }: { phone: string, orders: Order[], onLogout: () => void }) {
  return (
    <div style={{ maxWidth: '800px', margin: '40px auto', padding: '20px' }}>
      
      {/* Header Hồ sơ */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#fff', padding: '20px', borderRadius: '8px', border: '1px solid #ddd', marginBottom: '20px' }}>
        <div>
          <h2 style={{ fontSize: '20px', marginBottom: '5px' }}>Xin chào, Khách hàng</h2>
          <p style={{ color: '#666' }}>Số điện thoại: <b>{phone}</b></p>
        </div>
        <button onClick={onLogout} style={{ padding: '8px 15px', border: '1px solid #000', backgroundColor: '#fff', cursor: 'pointer', borderRadius: '4px' }}>
          Đăng xuất
        </button>
      </div>

      {/* Danh sách đơn hàng */}
      <h3 style={{ borderLeft: '4px solid #D4AF37', paddingLeft: '10px', marginBottom: '15px' }}>Lịch sử đặt lịch ({orders.length})</h3>
      
      <div style={{ backgroundColor: '#fff', borderRadius: '8px', overflow: 'hidden', border: '1px solid #eee', minHeight: '200px' }}>
        {orders.length === 0 ? (
            <div style={{textAlign: 'center', padding: '40px', color: '#888'}}>
                <p>Bạn chưa có đơn đặt lịch nào.</p>
                <p>Hãy trải nghiệm dịch vụ của Việt Sắc ngay nhé!</p>
            </div>
        ) : (
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
                <tr style={{ backgroundColor: '#f9f9f9', textAlign: 'left' }}>
                <th style={{ padding: '15px' }}>Mã đơn</th>
                <th style={{ padding: '15px' }}>Ngày</th>
                <th style={{ padding: '15px' }}>Dịch vụ</th>
                <th style={{ padding: '15px' }}>Trạng thái</th>
                </tr>
            </thead>
            <tbody>
                {orders.map((order, index) => (
                <tr key={index} style={{ borderBottom: '1px solid #eee' }}>
                    <td style={{ padding: '15px', fontWeight: 'bold' }}>{order.id}</td>
                    <td style={{ padding: '15px' }}>{order.date}</td>
                    <td style={{ padding: '15px' }}>{order.service}</td>
                    <td style={{ padding: '15px', color: 'orange', fontWeight: 'bold' }}>{order.status}</td>
                </tr>
                ))}
            </tbody>
            </table>
        )}
      </div>
    </div>
  );
}