import { useState, useEffect } from 'react';

// Hàm lấy ngày hôm nay
const getToday = () => {
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const dd = String(today.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
};

export default function BookingForm({ initialProduct, onAddOrder }: { initialProduct: string, onAddOrder: (order: any) => void }) {
  const [service, setService] = useState('viet-phuc');
  const [isSuccess, setIsSuccess] = useState(false);
  const [costumeName, setCostumeName] = useState(initialProduct);
  const [showSizeChart, setShowSizeChart] = useState(false);
  
  // Ngày tháng
  const [dateRent, setDateRent] = useState(getToday());
  const [dateReturn, setDateReturn] = useState(getToday());

  // --- ADD-ON SERVICES (Dịch vụ đi kèm) ---
  const [addMakeup, setAddMakeup] = useState(false);
  const [addPhoto, setAddPhoto] = useState(false);
  const [addChilren, setAddChilren] = useState(false);

  useEffect(() => {
    if (initialProduct) {
      setService('viet-phuc');
      setCostumeName(initialProduct);
    }
  }, [initialProduct]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Xử lý chuỗi chi tiết đơn hàng
    let detailsString = "";
    
    if (service === 'viet-phuc') {
        detailsString = `${costumeName} (${dateRent} đến ${dateReturn})`;
        // Cộng thêm dịch vụ nếu có tích chọn
        if (addMakeup) detailsString += " + Kèm Makeup";
        if (addPhoto) detailsString += " + Kèm Thợ chụp ảnh";
    } else {
        detailsString = costumeName || 'Dịch vụ tiêu chuẩn';
    }

    const newOrder = {
      id: `#DH${Math.floor(Math.random() * 10000)}`,
      date: new Date().toLocaleDateString('vi-VN'),
      service: getServiceName(service),
      status: 'Chờ xác nhận',
      details: detailsString
    };

    onAddOrder(newOrder);
    setIsSuccess(true);
  };

  const getServiceName = (code: string) => {
    if (code === 'viet-phuc') return 'Thuê Việt Phục';
    if (code === 'photobooth') return 'Chụp Photobooth';
    return 'Dịch vụ khác';
  }

  if (isSuccess) {
    return (
      <div style={{ maxWidth: '600px', margin: '40px auto', padding: '40px', textAlign: 'center', border: '1px solid #ddd', borderRadius: '10px', backgroundColor: '#fff', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }}>
        <h2 style={{ color: '#28a745', fontSize: '30px' }}>✅ Đặt lịch thành công!</h2>
        <p style={{ marginTop: '10px', color: '#555' }}>Đơn hàng của bạn đã được ghi nhận.</p>
        <p>Bạn có thể kiểm tra trạng thái trong mục <b>Tài khoản</b>.</p>
        <button 
          onClick={() => setIsSuccess(false)}
          style={{ marginTop: '20px', padding: '10px 20px', backgroundColor: '#000', color: '#D4AF37', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
        >
          Đặt thêm đơn khác
        </button>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '700px', margin: '40px auto', padding: '30px', border: '1px solid #ddd', borderRadius: '10px', backgroundColor: '#fff' }}>
      <h2 style={{ textAlign: 'center', color: '#D4AF37', marginBottom: '20px', textTransform: 'uppercase' }}>
        📅 Đặt lịch dịch vụ
      </h2>
      
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        
        {/* THÔNG TIN CHUNG */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
          <div>
            <label style={labelStyle}>Họ và tên *</label>
            <input required type="text" placeholder="Nguyễn Văn A" style={inputStyle} />
          </div>
          <div>
            <label style={labelStyle}>Số điện thoại *</label>
            <input required type="tel" placeholder="09xxxxxxx" style={inputStyle} />
          </div>
        </div>

        <div>
           <label style={labelStyle}>Địa điểm phục vụ *</label>
           <select style={inputStyle}>
            <option>Tràng An - Ninh Bình</option>
            <option>Phố cổ Hoa Lư - Ninh Bình</option>
            <option>Kinh thành Huế</option>
            <option>Hoàng thành Thăng Long</option>
            <option>Văn Miếu - Quốc Tử Giám</option>
          </select>
        </div>

        <div style={{ padding: '15px', backgroundColor: '#f9f9f9', borderRadius: '8px', border: '1px solid #eee' }}>
          <label style={labelStyle}>Bạn muốn đặt dịch vụ gì?</label>
          <select 
            value={service} 
            onChange={(e) => setService(e.target.value)}
            style={{ ...inputStyle, fontWeight: 'bold', color: '#D4AF37', backgroundColor: '#000' }}
          >
            <option value="viet-phuc">👘 Thuê & Mua Việt Phục</option>
            <option value="photobooth">📸 Chụp Photobooth</option>
            {/* ĐÃ XÓA OPTION MAKEUP LẺ Ở ĐÂY */}
          </select>
        </div>

        {/* --- DỊCH VỤ VIỆT PHỤC --- */}
        {service === 'viet-phuc' && (
          <div style={sectionStyle}>
            <h4 style={{marginBottom: '10px', borderBottom: '1px solid #ddd', paddingBottom: '5px'}}>Thông tin trang phục</h4>
            <div style={{ marginBottom: '10px' }}>
              <label style={labelStyle}>Tên trang phục quan tâm</label>
              <input 
                type="text" 
                placeholder="Ví dụ: Nhật Bình, Áo Tấc..." 
                style={{...inputStyle, backgroundColor: costumeName ? '#fffbf0' : '#fff'}}
                value={costumeName}
                onChange={(e) => setCostumeName(e.target.value)}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
              <div>
                <label style={labelStyle}>
                    Size (Kích cỡ) 
                    <span 
                        onClick={() => setShowSizeChart(!showSizeChart)}
                        style={{ color: '#007bff', cursor: 'pointer', marginLeft: '5px', fontSize: '12px', textDecoration: 'underline' }}
                    >
                        {showSizeChart ? '(Ẩn bảng size)' : '(Xem bảng size)'}
                    </span>
                </label>
                {showSizeChart && (
                    <div style={{ marginBottom: '10px', border: '1px solid #ddd', padding: '5px', borderRadius: '4px', backgroundColor: '#fff' }}>
                        <img src="/img/1-2.jpg" alt="Bảng size" style={{ width: '100%', borderRadius: '4px' }} />
                    </div>
                )}
                <select style={inputStyle}>
                  <option>S (45kg - 50kg)</option> 
                  <option>M (51kg - 53kg)</option> 
                  <option>L (54kg - 56kg)</option> 
                  <option>XL (57kg - 60kg)</option>
                  <option>2XL (61kg - 64kg)</option> 
                  <option>Size trẻ em - chung</option> 
                  <option>May đo riêng</option>
                </select>
              </div>
              <div>
                 <label style={labelStyle}>Hình thức</label>
                 <div style={{ display: 'flex', gap: '20px', marginTop: '10px' }}>
                    <label><input type="radio" name="hinhthuc" defaultChecked /> Thuê</label>
                    <label><input type="radio" name="hinhthuc" /> Mua</label>
                 </div>
              </div>
            </div>

            {/* --- PHẦN DỊCH VỤ ĐI KÈM (QUAN TRỌNG) --- */}
            <div style={{ marginTop: '20px', padding: '15px', backgroundColor: '#fff', border: '1px solid #eee', borderRadius: '8px' }}>
                <label style={{...labelStyle, color: '#D4AF37'}}> Dịch vụ đi kèm (Chỉ áp dụng khi thuê đồ)</label>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '10px' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
                        <input 
                            type="checkbox" 
                            checked={addMakeup} 
                            onChange={(e) => setAddMakeup(e.target.checked)} 
                            style={{ width: '18px', height: '18px' }}
                        />
                        <span>Gói chụp ảnh (1 người/2 giờ): 600.000 VNĐ. Thêm người: Phụ thu 400.000 VNĐ / người</span>
                    </label>

                    <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
                        <input 
                            type="checkbox" 
                            checked={addPhoto} 
                            onChange={(e) => setAddPhoto(e.target.checked)} 
                            style={{ width: '18px', height: '18px' }}
                        />
                        <span>Gói make up & chụp ảnh (1 người/2 giờ): 900.000 VNĐ. Thêm người: Phụ thu 500.000 VNĐ / người</span>
                    </label>

                    <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
                        <input 
                            type="checkbox" 
                            checked={addChilren} 
                            onChange={(e) => setAddChilren(e.target.checked)} 
                            style={{ width: '18px', height: '18px' }}
                        />
                        <span>Gói cho trẻ em (make up & chụp ảnh) (1 người/2 giờ): 500.000 VNĐ. Thêm người: Phụ thu 300.000 VNĐ / người</span>
                    </label>
                </div>
            </div>

            <div style={{ marginTop: '15px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
              <div>
                <label style={labelStyle}>Ngày thuê</label>
                <input 
                  type="date" 
                  style={inputStyle} 
                  value={dateRent}
                  min={getToday()}
                  onChange={(e) => {
                    setDateRent(e.target.value);
                    if (e.target.value > dateReturn) setDateReturn(e.target.value);
                  }}
                />
              </div>
              <div>
                <label style={labelStyle}>Ngày trả</label>
                <input 
                  type="date" 
                  style={inputStyle} 
                  value={dateReturn}
                  min={dateRent}
                  onChange={(e) => setDateReturn(e.target.value)}
                />
              </div>
            </div>
          </div>
        )}

        {/* CÁC DỊCH VỤ KHÁC */}
        {service === 'photobooth' && (
          <div style={sectionStyle}>
            <h4 style={{marginBottom: '10px', borderBottom: '1px solid #ddd', paddingBottom: '5px'}}>Chi tiết gói chụp</h4>
            <div style={{ marginBottom: '15px' }}>
              <label style={labelStyle}>Chọn gói chụp</label>
              <select style={inputStyle}>
                <option>Gói ảnh dọc: 100.000đ / 2 tấm</option>
                <option>Gói ảnh vuông: 180.000đ / 2 tấm</option>
              </select>
            </div>
            <div>
              <label style={labelStyle}>Ngày & Giờ chụp</label>
              <input type="datetime-local" style={inputStyle} min={`${getToday()}T00:00`} />
            </div>
          </div>
        )}

        {/* ĐÃ XÓA FORM MAKEUP RIÊNG LẺ Ở ĐÂY */}

        <div>
           <label style={labelStyle}>Email (Gmail) nhận thông báo *</label>
           <input required type="email" placeholder="example@gmail.com" style={inputStyle} />
        </div>

        <div>
          <label style={labelStyle}>Ghi chú thêm</label>
          <textarea rows={3} style={inputStyle} placeholder="Yêu cầu đặc biệt..."></textarea>
        </div>

        <button type="submit" style={{ padding: '15px', backgroundColor: '#000', color: '#D4AF37', border: 'none', borderRadius: '5px', fontWeight: 'bold', fontSize: '16px', cursor: 'pointer', marginTop: '10px', transition: '0.3s' }}>
          XÁC NHẬN ĐẶT LỊCH
        </button>

      </form>
    </div>
  );
}

const labelStyle = { fontWeight: 'bold', fontSize: '14px', marginBottom: '5px', display: 'block', color: '#333' };
const inputStyle = { width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc', fontSize: '14px', outline: 'none' };
const sectionStyle = { animation: 'fadeIn 0.5s', padding: '15px', border: '1px dashed #D4AF37', borderRadius: '8px', backgroundColor: '#fffcf5' };