

// Dữ liệu nội dung của 5 địa điểm
const locationData: any = {
  "trang-an": {
    name: "Tràng An - Ninh Bình",
    desc: "Di sản thiên nhiên và văn hóa thế giới. Nơi đây sở hữu phong cảnh non nước hữu tình, rất phù hợp cho các bộ ảnh Việt phục cổ trang (Giao Lĩnh, Viên Lĩnh).",
    img: "/img/trangan3.jpg" 
  },
  "hoa-lu": {
    name: "Phố Cổ Hoa Lư",
    desc: "Phố cổ Hoa Lư là một điểm nhấn du lịch về đêm hấp dẫn ở Ninh Bình, tái hiện không gian và kiến trúc văn hóa truyền thống của Đại Việt vào thế kỷ thứ X.",
    img: "/img/phoco.jpg"
  },
  "hue": {
    name: "Kinh thành Huế",
    desc: "Đại Nội Huế với kiến trúc cung đình lộng lẫy. Đây là 'sân khấu' hoàn hảo nhất cho Áo Tấc, Nhật Bình và các trang phục triều Nguyễn.",
    img: "/img/hue1.jpg"
  },
  "thang-long": {
    name: "Hoàng thành Thăng Long",
    desc: "Di sản văn hóa thế giới giữa lòng Hà Nội. Nơi lưu giữ dấu ấn của các triều đại Lý, Trần, Lê. Phù hợp chụp áo Ngũ Thân, Tứ Thân.",
    img: "/img/hoangthanh1.jpg"
  },
  "van-mieu": {
    name: "Văn Miếu - Quốc Tử Giám",
    desc: "Trường đại học đầu tiên của Việt Nam. Không gian nho nhã, thanh tịnh, rất hợp với áo dài truyền thống và các bộ ảnh kỷ yếu.",
    img: "/img/vanmieu.jpg"
  }
};

interface Props {
  locationId: string;
  onBookNow: (locName: string) => void;
}

export default function LocationDetail({ locationId, onBookNow }: Props) {
  const data = locationData[locationId];

  if (!data) return <div style={{padding: 40, textAlign: 'center'}}>Đang cập nhật dữ liệu...</div>;

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', paddingBottom: '40px' }}>
      {/* Ảnh bìa địa điểm */}
      <div style={{ 
        height: '550px', 
        backgroundImage: `url(${data.img})`, 
        backgroundSize: 'cover', 
        backgroundPosition: 'center',
        position: 'relative',
        display: 'flex',
        alignItems: 'end'
      }}>
        <div style={{ 
          background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)', 
          width: '100%', 
          padding: '40px 20px',
          color: '#fff'
        }}>
          <h1 style={{ fontSize: '36px', textShadow: '2px 2px 4px #000' }}>{data.name}</h1>
        </div>
      </div>

      {/* Nội dung giới thiệu */}
      <div style={{ padding: '40px 20px', display: 'flex', gap: '40px', flexWrap: 'wrap' }}>
        <div style={{ flex: 2, minWidth: '300px' }}>
          <h2 style={{ color: '#D4AF37', marginBottom: '20px' }}>Giới thiệu chung</h2>
          <p style={{ lineHeight: '1.8', fontSize: '16px', color: '#444' }}>
            {data.desc}
          </p>
          <p style={{ marginTop: '20px' }}>
            Việt Sắc cung cấp dịch vụ trọn gói tại <b>{data.name}</b> bao gồm: Trang phục, Make up và Thợ chụp ảnh đi theo đoàn.
          </p>
        </div>

        {/* Cột bên phải: Nút đặt lịch */}
        <div style={{ flex: 1, minWidth: '250px', backgroundColor: '#fffcf5', padding: '30px', borderRadius: '10px', border: '1px dashed #D4AF37', height: 'fit-content' }}>
          <h3 style={{ marginBottom: '15px' }}>Bạn muốn chụp tại đây?</h3>
          <p style={{ fontSize: '14px', color: '#666', marginBottom: '20px' }}>
            Đặt lịch ngay để giữ chỗ và nhận ưu đãi giảm giá 5% cho nhóm trên 3 người.
          </p>
          <button 
            onClick={() => onBookNow(data.name)}
            style={{ 
              width: '100%', 
              padding: '15px', 
              backgroundColor: '#000', 
              color: '#D4AF37', 
              border: 'none', 
              fontWeight: 'bold', 
              cursor: 'pointer',
              textTransform: 'uppercase'
            }}
          >
            Đặt lịch tại {data.name}
          </button>
        </div>
      </div>
    </div>
  );
}