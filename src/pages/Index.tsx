
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Smartphone, PieChart, Lock, CreditCard, BarChart3 } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const Index = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen flex flex-col animate-fade-in">
      {/* Hero Section */}
      <header className="bg-gradient-to-r from-bank to-bank-dark text-white py-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="md:w-1/2 space-y-6">
              <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                TestimBank
                <span className="block text-2xl md:text-3xl mt-2 text-bank-accent">
                  Experience the Power of AI Banking
                </span>
              </h1>
              <p className="text-lg md:text-xl text-bank-accent/90">
                Intelligent solutions for your financial needs. Modern banking powered by artificial intelligence.
              </p>
              <div className="pt-4 flex flex-col sm:flex-row gap-4">
                <Button
                  asChild
                  size="lg"
                  className="bg-white text-bank hover:bg-bank-accent"
                >
                  <Link to={isAuthenticated ? "/dashboard" : "/login"}>
                    {isAuthenticated ? "Go to Dashboard" : "Get Started"}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                {!isAuthenticated && (
                  <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="border-white text-white hover:bg-white/10"
                  >
                    <Link to="/login">Sign In</Link>
                  </Button>
                )}
              </div>
            </div>
            <div className="md:w-1/2">
              <div className="relative">
                <div className="w-full h-64 md:h-96 bg-bank-light/30 rounded-2xl overflow-hidden backdrop-blur-sm border border-white/20">
                  <div className="absolute inset-0 p-6 flex flex-col justify-between">
                    <div className="text-xl font-bold">TestimBank Dashboard</div>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center p-3 bg-white/10 rounded-lg backdrop-blur-sm">
                        <div className="flex items-center">
                          <CreditCard className="h-5 w-5 mr-2" />
                          <span>Main Account</span>
                        </div>
                        <div className="font-semibold">$4,250.75</div>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-white/10 rounded-lg backdrop-blur-sm">
                        <div className="flex items-center">
                          <PieChart className="h-5 w-5 mr-2" />
                          <span>Savings</span>
                        </div>
                        <div className="font-semibold">$12,680.50</div>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-white/10 rounded-lg backdrop-blur-sm">
                        <div className="flex items-center">
                          <BarChart3 className="h-5 w-5 mr-2" />
                          <span>Investments</span>
                        </div>
                        <div className="font-semibold">$28,540.25</div>
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
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Banking Made Intelligent</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              TestimBank brings together cutting-edge AI technology with traditional banking services to provide you with a seamless experience.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bank-card">
              <div className="rounded-full w-12 h-12 flex items-center justify-center bg-bank/10 text-bank mb-6">
                <Shield className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Secure Banking</h3>
              <p className="text-muted-foreground">
                State-of-the-art security with biometric authentication and real-time fraud detection.
              </p>
            </div>
            
            <div className="bank-card">
              <div className="rounded-full w-12 h-12 flex items-center justify-center bg-bank/10 text-bank mb-6">
                <CreditCard className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Smart Cards</h3>
              <p className="text-muted-foreground">
                Credit and debit cards with AI-powered spending insights and instant notifications.
              </p>
            </div>
            
            <div className="bank-card">
              <div className="rounded-full w-12 h-12 flex items-center justify-center bg-bank/10 text-bank mb-6">
                <PieChart className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Investment Tools</h3>
              <p className="text-muted-foreground">
                AI-optimized investment suggestions based on your goals and risk tolerance.
              </p>
            </div>
            
            <div className="bank-card">
              <div className="rounded-full w-12 h-12 flex items-center justify-center bg-bank/10 text-bank mb-6">
                <Lock className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Home Mortgages</h3>
              <p className="text-muted-foreground">
                Personalized mortgage options with predictive interest rate analysis.
              </p>
            </div>
            
            <div className="bank-card">
              <div className="rounded-full w-12 h-12 flex items-center justify-center bg-bank/10 text-bank mb-6">
                <BarChart3 className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Financial Insights</h3>
              <p className="text-muted-foreground">
                Deep analysis of your spending patterns to help you save more effectively.
              </p>
            </div>
            
            <div className="bank-card">
              <div className="rounded-full w-12 h-12 flex items-center justify-center bg-bank/10 text-bank mb-6">
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
      <section className="bg-muted py-20 px-6">
        <div className="container mx-auto max-w-6xl text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Banking Experience?</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Join thousands of satisfied customers who have made the switch to intelligent banking with TestimBank.
          </p>
          <Button
            asChild
            size="lg"
            className="bg-bank hover:bg-bank-dark"
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
                <li><Link to="/" className="text-bank-accent/80 hover:text-bank-accent">Home</Link></li>
                <li><Link to="/login" className="text-bank-accent/80 hover:text-bank-accent">Sign In</Link></li>
                <li><Link to="/register" className="text-bank-accent/80 hover:text-bank-accent">Register</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <p className="text-bank-accent/80">123 Banking Street</p>
              <p className="text-bank-accent/80">New York, NY 10001</p>
              <p className="text-bank-accent/80">support@testimbank.com</p>
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
