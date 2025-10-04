import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, LogOut, User } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import LoginDialog from "./LoginDialog";
import { Button } from "@/components/ui/button";

export default function Navigation() {
  const [location, setLocation] = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const { user, logout, login } = useAuth();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About Us" },
    { href: "/committees", label: "Committees" },
    { href: "/resources", label: "Resources" },
    { href: "/contact", label: "Contact" },
    { href: "/executivecommittee", label: "Executive Committee" },
    { href: "/executiveboard", label: "Executive Board" },
  ];

  const isActive = (href: string) => {
    if (href === "/") return location === "/";
    return location.startsWith(href);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const handleLoginSuccess = async () => {
    await login();
    setLocation("/dashboard");
  };

  return (
    <nav className="fixed top-0 w-full bg-background/95 backdrop-blur-sm border-b border-border z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-6">
        <div className="flex justify-between items-center h-16 md:h-14">
          {/* Logo */}
          <Link href="/" data-testid="logo-link">
            <h1 className="text-xl md:text-lg font-bold text-primary cursor-pointer font-poppins">
              DYMUN
            </h1>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-6 flex items-baseline space-x-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`nav-link text-foreground hover:text-primary px-2 py-1 text-xs font-medium transition-colors duration-200 ${
                    isActive(item.href) ? "active" : ""
                  }`}
                  data-testid={`nav-${item.label.toLowerCase().replace(" ", "-")}`}
                >
                  {item.label}
                </Link>
              ))}
              {user ? (
                <>
                  <Link
                    href="/dashboard"
                    className={`nav-link text-foreground hover:text-primary px-2 py-1 text-xs font-medium transition-colors duration-200 flex items-center gap-1 ${
                      isActive("/dashboard") ? "active" : ""
                    }`}
                    data-testid="nav-dashboard"
                  >
                    <User size={14} />
                    Dashboard
                  </Link>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={logout}
                    className="text-xs h-7 flex items-center gap-1"
                    data-testid="button-logout-desktop"
                  >
                    <LogOut size={14} />
                    Logout
                  </Button>
                </>
              ) : (
                <Button
                  variant="default"
                  size="sm"
                  onClick={() => setIsLoginOpen(true)}
                  className="text-xs h-7"
                  data-testid="button-login-desktop"
                >
                  Login
                </Button>
              )}

            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="text-foreground hover:text-primary focus:outline-none focus:text-primary p-2 -mr-2 active:bg-accent/50 rounded-md transition-colors"
              data-testid="mobile-menu-button"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="md:hidden bg-black border-t border-border fixed top-16 left-0 w-full h-[calc(100vh-4rem)] z-40 overflow-y-auto"
            data-testid="mobile-menu"
          >
            <div className="px-4 pt-4 pb-6 space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={closeMobileMenu}
                  className={`block px-4 py-3 text-base font-medium rounded-lg transition-all active:scale-95 ${
                    isActive(item.href)
                      ? "bg-primary/10 text-primary"
                      : "text-foreground hover:bg-accent/50 active:bg-accent"
                  }`}
                  data-testid={`mobile-nav-${item.label.toLowerCase().replace(" ", "-")}`}
                >
                  {item.label}
                </Link>
              ))}
              
              <div className="pt-2 border-t border-border mt-3">
                {user ? (
                  <>
                    <Link
                      href="/dashboard"
                      onClick={closeMobileMenu}
                      className={`flex items-center gap-3 px-4 py-3 text-base font-medium rounded-lg transition-all active:scale-95 ${
                        isActive("/dashboard")
                          ? "bg-primary/10 text-primary"
                          : "text-foreground hover:bg-accent/50 active:bg-accent"
                      }`}
                      data-testid="mobile-nav-dashboard"
                    >
                      <User size={20} />
                      Dashboard
                    </Link>
                    <Button
                      variant="outline"
                      onClick={() => {
                        logout();
                        closeMobileMenu();
                      }}
                      className="w-full mt-3 h-12 flex items-center gap-3 justify-center text-base"
                      data-testid="button-logout-mobile"
                    >
                      <LogOut size={20} />
                      Logout
                    </Button>
                  </>
                ) : (
                  <Button
                    onClick={() => {
                      setIsLoginOpen(true);
                      closeMobileMenu();
                    }}
                    className="w-full h-12 text-base"
                    data-testid="button-login-mobile"
                  >
                    Login
                  </Button>
                )}
              </div>
              
              <a
                href="https://docs.google.com/forms/d/e/1FAIpQLSeMv3_996f1ifqRyloEstNA5F-BPhCszbtgJ-ksbORin-f_UQ/viewform"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-primary text-primary-foreground flex items-center justify-center h-12 px-6 rounded-lg text-base font-semibold hover:bg-primary/90 active:scale-95 transition-all mt-4"
                data-testid="register-button-mobile"
              >
                Register Now
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <LoginDialog 
        open={isLoginOpen} 
        onOpenChange={setIsLoginOpen}
        onLoginSuccess={handleLoginSuccess}
      />
    </nav>
  );
}