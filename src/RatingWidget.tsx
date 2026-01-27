import { useState } from 'react';

export default function RatingWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [rating, setRating] = useState(0); // Số sao chọn (1-5)
  const [hover, setHover] = useState(0);   // Hiệu ứng khi di chuột qua sao
  const [comment, setComment] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = () => {
    if (rating === 0) {
      alert("Vui lòng chọn số sao!");
      return;
    }

    // 1. Tạo dữ liệu đánh giá
    const newReview = {
      id: Date.now(),
      date: new Date().toLocaleDateString('vi-VN'),
      stars: rating,
      text: comment || "Không có lời nhắn",
      user: "Khách hàng ẩn danh" // Vì không bắt buộc đăng nhập
    };

    // 2. Lấy dữ liệu cũ từ bộ nhớ
    const savedReviews = localStorage.getItem("customer_reviews");
    const reviews = savedReviews ? JSON.parse(savedReviews) : [];

    // 3. Lưu dữ liệu mới
    localStorage.setItem("customer_reviews", JSON.stringify([newReview, ...reviews]));

    // 4. Thông báo thành công
    setIsSubmitted(true);
    
    // Tự động đóng sau 2 giây
    setTimeout(() => {
      setIsOpen(false);
      setIsSubmitted(false);
      setRating(0);
      setComment("");
    }, 2000);
  };

  return (
    <div style={{ position: 'fixed', bottom: '90px', right: '25px', zIndex: 9998, fontFamily: 'Segoe UI, sans-serif' }}>
      
      {/* NÚT MỞ ĐÁNH GIÁ (Hình ngôi sao) */}
      {!isOpen && (
        <button 
          onClick={() => setIsOpen(true)}
          style={{
            width: '50px', height: '50px', borderRadius: '50%', 
            backgroundColor: '#fff', color: '#D4AF37', border: '2px solid #D4AF37',
            fontSize: '24px', cursor: 'pointer', boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'transform 0.2s'
          }}
          title="Đánh giá dịch vụ"
          onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
          onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
          ⭐
        </button>
      )}

      {/* FORM ĐÁNH GIÁ */}
      {isOpen && (
        <div style={{
          width: '300px', backgroundColor: '#fff', padding: '20px',
          borderRadius: '12px', boxShadow: '0 5px 25px rgba(0,0,0,0.2)',
          border: '1px solid #D4AF37', position: 'absolute', bottom: '0', right: '0'
        }}>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
            <strong style={{ color: '#000' }}>Đánh giá dịch vụ</strong>
            <button onClick={() => setIsOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '16px' }}>✖</button>
          </div>

          {isSubmitted ? (
            <div style={{ textAlign: 'center', color: 'green', padding: '20px 0' }}>
              <p style={{ fontSize: '30px' }}>🎉</p>
              <p>Cảm ơn bạn đã đánh giá!</p>
            </div>
          ) : (
            <>
              {/* Chọn Sao */}
              <div style={{ display: 'flex', justifyContent: 'center', gap: '5px', marginBottom: '15px' }}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    style={{ 
                      fontSize: '30px', cursor: 'pointer', 
                      color: star <= (hover || rating) ? '#FFD700' : '#ddd',
                      transition: 'color 0.2s'
                    }}
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHover(star)}
                    onMouseLeave={() => setHover(rating)}
                  >
                    ★
                  </span>
                ))}
              </div>

              {/* Nhập lời nhắn */}
              <textarea 
                placeholder="Chia sẻ cảm nhận của bạn..." 
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                rows={3}
                style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc', marginBottom: '10px', fontSize: '13px' }}
              />

              <button 
                onClick={handleSubmit}
                style={{ width: '100%', padding: '10px', backgroundColor: '#000', color: '#D4AF37', border: 'none', borderRadius: '5px', fontWeight: 'bold', cursor: 'pointer' }}
              >
                GỬI ĐÁNH GIÁ
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}