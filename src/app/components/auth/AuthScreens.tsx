import { useState, useEffect } from "react";
import {
  Eye, EyeOff, Mail, Lock, User, ArrowRight, RefreshCw,
  CheckCircle, AlertCircle, Monitor, Shield, Zap, ChevronLeft, Phone
} from "lucide-react";

type AuthView = "splash" | "login" | "register" | "forgot" | "reset" | "success" | "session-expired";

interface AuthScreensProps {
  onLogin: (role: "admin" | "manager" | "employee") => void;
}

function SplashScreen({ onNext }: { onNext: () => void }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full opacity-20"
          style={{ background: "radial-gradient(circle, var(--primary) 0%, transparent 70%)" }} />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full opacity-20"
          style={{ background: "radial-gradient(circle, var(--accent) 0%, transparent 70%)" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-5"
          style={{ background: "radial-gradient(circle, var(--primary) 0%, transparent 70%)" }} />
      </div>

      <div className="relative z-10 text-center px-8 max-w-lg mx-auto">
        <div className="mb-8 flex justify-center">
          <div className="w-24 h-24 rounded-3xl gradient-primary flex items-center justify-center glow-primary">
            <Monitor className="w-12 h-12 text-white" />
          </div>
        </div>
        <h1 className="mb-3 flex justify-center gap-2 text-2xl sm:text-3xl md:text-4xl font-bold whitespace-nowrap">
          <span style={{ color: "var(--primary)" }}>Employee</span>
          <span style={{ color: "var(--foreground)" }}>Monitoring</span>
          <span style={{ color: "var(--accent)" }}>System</span>
        </h1>
        <p className="mb-10" style={{ color: "var(--muted-foreground)", fontSize: "1.1rem" }}>
          Enterprise Employee Monitoring & Productivity Suite
        </p>

        <div className="grid grid-cols-3 gap-4 mb-10">
          {[
            { icon: Shield, label: "Secure", desc: "Enterprise-grade security" },
            { icon: Zap, label: "Real-Time", desc: "Live monitoring" },
            { icon: Monitor, label: "Multi-Device", desc: "Desktop & Mobile" },
          ].map(({ icon: Icon, label, desc }) => (
            <div key={label} className="glass-card rounded-2xl p-4 text-center">
              <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center mx-auto mb-2">
                <Icon className="w-5 h-5 text-white" />
              </div>
              <div style={{ fontWeight: 600, fontSize: "0.85rem" }}>{label}</div>
              <div style={{ color: "var(--muted-foreground)", fontSize: "0.75rem" }}>{desc}</div>
            </div>
          ))}
        </div>

        <button
          onClick={onNext}
          className="w-full py-4 rounded-2xl gradient-primary text-white flex items-center justify-center gap-3 transition-all hover:opacity-90 hover:scale-[1.02] active:scale-95"
          style={{ fontWeight: 600, fontSize: "1rem" }}
        >
          Get Started <ArrowRight className="w-5 h-5" />
        </button>
        <p className="mt-4" style={{ color: "var(--muted-foreground)", fontSize: "0.8rem" }}>
          v2.4.1 · Employee Monitoring System Enterprise
        </p>
      </div>
    </div>
  );
}

function LoginScreen({ onLogin, onForgot, onRegister }: { onLogin: (role: "admin" | "manager" | "employee") => void; onForgot: () => void; onRegister: () => void }) {
  const [email, setEmail] = useState("admin@company.com");
  const [password, setPassword] = useState("••••••••");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const [role, setRole] = useState<"admin" | "manager" | "employee">("admin");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (role === "admin") {
      setEmail("admin@company.com");
    } else if (role === "manager") {
      setEmail("manager@company.com");
    } else {
      setEmail("john@company.com");
    }
  }, [role]);

  const handleLogin = () => {
    if (!email || !password) { setError("Please fill in all fields"); return; }
    setError("");
    setLoading(true);
    setTimeout(() => { setLoading(false); onLogin(role); }, 1200);
  };

  return (
    <div className="min-h-screen flex bg-background">
      {/* Left Panel */}
      <div className="hidden lg:flex flex-1 items-center justify-center relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #0b1020 0%, #141830 50%, #0d1625 100%)" }}>
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-20 w-64 h-64 rounded-full opacity-10"
            style={{ background: "radial-gradient(circle, #6366f1 0%, transparent 70%)" }} />
          <div className="absolute bottom-20 right-20 w-48 h-48 rounded-full opacity-10"
            style={{ background: "radial-gradient(circle, #06b6d4 0%, transparent 70%)" }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="w-96 h-96 rounded-full border opacity-5" style={{ borderColor: "#6366f1" }} />
            <div className="absolute inset-8 rounded-full border opacity-5" style={{ borderColor: "#06b6d4" }} />
            <div className="absolute inset-16 rounded-full border opacity-5" style={{ borderColor: "#6366f1" }} />
          </div>
        </div>
        <div className="relative z-10 text-center px-12 max-w-md">
          <div className="mb-8 flex justify-center">
            <div className="w-20 h-20 rounded-2xl gradient-primary flex items-center justify-center glow-primary">
              <Monitor className="w-10 h-10 text-white" />
            </div>
          </div>
          <h2 className="mb-4 text-xl sm:text-2xl md:text-3xl font-bold" style={{ color: "#e8eaf6" }}>
            Employee Monitoring System
          </h2>
          <p style={{ color: "#8b8fa8", lineHeight: 1.7 }}>
            Monitor productivity, track attendance, and manage your team with enterprise-grade tools.
          </p>
          <div className="mt-10 grid grid-cols-2 gap-4">
            {[
              { value: "99.9%", label: "Uptime" },
              { value: "50K+", label: "Users" },
              { value: "200+", label: "Companies" },
              { value: "4.9★", label: "Rating" },
            ].map(({ value, label }) => (
              <div key={label} className="rounded-2xl p-4 text-center"
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}>
                <div style={{ color: "#6366f1", fontWeight: 700, fontSize: "1.5rem" }}>{value}</div>
                <div style={{ color: "#8b8fa8", fontSize: "0.8rem" }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <div className="flex flex-1 items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="lg:hidden mb-8 text-center">
            <div className="w-16 h-16 rounded-2xl gradient-primary flex items-center justify-center mx-auto mb-3 glow-primary">
              <Monitor className="w-8 h-8 text-white" />
            </div>
            <h1 style={{ fontWeight: 700, fontSize: "1.5rem" }}>Employee Monitoring System</h1>
          </div>

          <h2 className="mb-1" style={{ fontWeight: 700 }}>Welcome back</h2>
          <p className="mb-8" style={{ color: "var(--muted-foreground)" }}>Sign in to your account to continue</p>

          {/* Role Toggle */}
          <div className="flex rounded-xl p-1 mb-6" style={{ background: "var(--muted)" }}>
            {(["admin", "manager", "employee"] as const).map((r) => (
              <button
                key={r}
                onClick={() => setRole(r)}
                className="flex-1 py-2 rounded-lg capitalize transition-all"
                style={{
                  background: role === r ? "var(--primary)" : "transparent",
                  color: role === r ? "white" : "var(--muted-foreground)",
                  fontWeight: role === r ? 600 : 400,
                  fontSize: "0.85rem",
                }}
              >
                {r}
              </button>
            ))}
          </div>

          {error && (
            <div className="flex items-center gap-2 mb-4 p-3 rounded-xl"
              style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)", color: "var(--destructive)" }}>
              <AlertCircle className="w-4 h-4" />
              <span style={{ fontSize: "0.875rem" }}>{error}</span>
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label className="block mb-1.5" style={{ fontSize: "0.875rem" }}>Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: "var(--muted-foreground)" }} />
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  className="w-full pl-11 pr-4 py-3 rounded-xl outline-none transition-all"
                  style={{
                    background: "var(--input-background)",
                    border: "1px solid var(--border)",
                    color: "var(--foreground)",
                  }}
                />
              </div>
            </div>

            <div>
              <label className="block mb-1.5" style={{ fontSize: "0.875rem" }}>Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: "var(--muted-foreground)" }} />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full pl-11 pr-12 py-3 rounded-xl outline-none transition-all"
                  style={{
                    background: "var(--input-background)",
                    border: "1px solid var(--border)",
                    color: "var(--foreground)",
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2"
                  style={{ color: "var(--muted-foreground)" }}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <div
                  onClick={() => setRemember(!remember)}
                  className="w-5 h-5 rounded flex items-center justify-center transition-all cursor-pointer"
                  style={{
                    background: remember ? "var(--primary)" : "var(--input-background)",
                    border: `1px solid ${remember ? "var(--primary)" : "var(--border)"}`,
                  }}
                >
                  {remember && <CheckCircle className="w-3 h-3 text-white" />}
                </div>
                <span style={{ fontSize: "0.875rem", color: "var(--muted-foreground)" }}>Remember me</span>
              </label>
              <button
                onClick={onForgot}
                style={{ color: "var(--primary)", fontSize: "0.875rem", fontWeight: 500 }}
                className="hover:underline"
              >
                Forgot password?
              </button>
            </div>

            <button
              onClick={handleLogin}
              disabled={loading}
              className="w-full py-3.5 rounded-xl gradient-primary text-white flex items-center justify-center gap-2 transition-all hover:opacity-90 hover:scale-[1.01] active:scale-95 disabled:opacity-70"
              style={{ fontWeight: 600 }}
            >
              {loading ? (
                <><RefreshCw className="w-4 h-4 animate-spin" /> Signing in...</>
              ) : (
                <>Sign In <ArrowRight className="w-4 h-4" /></>
              )}
            </button>
          </div>

          <div className="mt-6 text-center" style={{ fontSize: "0.875rem" }}>
            <span style={{ color: "var(--muted-foreground)" }}>Don't have an account? </span>
            <button onClick={onRegister} style={{ color: "var(--primary)", fontWeight: 600 }} className="hover:underline">
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function ForgotPasswordScreen({ onBack, onReset }: { onBack: () => void; onReset: () => void }) {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSend = () => {
    if (!email) return;
    setLoading(true);
    setTimeout(() => { setLoading(false); setSent(true); }, 1200);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-8">
      <div className="w-full max-w-md">
        <button onClick={onBack} className="flex items-center gap-2 mb-8 hover:opacity-70 transition-opacity"
          style={{ color: "var(--muted-foreground)", fontSize: "0.875rem" }}>
          <ChevronLeft className="w-4 h-4" /> Back to Login
        </button>

        <div className="w-16 h-16 rounded-2xl gradient-primary flex items-center justify-center mb-6 glow-primary">
          <Mail className="w-8 h-8 text-white" />
        </div>

        {!sent ? (
          <>
            <h2 className="mb-2" style={{ fontWeight: 700 }}>Forgot Password?</h2>
            <p className="mb-8" style={{ color: "var(--muted-foreground)", lineHeight: 1.7 }}>
              Enter your email address and we'll send you a link to reset your password.
            </p>
            <div className="space-y-4">
              <div>
                <label className="block mb-1.5" style={{ fontSize: "0.875rem" }}>Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: "var(--muted-foreground)" }} />
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="name@company.com"
                    className="w-full pl-11 pr-4 py-3 rounded-xl outline-none"
                    style={{ background: "var(--input-background)", border: "1px solid var(--border)", color: "var(--foreground)" }}
                  />
                </div>
              </div>
              <button
                onClick={handleSend}
                disabled={loading || !email}
                className="w-full py-3.5 rounded-xl gradient-primary text-white flex items-center justify-center gap-2 transition-all hover:opacity-90 disabled:opacity-60"
                style={{ fontWeight: 600 }}
              >
                {loading ? <><RefreshCw className="w-4 h-4 animate-spin" /> Sending...</> : "Send Reset Link"}
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="w-16 h-16 rounded-full flex items-center justify-center mb-6"
              style={{ background: "rgba(16,185,129,0.15)", border: "2px solid #10b981" }}>
              <CheckCircle className="w-8 h-8" style={{ color: "#10b981" }} />
            </div>
            <h2 className="mb-2" style={{ fontWeight: 700 }}>Check Your Email</h2>
            <p className="mb-8" style={{ color: "var(--muted-foreground)", lineHeight: 1.7 }}>
              We've sent a password reset link to <strong>{email}</strong>. Check your inbox and follow the instructions.
            </p>
            <button
              onClick={onReset}
              className="w-full py-3.5 rounded-xl gradient-primary text-white transition-all hover:opacity-90"
              style={{ fontWeight: 600 }}
            >
              Open Reset Form
            </button>
            <button onClick={() => setSent(false)} className="w-full mt-3 py-3 rounded-xl transition-all hover:opacity-70"
              style={{ color: "var(--muted-foreground)", fontSize: "0.875rem" }}>
              Resend Email
            </button>
          </>
        )}
      </div>
    </div>
  );
}

function ResetPasswordScreen({ onBack, onSuccess }: { onBack: () => void; onSuccess: () => void }) {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);
  const [loading, setLoading] = useState(false);

  const strength = password.length === 0 ? 0 : password.length < 6 ? 1 : password.length < 10 ? 2 : 3;
  const strengthLabel = ["", "Weak", "Fair", "Strong"][strength];
  const strengthColor = ["", "#ef4444", "#f59e0b", "#10b981"][strength];

  const handleReset = () => {
    if (!password || password !== confirm) return;
    setLoading(true);
    setTimeout(() => { setLoading(false); onSuccess(); }, 1200);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-8">
      <div className="w-full max-w-md">
        <button onClick={onBack} className="flex items-center gap-2 mb-8 hover:opacity-70 transition-opacity"
          style={{ color: "var(--muted-foreground)", fontSize: "0.875rem" }}>
          <ChevronLeft className="w-4 h-4" /> Back
        </button>

        <div className="w-16 h-16 rounded-2xl gradient-primary flex items-center justify-center mb-6 glow-primary">
          <Lock className="w-8 h-8 text-white" />
        </div>

        <h2 className="mb-2" style={{ fontWeight: 700 }}>Reset Password</h2>
        <p className="mb-8" style={{ color: "var(--muted-foreground)" }}>Create a new secure password for your account.</p>

        <div className="space-y-4">
          <div>
            <label className="block mb-1.5" style={{ fontSize: "0.875rem" }}>New Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: "var(--muted-foreground)" }} />
              <input
                type={show1 ? "text" : "password"}
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Min. 8 characters"
                className="w-full pl-11 pr-12 py-3 rounded-xl outline-none"
                style={{ background: "var(--input-background)", border: "1px solid var(--border)", color: "var(--foreground)" }}
              />
              <button type="button" onClick={() => setShow1(!show1)} className="absolute right-4 top-1/2 -translate-y-1/2"
                style={{ color: "var(--muted-foreground)" }}>
                {show1 ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {password && (
              <div className="mt-2">
                <div className="flex gap-1 mb-1">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="h-1 flex-1 rounded-full transition-all"
                      style={{ background: i <= strength ? strengthColor : "var(--border)" }} />
                  ))}
                </div>
                <span style={{ fontSize: "0.75rem", color: strengthColor }}>{strengthLabel}</span>
              </div>
            )}
          </div>

          <div>
            <label className="block mb-1.5" style={{ fontSize: "0.875rem" }}>Confirm Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: "var(--muted-foreground)" }} />
              <input
                type={show2 ? "text" : "password"}
                value={confirm}
                onChange={e => setConfirm(e.target.value)}
                placeholder="Repeat new password"
                className="w-full pl-11 pr-12 py-3 rounded-xl outline-none"
                style={{
                  background: "var(--input-background)",
                  border: `1px solid ${confirm && confirm !== password ? "#ef4444" : "var(--border)"}`,
                  color: "var(--foreground)",
                }}
              />
              <button type="button" onClick={() => setShow2(!show2)} className="absolute right-4 top-1/2 -translate-y-1/2"
                style={{ color: "var(--muted-foreground)" }}>
                {show2 ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {confirm && confirm !== password && (
              <p className="mt-1" style={{ fontSize: "0.75rem", color: "#ef4444" }}>Passwords don't match</p>
            )}
          </div>

          <button
            onClick={handleReset}
            disabled={loading || !password || password !== confirm}
            className="w-full py-3.5 rounded-xl gradient-primary text-white flex items-center justify-center gap-2 transition-all hover:opacity-90 disabled:opacity-60"
            style={{ fontWeight: 600 }}
          >
            {loading ? <><RefreshCw className="w-4 h-4 animate-spin" /> Resetting...</> : "Reset Password"}
          </button>
        </div>
      </div>
    </div>
  );
}

function SuccessScreen({ onLogin }: { onLogin: () => void }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-8">
      <div className="text-center max-w-sm">
        <div className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6"
          style={{ background: "rgba(16,185,129,0.15)", border: "3px solid #10b981" }}>
          <CheckCircle className="w-12 h-12" style={{ color: "#10b981" }} />
        </div>
        <h2 className="mb-3" style={{ fontWeight: 700 }}>Password Reset!</h2>
        <p className="mb-8" style={{ color: "var(--muted-foreground)", lineHeight: 1.7 }}>
          Your password has been successfully reset. You can now log in with your new password.
        </p>
        <button
          onClick={onLogin}
          className="w-full py-3.5 rounded-xl gradient-primary text-white transition-all hover:opacity-90"
          style={{ fontWeight: 600 }}
        >
          Back to Login
        </button>
      </div>
    </div>
  );
}

function SessionExpiredScreen({ onLogin }: { onLogin: () => void }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-8">
      <div className="text-center max-w-sm">
        <div className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6"
          style={{ background: "rgba(245,158,11,0.15)", border: "3px solid #f59e0b" }}>
          <AlertCircle className="w-12 h-12" style={{ color: "#f59e0b" }} />
        </div>
        <h2 className="mb-3" style={{ fontWeight: 700 }}>Session Expired</h2>
        <p className="mb-8" style={{ color: "var(--muted-foreground)", lineHeight: 1.7 }}>
          Your session has expired due to inactivity. Please sign in again to continue.
        </p>
        <button
          onClick={onLogin}
          className="w-full py-3.5 rounded-xl gradient-primary text-white transition-all hover:opacity-90"
          style={{ fontWeight: 600 }}
        >
          Sign In Again
        </button>
      </div>
    </div>
  );
}

function RegisterScreen({ onBack, onSuccess }: { onBack: () => void; onSuccess: () => void }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [terms, setTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleRegister = () => {
    if (!name || !email || !password || !confirm) {
      setError("Please fill in all fields");
      return;
    }
    if (password !== confirm) {
      setError("Passwords do not match");
      return;
    }
    if (!terms) {
      setError("Please accept the Terms & Conditions");
      return;
    }
    setError("");
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onSuccess();
    }, 1200);
  };

  return (
    <div className="min-h-screen flex bg-background">
      {/* Left Panel */}
      <div className="hidden lg:flex flex-1 items-center justify-center relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #0b1020 0%, #141830 50%, #0d1625 100%)" }}>
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-20 w-64 h-64 rounded-full opacity-10"
            style={{ background: "radial-gradient(circle, #6366f1 0%, transparent 70%)" }} />
          <div className="absolute bottom-20 right-20 w-48 h-48 rounded-full opacity-10"
            style={{ background: "radial-gradient(circle, #06b6d4 0%, transparent 70%)" }} />
        </div>
        <div className="relative z-10 text-center px-12 max-w-md">
          <div className="mb-8 flex justify-center">
            <div className="w-20 h-20 rounded-2xl gradient-primary flex items-center justify-center glow-primary">
              <Monitor className="w-10 h-10 text-white" />
            </div>
          </div>
          <h2 className="mb-4 text-xl sm:text-2xl md:text-3xl font-bold" style={{ color: "#e8eaf6" }}>
            Employee Monitoring System
          </h2>
          <p style={{ color: "#8b8fa8", lineHeight: 1.7 }}>
            Monitor productivity, track attendance, and manage your team with enterprise-grade tools.
          </p>
        </div>
      </div>

      {/* Right Panel */}
      <div className="flex flex-1 items-center justify-center p-8 overflow-y-auto">
        <div className="w-full max-w-md my-8">
          <button onClick={onBack} className="flex items-center gap-2 mb-6 hover:opacity-70 transition-opacity"
            style={{ color: "var(--muted-foreground)", fontSize: "0.875rem" }}>
            <ChevronLeft className="w-4 h-4" /> Back to Login
          </button>

          <h2 className="mb-1" style={{ fontWeight: 700 }}>Create an account</h2>
          <p className="mb-6" style={{ color: "var(--muted-foreground)" }}>Get started with Employee Monitoring System</p>

          {error && (
            <div className="flex items-center gap-2 mb-4 p-3 rounded-xl"
              style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)", color: "var(--destructive)" }}>
              <AlertCircle className="w-4 h-4" />
              <span style={{ fontSize: "0.875rem" }}>{error}</span>
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label className="block mb-1.5" style={{ fontSize: "0.875rem" }}>Full Name</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: "var(--muted-foreground)" }} />
                <input
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="John Doe"
                  className="w-full pl-11 pr-4 py-3 rounded-xl outline-none"
                  style={{ background: "var(--input-background)", border: "1px solid var(--border)", color: "var(--foreground)", fontSize: "0.875rem" }}
                />
              </div>
            </div>

            <div>
              <label className="block mb-1.5" style={{ fontSize: "0.875rem" }}>Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: "var(--muted-foreground)" }} />
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  className="w-full pl-11 pr-4 py-3 rounded-xl outline-none"
                  style={{ background: "var(--input-background)", border: "1px solid var(--border)", color: "var(--foreground)", fontSize: "0.875rem" }}
                />
              </div>
            </div>

            <div>
              <label className="block mb-1.5" style={{ fontSize: "0.875rem" }}>Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: "var(--muted-foreground)" }} />
                <input
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Create a password"
                  className="w-full pl-11 pr-4 py-3 rounded-xl outline-none"
                  style={{ background: "var(--input-background)", border: "1px solid var(--border)", color: "var(--foreground)", fontSize: "0.875rem" }}
                />
              </div>
            </div>

            <div>
              <label className="block mb-1.5" style={{ fontSize: "0.875rem" }}>Confirm Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: "var(--muted-foreground)" }} />
                <input
                  type="password"
                  value={confirm}
                  onChange={e => setConfirm(e.target.value)}
                  placeholder="Confirm your password"
                  className="w-full pl-11 pr-4 py-3 rounded-xl outline-none"
                  style={{ background: "var(--input-background)", border: "1px solid var(--border)", color: "var(--foreground)", fontSize: "0.875rem" }}
                />
              </div>
            </div>

            <label className="flex items-center gap-2 cursor-pointer mt-2">
              <div
                onClick={() => setTerms(!terms)}
                className="w-5 h-5 rounded flex items-center justify-center transition-all cursor-pointer"
                style={{
                  background: terms ? "var(--primary)" : "var(--input-background)",
                  border: `1px solid ${terms ? "var(--primary)" : "var(--border)"}`,
                }}
              >
                {terms && <CheckCircle className="w-3 h-3 text-white" />}
              </div>
              <span style={{ fontSize: "0.8rem", color: "var(--muted-foreground)" }}>
                I agree to the Terms & Conditions
              </span>
            </label>

            <button
              onClick={handleRegister}
              disabled={loading}
              className="w-full py-3.5 rounded-xl gradient-primary text-white flex items-center justify-center gap-2 transition-all hover:opacity-90 hover:scale-[1.01] active:scale-95 disabled:opacity-70"
              style={{ fontWeight: 600 }}
            >
              {loading ? (
                <><RefreshCw className="w-4 h-4 animate-spin" /> Creating account...</>
              ) : (
                <>Sign Up <ArrowRight className="w-4 h-4" /></>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function AuthScreens({ onLogin }: AuthScreensProps) {
  const [view, setView] = useState<AuthView>("splash");

  if (view === "splash") return <SplashScreen onNext={() => setView("login")} />;
  if (view === "login") return <LoginScreen onLogin={onLogin} onForgot={() => setView("forgot")} onRegister={() => setView("register")} />;
  if (view === "register") return <RegisterScreen onBack={() => setView("login")} onSuccess={() => setView("success")} />;
  if (view === "forgot") return <ForgotPasswordScreen onBack={() => setView("login")} onReset={() => setView("reset")} />;
  if (view === "reset") return <ResetPasswordScreen onBack={() => setView("forgot")} onSuccess={() => setView("success")} />;
  if (view === "success") return <SuccessScreen onLogin={() => setView("login")} />;
  if (view === "session-expired") return <SessionExpiredScreen onLogin={() => setView("login")} />;
  return null;
}
