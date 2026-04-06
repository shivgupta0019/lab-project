import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../Style/userotp.css";

export default function OTPPage() {
  const navigate = useNavigate();

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timeLeft, setTimeLeft] = useState(60);
  const [resendActive, setResendActive] = useState(false);

  const inputsRef = useRef([]);

  // ⏳ TIMER
  useEffect(() => {
    if (timeLeft === 0) {
      setResendActive(true);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  // 📲 AUTO OTP READ (optional)
  useEffect(() => {
    if ("OTPCredential" in window) {
      const ac = new AbortController();

      navigator.credentials
        .get({
          otp: { transport: ["sms"] },
          signal: ac.signal,
        })
        .then((otpData) => {
          if (otpData && otpData.code) {
            const code = otpData.code.split("");
            setOtp(code);
          }
        })
        .catch(() => {});

      return () => ac.abort();
    }
  }, []);

  // 🔤 INPUT CHANGE
  function handleChange(value, index) {
    if (isNaN(value)) return;

    let newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputsRef.current[index + 1].focus();
    }
  }

  // ⌫ BACKSPACE
  function handleKeyDown(e, index) {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  }

  // 📋 PASTE
  function handlePaste(e) {
    e.preventDefault();
    const pasteData = e.clipboardData.getData("text").trim();

    if (!/^\d+$/.test(pasteData)) return;

    const otpArray = pasteData.slice(0, 6).split("");
    const newOtp = ["", "", "", "", "", ""];

    otpArray.forEach((val, i) => {
      newOtp[i] = val;
    });

    setOtp(newOtp);

    const lastIndex = otpArray.length - 1;
    if (lastIndex >= 0) {
      inputsRef.current[lastIndex].focus();
    }
  }

  // 🚀 AUTO VERIFY
  useEffect(() => {
    if (otp.every((digit) => digit !== "")) {
      handleVerify();
    }
  }, [otp]);

  // ✅ VERIFY
  function handleVerify() {
    const enteredOtp = otp.join("");
    const savedOtp = localStorage.getItem("otp");

    if (enteredOtp === savedOtp) {
      alert("Login Successful ");
      navigate("/dashboard");
    } else {
      alert("Invalid OTP ");
    }
  }

  // 🔁 RESEND OTP (MAIN LOGIC)
  function handleResend() {
    if (!resendActive) return; // prevent early click

    // 🔥 new OTP generate
    const newOtp = Math.floor(100000 + Math.random() * 900000).toString();

    // save
    localStorage.setItem("otp", newOtp);

    // demo ke liye show
    alert("New OTP: " + newOtp);

    // reset timer + UI
    setTimeLeft(60);
    setResendActive(false);
    setOtp(["", "", "", "", "", ""]);

    // focus first input
    setTimeout(() => {
      inputsRef.current[0]?.focus();
    }, 100);
  }

  return (
    <div className="auth-container">
      <div className="auth-box fade-in">
        <h2>Enter OTP</h2>

        <div className="otp-box">
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={(el) => (inputsRef.current[index] = el)}
              type="text"
              maxLength="1"
              value={digit}
              onChange={(e) => handleChange(e.target.value, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              onPaste={handlePaste}
              className={`otp-input ${digit ? "filled" : ""}`}
            />
          ))}
        </div>

        {/* ⏳ TIMER + RESEND (RIGHT SIDE) */}
        <div className="d-flex justify-content-between align-items-center mt-2">
          {!resendActive ? (
            <p className="timer m-0">Resend OTP in {timeLeft}s</p>
          ) : (
            <span></span>
          )}

          <span
            className={`resend-link ${!resendActive ? "disabled" : ""}`}
            onClick={handleResend}
          >
            Resend OTP
          </span>
        </div>

        <button onClick={handleVerify} className="verify-btn">
          Verify OTP
        </button>
      </div>
    </div>
  );
}