import type React from "react";
import "./auth.scss";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="auth-container">
      <div className="auth-banner">
        <h1 className="welcome-title">
          Welcome
          <br />
          Back!
        </h1>
        <p className="welcome-subtitle">欢迎来到LAW社区~</p>
        <div className="auth-image-container">
          <img
            src="/auth/login_layout_balance.png"
            alt="Auth Image"
            className="auth-image"
          />
        </div>
        <div className="auth-ellipse-container">
            <div className="ellipse ellipse-1"></div>
            <div className="ellipse ellipse-2"></div>
        </div>
      </div>

      <div className="auth-form-container">
        <div className="logo-container">
          <img src="/auth/logo_LAW.svg" width={'500px'} alt="Logo" className="logo" />
          {/* <span className="logo-text">LAW社区</span> */}
        </div>
        {children}
      </div>
    </div>
  );
}
