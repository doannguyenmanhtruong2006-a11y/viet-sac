import { useState } from 'react';

export default function Login({ onLoginSuccess }: { onLoginSuccess: (phone: string) => void }) {
  const [step, setStep] = useState(1);
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');

  const handleSendOtp = () => {
    if (phone.length < 10) {
      alert("SĐT không hợp lệ");
      return;
    }
    setStep(2);
  };

  const handleVerifyOtp = () => {
    if (otp === '123456') {
      onLoginSuccess(phone);
    } else {
      alert("Sai OTP! Nhập 123456 để test.");
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', padding: '30px', border: '1px solid #ddd', borderRadius: '8px', textAlign: 'center' }}>
      <h2 style={{ color: '#D4AF37' }}>ĐĂNG NHẬP</h2>
      
      {step === 1 ? (
        <>
          <p>Nhập số điện thoại để đặt lịch</p>
          <input 
            type="tel" 
            placeholder="Số điện thoại..." 
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            style={{ width: '100%', padding: '10px', margin: '10px 0' }}
          />
          <button onClick={handleSendOtp} style={{ padding: '10px 20px', backgroundColor: '#000', color: '#fff', border: 'none', cursor: 'pointer' }}>
            Gửi OTP
          </button>
        </>
      ) : (
        <>
          <p>Mã OTP đã gửi đến {phone}</p>
          <input 
            type="text" 
            placeholder="Nhập 123456" 
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            style={{ width: '100%', padding: '10px', margin: '10px 0', textAlign: 'center', letterSpacing: '3px' }}
          />
          <button onClick={handleVerifyOtp} style={{ padding: '10px 20px', backgroundColor: '#000', color: '#fff', border: 'none', cursor: 'pointer' }}>
            Xác nhận
          </button>
        </>
      )}
    </div>
  );
}