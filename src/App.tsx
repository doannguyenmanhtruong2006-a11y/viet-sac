import RatingWidget from "./RatingWidget";
import { useState, useEffect } from "react";
import "./index.css";

import BookingForm from "./BookingForm"; 
import Collection from "./Collection"; 
import Services from "./Services";
import Login from "./Login";
import UserProfile from "./UserProfile"; 
import Admin from "./Admin"; 
import LocationDetail from "./LocationDetail";
import ChatWidget from "./ChatWidget"; // Import Chat

export interface Order {
  id: string;
  date: string;
  service: string;
  status: string;
  details: string;
}

function App() {
  // Dữ liệu
  const [userPhone, setUserPhone] = useState(() => localStorage.getItem("userPhone") || "");
  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem("orders");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => { localStorage.setItem("userPhone", userPhone); }, [userPhone]);
  useEffect(() => { localStorage.setItem("orders", JSON.stringify(orders)); }, [orders]);

  // Trạng thái giao diện
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [currentView, setCurrentView] = useState("home");
  const [selectedProduct, setSelectedProduct] = useState("");
  const [pendingView, setPendingView] = useState(""); 
  const [locationId, setLocationId] = useState("trang-an"); 

  // Các hàm xử lý
  const handleAddOrder = (newOrder: Order) => {
    setOrders([newOrder, ...orders]);
  };

  const handleUpdateOrderStatus = (orderId: string, newStatus: string) => {
    const updatedOrders = orders.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    );
    setOrders(updatedOrders);
  };

  const switchView = (viewName: string) => {
    if (viewName === "booking" && userPhone === "") {
      alert("Vui lòng Đăng nhập để thực hiện Đặt lịch!");
      setPendingView("booking");
      setCurrentView("login");
      window.scrollTo(0, 0);
      setIsMobileMenuOpen(false);
      return;
    }
    if (viewName !== "booking") setSelectedProduct("");
    setCurrentView(viewName);
    window.scrollTo(0, 0);
    setIsMobileMenuOpen(false);
    setIsDropdownOpen(false);
  };

  const handleViewLocation = (id: string) => {
    setLocationId(id);
    switchView("location");
  };

  const handleRentFromCollection = (productName: string) => {
    if (userPhone === "") {
      alert("Vui lòng Đăng nhập để thuê trang phục này!");
      setSelectedProduct(productName);
      setPendingView("booking");
      setCurrentView("login");
      window.scrollTo(0, 0);
    } else {
      setSelectedProduct(productName);
      switchView("booking");
    }
  };

  const handleBookFromService = () => {
    if (userPhone === "") {
        alert("Vui lòng Đăng nhập để đặt dịch vụ!");
        setPendingView("booking");
        setCurrentView("login");
        window.scrollTo(0, 0);
    } else {
        switchView("booking");
    }
  }

  const handleLoginSuccess = (phone: string) => {
    setUserPhone(phone);
    if (pendingView === "booking") {
      setCurrentView("booking");
      setPendingView("");
    } else {
      switchView("profile");
    }
  };

  const handleLogout = () => {
    setUserPhone("");
    switchView("home");
  };

  return (
    <div className="app-container">
      <header className="header">
        <h1 className="logo" onClick={() => switchView("home")} style={{cursor: 'pointer'}}>
            Việt Sắc
        </h1>
        <button className="hamburger" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>☰</button>
        <nav className={`nav-bar ${isMobileMenuOpen ? 'active' : ''}`}>
          <a href="#" className="nav-link" onClick={() => switchView("home")}>Trang chủ</a>
          <div className="dropdown">
            <button className={`dropdown-btn ${isDropdownOpen ? "active" : ""}`} onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
              Địa điểm ▾
            </button>
            {isDropdownOpen && (
              <ul className="dropdown-menu">
                <li><a href="#" onClick={() => handleViewLocation("trang-an")}>Tràng An</a></li>
                <li><a href="#" onClick={() => handleViewLocation("hoa-lu")}>Phố cổ Hoa Lư</a></li>
                <li><a href="#" onClick={() => handleViewLocation("hue")}>Kinh thành Huế</a></li>
                <li><a href="#" onClick={() => handleViewLocation("thang-long")}>Hoàng thành Thăng Long</a></li>
                <li><a href="#" onClick={() => handleViewLocation("van-mieu")}>Văn Miếu Quốc Tử Giám</a></li>
              </ul>
            )}
          </div>
          <a href="#" className="nav-link" onClick={() => switchView("collection")}>Bộ sưu tập</a>
          <a href="#" className="nav-link" onClick={() => switchView("services")}>Dịch vụ</a>
          <a href="#" className="nav-link" style={{ fontWeight: "bold", color: "#D4AF37" }} onClick={() => switchView("booking")}>Đặt lịch</a>
          {userPhone !== "" ? (
             <a href="#" className="nav-link" onClick={() => switchView("profile")} style={{border: '1px solid #ddd', borderRadius: '20px', padding: '5px 15px', backgroundColor: '#f9f9f9'}}>👤 {userPhone}</a>
          ) : (
             <a href="#" className="nav-link" onClick={() => switchView("login")}>👤 Tài khoản</a>
          )}
        </nav>
      </header>

      <main style={{ minHeight: '80vh' }}>
        {currentView === "home" && (
          <>
            <div className="hero-banner">
              <h1 className="hero-title">Tinh Hoa Cổ Phục Việt</h1>
              <p className="hero-subtitle">Tự hào mang đến trải nghiệm văn hóa độc đáo qua từng tà áo tại các địa điểm lịch sử và danh lam thắm cảnh nổi tiếng</p>
              <button className="cta-button" onClick={() => switchView("booking")} style={{ fontSize: '18px', padding: '15px 40px', boxShadow: '0 4px 15px rgba(212, 175, 55, 0.4)' }}>ĐẶT LỊCH NGAY</button>
            </div>
           <section className="content-section" style={{ marginTop: '60px' }}>
              <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                <h2 style={{ color: '#D4AF37', textTransform: 'uppercase', marginBottom: '30px' }}>Giá Trị Cốt Lõi</h2>
                
                <div className="features-grid">
                  {/* Mục 1 */}
                  <div className="feature-item">
                    <img 
                      src="/img/anh10.jpg" 
                      alt="Tôn Vinh Di Sản" 
                      style={{ width: '120px', height: '120px', objectFit: 'cover', borderRadius: '50%', marginBottom: '15px', border: '3px solid #D4AF37', padding: '3px' }} 
                    />
                    <h3>Tôn Vinh Di Sản</h3>
                    <p style={{fontSize:'14px',color:'#555'}}>Phục dựng tỉ mỉ từng đường kim mũi chỉ, đưa nét đẹp cổ phục sống lại.</p>
                  </div>

                  {/* Mục 2 */}
                  <div className="feature-item">
                    <img 
                      src="/img/anh8.jpg" 
                      alt="Dấu Ấn Ngàn Năm" 
                      style={{ width: '120px', height: '120px', objectFit: 'cover', borderRadius: '50%', marginBottom: '15px', border: '3px solid #D4AF37', padding: '3px' }} 
                    />
                    <h3>Dấu Ấn Ngàn Năm</h3>
                    <p style={{fontSize:'14px',color:'#555'}}>Mỗi bộ trang phục là một câu chuyện lịch sử, chạm tay vào quá khứ vàng son.</p>
                  </div>

                  {/* Mục 3 */}
                  <div className="feature-item">
                    <img 
                      src="/img/anh9.jpg" 
                      alt="Lan Tỏa Bản Sắc" 
                      style={{ width: '120px', height: '120px', objectFit: 'cover', borderRadius: '50%', marginBottom: '15px', border: '3px solid #D4AF37', padding: '3px' }} 
                    />
                    <h3>Lan Tỏa Bản Sắc</h3>
                    <p style={{fontSize:'14px',color:'#555'}}>Cùng Việt Sắc mang văn hóa Việt đi muôn nơi, khơi dậy niềm tự hào dân tộc.</p>
                  </div>
                </div>
              </div>
            </section>
            <section className="content-section" style={{ background: '#fffcf5', padding: '60px 20px', marginTop: '60px', borderRadius: '20px' }}>
              <div style={{ textAlign: 'center' }}>
                  <h2 style={{ color: '#000', marginBottom: '30px' }}>DỊCH VỤ CỦA CHÚNG TÔI</h2>
                  <div style={{ display: 'flex', gap: '30px', justifyContent: 'center', flexWrap: 'wrap' }}>
                      <div style={{ width: '280px', background: '#fff', padding: '20px', borderRadius: '10px', boxShadow: '0 5px 15px rgba(0,0,0,0.05)' }}>
                        <img src="/img/anh4.jpg" alt="Việt Phục" style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '5px' }} />
                        <h3 style={{ margin: '15px 0', fontSize: '18px' }}>Thuê Việt Phục</h3>
                        <button onClick={() => switchView("collection")} style={{ border: '1px solid #000', background: 'none', padding: '8px 20px', cursor: 'pointer', borderRadius: '20px' }}>Xem mẫu</button>
                      </div>
                      <div style={{ width: '280px', background: '#fff', padding: '20px', borderRadius: '10px', boxShadow: '0 5px 15px rgba(0,0,0,0.05)' }}>
                        <img src="/img/anh5.jpg" alt="Photobooth" style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '5px' }} />
                        <h3 style={{ margin: '15px 0', fontSize: '18px' }}>Photobooth</h3>
                        <button onClick={() => switchView("services")} style={{ border: '1px solid #000', background: 'none', padding: '8px 20px', cursor: 'pointer', borderRadius: '20px' }}>Xem giá</button>
                      </div>
                      <div style={{ width: '280px', background: '#fff', padding: '20px', borderRadius: '10px', boxShadow: '0 5px 15px rgba(0,0,0,0.05)' }}>
                        <img src="/img/anh6.jpg" alt="Makeup" style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '5px' }} />
                        <h3 style={{ margin: '15px 0', fontSize: '18px' }}>Makeup & Photo</h3>
                        <button onClick={() => switchView("services")} style={{ border: '1px solid #000', background: 'none', padding: '8px 20px', cursor: 'pointer', borderRadius: '20px' }}>Chi tiết</button>
                      </div>
                  </div>
              </div>
            </section>
          </>
        )}

        {currentView === "collection" && <Collection onRentClick={handleRentFromCollection} />}
        {currentView === "services" && <Services onBookClick={handleBookFromService} />}
        {currentView === "booking" && <BookingForm initialProduct={selectedProduct} onAddOrder={handleAddOrder} />}
        {currentView === "login" && <Login onLoginSuccess={handleLoginSuccess} />}
        {currentView === "profile" && <UserProfile phone={userPhone} orders={orders} onLogout={handleLogout} />}
        {currentView === "admin" && <Admin orders={orders} onUpdateStatus={handleUpdateOrderStatus} onLogout={() => switchView("home")} />}
        {currentView === "location" && <LocationDetail locationId={locationId} onBookNow={() => switchView("booking")} />}
      </main>

      <footer style={{ backgroundColor: '#000', color: '#fff', padding: '40px 20px', marginTop: '50px' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', textAlign: 'center' }}>
            <h2 style={{ color: '#D4AF37', marginBottom: '20px', textTransform: 'uppercase', letterSpacing: '2px' }}>Việt Sắc</h2>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '40px', flexWrap: 'wrap', marginBottom: '30px', fontSize: '14px', color: '#ccc' }}>
                <div><strong> ĐỊA CHỈ</strong><br/>79 Rosetown, Ngọc Hồi - Hà Nội</div>
                <div><strong> HOTLINE</strong><br/><span style={{color: '#D4AF37'}}>0978 797 235</span></div>
                <div><strong> EMAIL</strong><br/>doannguyenmanhtruong2006@gmail.com</div>
            </div>
            <p style={{ fontSize: '12px', color: '#666' }}>© 2025 Việt Sắc. All rights reserved.</p>
            <div style={{ marginTop: '30px', borderTop: '1px solid #333', paddingTop: '20px' }}>
              <button onClick={() => switchView("admin")} style={{ background: 'transparent', border: '1px solid #D4AF37', color: '#D4AF37', padding: '5px 15px', cursor: 'pointer', fontSize: '12px', borderRadius: '4px' }}> TRANG QUẢN TRỊ (ADMIN)</button>
            </div>
        </div>
      </footer>

      {/* WIDGETS: Chỉ hiện khi KHÔNG PHẢI trang Admin */}
      {currentView !== "admin" && (
        <>
          <RatingWidget />
          <ChatWidget />
        </>
      )}
    </div>
  );
}

export default App;