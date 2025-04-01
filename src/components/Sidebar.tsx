
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  Home,
  CreditCard,
  Send,
  BarChart3,
  Wallet,
  PiggyBank,
  Home as HomeIcon,
  Menu,
  X
} from "lucide-react";
import { Button } from "@/components/ui/button";

// Navigation items
const navItems = [
  { icon: Home, label: "Dashboard", path: "/dashboard" },
  { icon: Send, label: "Transfers", path: "/transfers" },
  { icon: Wallet, label: "Accounts", path: "/accounts" },
  { icon: CreditCard, label: "Cards", path: "/cards" },
  { icon: BarChart3, label: "Investments", path: "/investments" },
  { icon: PiggyBank, label: "Loans", path: "/loans" },
  { icon: HomeIcon, label: "Mortgage", path: "/mortgage" },
];

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <>
      {/* Mobile menu button */}
      <Button
        variant="ghost"
        size="icon"
        onClick={toggleSidebar}
        className="fixed z-50 top-3 right-3 md:hidden"
      >
        {isSidebarOpen ? <X /> : <Menu />}
      </Button>
      
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 w-64 bg-bank text-white transform transition-transform duration-200 ease-in-out md:relative md:translate-x-0",
          isSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        )}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="h-16 flex items-center justify-center border-b border-bank-light/20">
            <h1 className="text-2xl font-bold">TestimBank</h1>
          </div>
          
          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setIsSidebarOpen(false)}
                className={({ isActive }) =>
                  cn(
                    "flex items-center px-4 py-3 text-sm rounded-lg",
                    "transition-colors duration-150",
                    isActive
                      ? "bg-bank-light text-white"
                      : "text-bank-accent/80 hover:bg-bank-light/30 hover:text-white"
                  )
                }
              >
                <item.icon className="h-5 w-5 mr-3" />
                {item.label}
              </NavLink>
            ))}
          </nav>
          
          {/* App version */}
          <div className="px-4 py-3 text-xs text-bank-accent/50">
            <p>TestimBank v1.0.0</p>
          </div>
        </div>
      </aside>
      
      {/* Backdrop for mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 md:hidden"
          onClick={toggleSidebar}
        />
      )}
    </>
  );
};

export default Sidebar;
