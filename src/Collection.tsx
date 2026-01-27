// File: src/Collection.tsx

// Danh sách 10 sản phẩm
const products = [
  {
    id: 1,
    name: "Nhật Bình Hoàng Tộc",
    priceRent: "500.000đ",
    priceBuy: "2.500.000đ",
    image: "/img/1-1.jpg"
  },
  {
    id: 2,
    name: "Áo Tấc Ngũ Thân",
    priceRent: "300.000đ",
    priceBuy: "1.200.000đ",
    image: "/img/viet-phuc-cach-tan.jpg"
  },
  {
    id: 3,
    name: "Việt Phục Cách Tân",
    priceRent: "350.000đ",
    priceBuy: "1.500.000đ",
    image: "/img/3.jpg"
  },
  // --- THÊM 7 BỘ MỚI TỪ ĐÂY ---
  {
    id: 4,
    name: "Ngũ Thân Tay Chẽn",
    priceRent: "400.000đ",
    priceBuy: "1.800.000đ",
    image: "/img/4.jpg"
  },
  {
    id: 5,
    name: "Giao Lĩnh Cổ Trang",
    priceRent: "450.000đ",
    priceBuy: "2.000.000đ",
    image: "/img/5.jpg"
  },
  {
    id: 6,
    name: "Áo Dài Lemur 1930",
    priceRent: "350.000đ",
    priceBuy: "1.400.000đ",
    image: "/img/6.jpg"
  },
  {
    id: 7,
    name: "Viên Lĩnh Triều Lê",
    priceRent: "550.000đ",
    priceBuy: "2.800.000đ",
    image: "/img/7.jpg"
  },
  {
    id: 8,
    name: "Phượng Bào Hoàng Hậu",
    priceRent: "1.200.000đ",
    priceBuy: "8.500.000đ",
    image: "/img/8.jpg"
  },
  {
    id: 9,
    name: "Áo Tứ Thân Bắc Bộ",
    priceRent: "250.000đ",
    priceBuy: "900.000đ",
    image: "/img/ao-tac.jpg"
  },
  {
    id: 10,
    name: "Áo Đối Khâm",
    priceRent: "600.000đ",
    priceBuy: "3.000.000đ",
    image: "/img/ao-nhat-binh.jpg"
  },
  {
    id: 11,
    name: "Áo Tấc Gấm Đỏ",
    priceRent: "350.000đ",
    priceBuy: "1.600.000đ",
    image: "/img/11.jpg"
  },
  {
    id: 12,
    name: "Nhật Bình Thiên Thanh",
    priceRent: "550.000đ",
    priceBuy: "2.800.000đ",
    image: "/img/12.jpg"
  },
  {
    id: 13,
    name: "Ngũ Thân Lập Lĩnh",
    priceRent: "400.000đ",
    priceBuy: "1.900.000đ",
    image: "/img/13.jpg"
  },
  {
    id: 14,
    name: "Giao Lĩnh Vạt Ngắn",
    priceRent: "420.000đ",
    priceBuy: "2.100.000đ",
    image: "/img/14.jpg"
  },
  {
    id: 15,
    name: "Áo Dài Cổ Phục",
    priceRent: "300.000đ",
    priceBuy: "1.200.000đ",
    image: "/img/15.jpg"
  },
  {
    id: 16,
    name: "Viên Lĩnh Họa Tiết",
    priceRent: "500.000đ",
    priceBuy: "2.500.000đ",
    image: "/img/16.jpg"
  }
];

export default function Collection({ onRentClick }: { onRentClick: (productName: string) => void }) {
  return (
    <div style={{ maxWidth: '1200px', margin: '40px auto', padding: '0 20px' }}>
      <h2 style={{ textAlign: 'center', color: '#D4AF37', marginBottom: '10px', textTransform: 'uppercase' }}>BỘ SƯU TẬP VIỆT SẮC</h2>
      <p style={{ textAlign: 'center', color: '#666', marginBottom: '40px' }}>Tinh hoa cổ phục Việt - Đậm đà bản sắc dân tộc</p>
      
      {/* Grid tự động xuống dòng khi nhiều sản phẩm */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '30px' }}>
        {products.map((product) => (
          <div key={product.id} style={{ border: '1px solid #eee', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', transition: 'transform 0.2s', backgroundColor: '#fff' }}>
            
            {/* Ảnh sản phẩm */}
            <div style={{ overflow: 'hidden', height: '350px' }}>
                <img 
                    src={product.image} 
                    alt={product.name} 
                    style={{ width: '100%', height: '100%', objectFit: 'cover', transition: '0.3s' }} 
                    onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                    onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                />
            </div>
            
            {/* Thông tin */}
            <div style={{ padding: '20px', textAlign: 'center' }}>
              <h3 style={{ fontSize: '18px', marginBottom: '10px', height: '45px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{product.name}</h3>
              
              <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', fontSize: '13px', color: '#555', marginBottom: '15px' }}>
                <span style={{background: '#f5f5f5', padding: '4px 8px', borderRadius: '4px'}}>Thuê: <b>{product.priceRent}</b></span>
                <span style={{background: '#fffbf0', padding: '4px 8px', borderRadius: '4px', border: '1px solid #eee'}}>Mua: <b>{product.priceBuy}</b></span>
              </div>
              
              {/* Nút hành động */}
              <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
                <button 
                  onClick={() => onRentClick(product.name)}
                  style={{ flex: 1, padding: '10px', backgroundColor: '#000', color: '#D4AF37', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
                >
                  Thuê ngay
                </button>
                <button 
                  onClick={() => onRentClick(product.name)}
                  style={{ flex: 1, padding: '10px', backgroundColor: '#fff', color: '#000', border: '1px solid #000', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
                >
                  Mua ngay
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}