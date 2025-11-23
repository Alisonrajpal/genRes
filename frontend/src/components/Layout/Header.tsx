import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FileText, Home, Palette, User } from "lucide-react";

const Header: React.FC = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const navItems = [
    { path: "/", label: "Home", icon: Home },
    { path: "/builder", label: "Build Resume", icon: FileText },
    { path: "/templates", label: "Templates", icon: Palette },
  ];

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <FileText className="h-8 w-8 text-blue-600" />
            <span className="ml-2 text-xl font-bold text-gray-900">
              AI Resume Builder
            </span>
          </div>

          {/* Navigation */}
          <nav className="flex space-x-8">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive(item.path)
                      ? "text-blue-600 bg-blue-50 border-b-2 border-blue-600"
                      : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                  }`}>
                  <Icon className="h-4 w-4 mr-2" />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* User Section */}
          <div className="flex items-center space-x-4">
            <button className="flex items-center text-sm text-gray-700 hover:text-gray-900">
              <User className="h-5 w-5 mr-1" />
              Account
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
