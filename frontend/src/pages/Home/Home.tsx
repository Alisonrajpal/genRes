import React from "react";
import { Link } from "react-router-dom";
import {
  FileText,
  Brain,
  CheckCircle,
  Download,
  Sparkles,
  Rocket,
  Users,
  Shield,
} from "lucide-react";

const Home: React.FC = () => {
  const features = [
    {
      icon: Brain,
      title: "AI-Powered Content",
      description:
        "Get intelligent suggestions and keyword optimization tailored to your industry",
    },
    {
      icon: CheckCircle,
      title: "ATS Friendly",
      description:
        "Templates designed to pass through Applicant Tracking Systems seamlessly",
    },
    {
      icon: Download,
      title: "Multiple Formats",
      description:
        "Export your resume as PDF, DOCX, or HTML with a single click",
    },
    {
      icon: Rocket,
      title: "Quick & Easy",
      description:
        "Create professional resumes in minutes with our intuitive builder",
    },
    {
      icon: Users,
      title: "Industry Specific",
      description:
        "Templates optimized for different industries and career levels",
    },
    {
      icon: Shield,
      title: "Privacy First",
      description: "Your data stays secure and private on your device",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Create Resumes That
            <span className="text-blue-600 block">Get You Hired</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed">
            Build professional, ATS-friendly resumes with AI-powered suggestions
            and industry-specific optimization
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/builder" className="btn-primary text-lg px-8 py-3">
              <FileText className="h-5 w-5 mr-2" />
              Build Your Resume
            </Link>
            <Link to="/templates" className="btn-secondary text-lg px-8 py-3">
              <Sparkles className="h-5 w-5 mr-2" />
              View Templates
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Why Choose AI Resume Builder?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Everything you need to create resumes that stand out and get noticed
            by employers
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Icon className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 md:p-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Ready to Land Your Dream Job?
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Join thousands of job seekers who have transformed their careers
            with our AI-powered resume builder
          </p>
          <Link to="/builder" className="btn-primary text-lg px-8 py-3">
            <Rocket className="h-5 w-5 mr-2" />
            Start Building Now
          </Link>
          <p className="text-sm text-gray-500 mt-4">
            No sign up required • Free forever • Privacy focused
          </p>
        </div>
      </section>
    </div>
  );
};

export default Home;
