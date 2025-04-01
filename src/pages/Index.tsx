import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Smartphone, PieChart, Lock, CreditCard, BarChart3, Sparkles } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const Index = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen flex flex-col animate-fade-in">
      {/* Hero Section with Background */}
      <header className="relative min-h-[70vh] flex items-center justify-center overflow-hidden py-12">
        {/* Background Image with Overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-bank/95 to-bank-dark/95" />
        </div>

        {/* Content */}
        <div className="container mx-auto max-w-6xl px-6 relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="md:w-1/2 space-y-4">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm text-white/90 mb-2">
                <Sparkles className="h-4 w-4 mr-2" />
                <span className="text-sm">AI-Powered Banking</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold leading-tight text-white">
                TestimBank
                <span className="block text-xl md:text-2xl mt-2 text-bank-accent">
                  Experience the Power of AI Banking
                </span>
              </h1>
              <p className="text-base md:text-lg text-white/90">
                Intelligent solutions for your financial needs. Modern banking powered by artificial intelligence.
              </p>
              <div className="pt-2">
                <Button
                  asChild
                  size="lg"
                  className="bg-white text-bank hover:bg-bank-accent/80 font-medium transition-colors"
                >
                  <Link to={isAuthenticated ? "/dashboard" : "/login"}>
                    {isAuthenticated ? "Go to Dashboard" : "Get Started"}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </div>
            <div className="md:w-1/2">
              <div className="relative">
                <div className="w-full h-56 md:h-80 bg-white/10 rounded-2xl overflow-hidden backdrop-blur-sm border border-white/20 shadow-2xl">
                  <div className="absolute inset-0 p-6 flex flex-col justify-between">
                    <div className="text-xl font-bold text-white">TestimBank Dashboard</div>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center p-3 bg-white/10 rounded-lg backdrop-blur-sm">
                        <div className="flex items-center text-white">
                          <CreditCard className="h-5 w-5 mr-2" />
                          <span>Main Account</span>
                        </div>
                        <div className="font-semibold text-white">$4,250.75</div>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-white/10 rounded-lg backdrop-blur-sm">
                        <div className="flex items-center text-white">
                          <PieChart className="h-5 w-5 mr-2" />
                          <span>Savings</span>
                        </div>
                        <div className="font-semibold text-white">$12,680.50</div>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-white/10 rounded-lg backdrop-blur-sm">
                        <div className="flex items-center text-white">
                          <BarChart3 className="h-5 w-5 mr-2" />
                          <span>Investments</span>
                        </div>
                        <div className="font-semibold text-white">$28,540.25</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section className="py-20 px-6 bg-gradient-to-b from-background to-muted">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Why Choose TestimBank?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Experience banking like never before with our cutting-edge features and AI-powered solutions.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bank-card group hover:shadow-xl transition-all duration-300">
              <div className="rounded-full w-12 h-12 flex items-center justify-center bg-bank/10 text-bank mb-6 group-hover:bg-bank group-hover:text-white transition-colors">
                <Shield className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Secure Banking</h3>
              <p className="text-muted-foreground">
                Advanced security measures to protect your financial information.
              </p>
            </div>
            
            <div className="bank-card group hover:shadow-xl transition-all duration-300">
              <div className="rounded-full w-12 h-12 flex items-center justify-center bg-bank/10 text-bank mb-6 group-hover:bg-bank group-hover:text-white transition-colors">
                <PieChart className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Investment Tools</h3>
              <p className="text-muted-foreground">
                AI-optimized investment suggestions based on your goals and risk tolerance.
              </p>
            </div>
            
            <div className="bank-card group hover:shadow-xl transition-all duration-300">
              <div className="rounded-full w-12 h-12 flex items-center justify-center bg-bank/10 text-bank mb-6 group-hover:bg-bank group-hover:text-white transition-colors">
                <Lock className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Home Mortgages</h3>
              <p className="text-muted-foreground">
                Personalized mortgage options with predictive interest rate analysis.
              </p>
            </div>
            
            <div className="bank-card group hover:shadow-xl transition-all duration-300">
              <div className="rounded-full w-12 h-12 flex items-center justify-center bg-bank/10 text-bank mb-6 group-hover:bg-bank group-hover:text-white transition-colors">
                <Smartphone className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Mobile Banking</h3>
              <p className="text-muted-foreground">
                Seamless banking experience from any device, anywhere in the world.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-bank text-white">
        <div className="container mx-auto max-w-6xl text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Banking Experience?</h2>
          <p className="text-lg text-bank-accent/90 max-w-2xl mx-auto mb-8">
            Join thousands of satisfied customers who have made the switch to intelligent banking with TestimBank.
          </p>
          <Button
            asChild
            size="lg"
            className="bg-white text-bank hover:bg-bank-accent/80 font-medium transition-colors"
          >
            <Link to={isAuthenticated ? "/dashboard" : "/register"}>
              {isAuthenticated ? "Go to Dashboard" : "Open an Account"}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-bank text-white py-12 px-6 mt-auto">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">TestimBank</h3>
              <p className="text-bank-accent/80">
                Experience the Power of AI Banking
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><Link to="/" className="text-bank-accent/80 hover:text-bank-accent transition-colors">Home</Link></li>
                <li><Link to="/login" className="text-bank-accent/80 hover:text-bank-accent transition-colors">Sign In</Link></li>
                <li><Link to="/register" className="text-bank-accent/80 hover:text-bank-accent transition-colors">Register</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <div className="flex flex-col items-center space-y-2">
                <p className="text-bank-accent/80">support@testimbank.com</p>
                <p className="text-bank-accent/80">1-800-TESTIMBANK</p>
              </div>
            </div>
          </div>
          <div className="border-t border-bank-light/20 mt-8 pt-8 text-center text-bank-accent/60">
            <p>&copy; {new Date().getFullYear()} TestimBank. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
