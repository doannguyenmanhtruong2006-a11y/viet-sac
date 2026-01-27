

export default function Services({ onBookClick }: { onBookClick: () => void }) {
  return (
    <div style={{ maxWidth: '1000px', margin: '40px auto', padding: '0 20px' }}>
      <h2 style={{ textAlign: 'center', color: '#D4AF37', marginBottom: '10px', textTransform: 'uppercase' }}>
        Dịch vụ & Bảng giá
      </h2>
      <p style={{ textAlign: 'center', color: '#666', marginBottom: '40px' }}>
        Trải nghiệm trọn vẹn nét đẹp Việt với hệ thống dịch vụ đa dạng
      </p>

      {/* DỊCH VỤ 1: VIỆT PHỤC */}
      <div style={cardStyle}>
        <div style={contentStyle}>
          <h3 style={titleStyle}>1. Thuê & Mua Việt Phục</h3>
          <p>Hệ thống trang phục đa dạng: Nhật Bình, Áo Tấc, Ngũ Thân, Giao Lĩnh... với chất liệu gấm, lụa cao cấp.</p>
          <ul style={{ margin: '15px 0', paddingLeft: '20px', color: '#444' }}>
            <li>Đầy đủ phụ kiện: Mấn, guốc, quạt, kiềng...</li>
            <li>Giặt ủi sạch sẽ, thơm tho sau mỗi lần sử dụng.</li>
          </ul>
          <div style={priceBoxStyle}>
            Giá thuê chỉ từ: <span style={priceStyle}>300.000 VNĐ</span> / bộ
          </div>
          <button onClick={onBookClick} style={buttonStyle}>Thuê ngay</button>
        </div>
        <img src="/img/anh2.jpg" alt="Thuê Việt Phục" style={imgStyle} />
      </div>

      {/* DỊCH VỤ 2: PHOTOBOOTH */}
      <div style={cardStyle}>
        <img src="/img/anh1.jpg" alt="Chụp ảnh Photobooth" style={imgStyle} />
        <div style={contentStyle}>
          <h3 style={titleStyle}>2. Chụp ảnh Photobooth</h3>
          <p>Lưu giữ khoảnh khắc nhanh chóng, lấy ngay tại các điểm di tích. Hệ thống máy chụp hiện đại, phông nền thiết kế riêng.</p>
          <div style={{ margin: '20px 0', border: '1px solid #ddd', borderRadius: '8px', overflow: 'hidden' }}>
            <div style={tableRowStyle}>
              <span>Gói ảnh dọc (2 tấm)</span>
              <strong style={{color: '#D4AF37'}}>100.000 VNĐ</strong>
            </div>
            <div style={{...tableRowStyle, borderBottom: 'none'}}>
              <span>Gói ảnh vuông (2 tấm)</span>
              <strong style={{color: '#D4AF37'}}>120.000 VNĐ</strong>
            </div>
            
          </div>
          <button onClick={onBookClick} style={buttonStyle}>Đặt lịch chụp</button>
        </div>
      </div>

      {/* DỊCH VỤ 3: ĐỐI TÁC MAKEUP & PHOTO (ĐÃ SỬA) */}
      <div style={cardStyle}>
        <div style={contentStyle}>
          <h3 style={titleStyle}>3. Đối tác Make up & Nhiếp ảnh</h3>
          <p>Dịch vụ kết hợp với các chuyên gia trang điểm và nhiếp ảnh gia chuyên nghiệp tại địa phương.</p>
          
          <div style={{ backgroundColor: '#fffcf5', padding: '15px', borderRadius: '8px', border: '1px dashed #D4AF37', margin: '15px 0' }}>
            <p style={{ margin: '5px 0' }}> <strong>Gói chụp ảnh (1 người/2 giờ):</strong> <span style={priceStyle}>600.000 VNĐ</span></p>
            <p style={{ margin: '5px 0' }}> <strong>Thêm người:</strong> Phụ thu <span style={priceStyle}>400.000 VNĐ</span> / người</p>
          </div>
          <div style={{ backgroundColor: '#fffcf5', padding: '15px', borderRadius: '8px', border: '1px dashed #D4AF37', margin: '15px 0' }}>
            <p style={{ margin: '5px 0' }}> <strong>Gói make up & chụp ảnh (1 người/2 giờ):</strong> <span style={priceStyle}>900.000 VNĐ</span></p>
            <p style={{ margin: '5px 0' }}> <strong>Thêm người:</strong> Phụ thu <span style={priceStyle}>500.000 VNĐ</span> / người</p>
          </div>
          <div style={{ backgroundColor: '#fffcf5', padding: '15px', borderRadius: '8px', border: '1px dashed #D4AF37', margin: '15px 0' }}>
            <p style={{ margin: '5px 0' }}> <strong>Gói cho trẻ em dưới 5 tuổi (make up - chụp ảnh) (1 người/2 giờ):</strong> <span style={priceStyle}>500.000 VNĐ</span></p>
            <p style={{ margin: '5px 0' }}> <strong>Thêm người:</strong> Phụ thu <span style={priceStyle}>300.000 VNĐ</span> / người</p>
          </div>
          <p style={{ fontSize: '12px', color: '#888', fontStyle: 'italic', marginBottom: '15px', lineHeight: '1.4' }}>
             <strong>Lưu ý:</strong> Dịch vụ này được thực hiện bởi đối tác liên kết. Sau khi xác nhận, đối tác chịu hoàn toàn trách nhiệm về chất lượng và kết quả dịch vụ.
          </p>

          {/* Đã xóa nút bấm, thay bằng dòng thông báo */}
          <div style={{ padding: '10px', background: '#eee', borderRadius: '5px', fontSize: '14px', fontStyle: 'italic' }}>
             Bạn có thể chọn thêm dịch vụ này khi <b>Đặt thuê trang phục</b>.
          </div>
        </div>
        <img src="/img/anh3.jpg" alt="Makeup Artist" style={imgStyle} />
      </div>

    </div>
  );
}

// --- Styles ---
const cardStyle = { display: 'flex', gap: '30px', marginBottom: '40px', alignItems: 'center', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', padding: '20px', borderRadius: '12px', backgroundColor: '#fff', flexWrap: 'wrap' as const, overflow: 'hidden' };
const imgStyle = { flex: 1, minWidth: '300px', height: '350px', objectFit: 'cover' as const, borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' };
const contentStyle = { flex: 1, minWidth: '300px' };
const titleStyle = { fontSize: '22px', marginBottom: '10px', color: '#000' };
const priceBoxStyle = { fontSize: '18px', margin: '15px 0' };
const priceStyle = { color: '#D4AF37', fontWeight: 'bold', fontSize: '20px' };
const buttonStyle = { padding: '12px 30px', backgroundColor: '#000', color: '#D4AF37', border: 'none', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer', textTransform: 'uppercase' as const };
const tableRowStyle = { display: 'flex', justifyContent: 'space-between', padding: '12px', borderBottom: '1px solid #eee', fontSize: '15px' };