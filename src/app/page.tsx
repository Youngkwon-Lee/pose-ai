"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, BarChart, Camera, Share2, Aperture, Layers, Users, Upload } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-full">
      {/* Hero Section */}
      <section className="py-12 md:py-24 lg:py-32 bg-gradient-to-b from-white to-lime-pale">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
            <div className="flex-1 text-center lg:text-left">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter mb-6">
                <span className="gradient-text">AI-Powered</span> <br />
                <span className="text-gray-dark">Pose Estimation Analysis</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-medium max-w-xl mx-auto lg:mx-0 mb-8">
                Upload images and get instant AI analysis of your posture or movement.
                Perfect for dancers, fitness instructors, and health professionals.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center lg:justify-start">
                <Link href="/upload" className="primary-button py-3 px-8 font-semibold text-lg">
                  Start Analyzing
                </Link>
                <Link href="/examples" className="outline-button py-3 px-8 font-semibold text-lg">
                  View Examples
                </Link>
              </div>
            </div>
            <div className="flex-1 w-full max-w-xl mx-auto lg:mx-0">
              <div className="relative w-full aspect-video shadow-2xl rounded-2xl overflow-hidden">
                <Image
                  src="https://ext.same-assets.com/3962230709/3799320279.svg+xml"
                  alt="Pose estimation demo"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>
          <div className="mt-16 lg:mt-24 mx-auto max-w-4xl">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {[
                { label: "Users", value: "40,000+" },
                { label: "Images Analyzed", value: "2M+" },
                { label: "Accuracy", value: "97%" },
                { label: "Use Cases", value: "20+" },
              ].map((stat, index) => (
                <div key={index} className="flex flex-col items-center">
                  <div className="text-3xl md:text-4xl font-semibold text-lime-bright mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-semibold mb-4 text-gray-dark">
              How It <span className="text-lime-bright">Works</span>
            </h2>
            <p className="text-gray-medium text-lg max-w-3xl mx-auto">
              Our AI-powered pose estimation technology makes it simple to analyze and improve any posture or movement.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                icon: <Upload className="h-10 w-10 text-lime-bright" />,
                title: "Upload Image",
                description: "Upload an image or take a photo directly through our platform.",
              },
              {
                icon: <Aperture className="h-10 w-10 text-lime-bright" />,
                title: "AI Analysis",
                description: "Our advanced AI analyzes body posture, angles, and alignment.",
              },
              {
                icon: <BarChart className="h-10 w-10 text-lime-bright" />,
                title: "Get Results",
                description: "Receive detailed analysis and suggestions for improvement.",
              },
            ].map((step, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow hover:shadow-lg transition-all text-center">
                <div className="flex justify-center mb-6">
                  {step.icon}
                </div>
                <h3 className="text-xl font-semibold mb-4 text-gray-dark">
                  {step.title}
                </h3>
                <p className="text-gray-medium">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 md:py-24 bg-lime-pale">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-semibold mb-4 text-gray-dark">
              Powerful <span className="text-lime-bright">Features</span>
            </h2>
            <p className="text-gray-medium text-lg max-w-3xl mx-auto">
              PoseAI delivers comprehensive tools for all your pose analysis needs.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Camera className="h-8 w-8 text-lime-bright" />,
                title: "Multi-angle Analysis",
                description: "Analyze posture from different angles for comprehensive insights.",
              },
              {
                icon: <Share2 className="h-8 w-8 text-lime-bright" />,
                title: "Easy Sharing",
                description: "Share results with trainers, instructors, or healthcare providers.",
              },
              {
                icon: <Layers className="h-8 w-8 text-lime-bright" />,
                title: "Progress Tracking",
                description: "Track posture improvements over time with historical data.",
              },
              {
                icon: <Users className="h-8 w-8 text-lime-bright" />,
                title: "Team Collaboration",
                description: "Collaborate with teammates or clients on posture improvements.",
              },
            ].map((feature, index) => (
              <div key={index} className="bg-white rounded-lg p-6 shadow hover:shadow-md transition-all">
                <div className="mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold mb-2 text-gray-dark">
                  {feature.title}
                </h3>
                <p className="text-sm text-gray-medium">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-semibold mb-4 text-gray-dark">
              Who Can <span className="text-lime-bright">Benefit</span>
            </h2>
            <p className="text-gray-medium text-lg max-w-3xl mx-auto">
              Our technology serves a wide range of professionals and enthusiasts.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                title: "Dance Instructors",
                description: "Analyze dance poses and movements to provide precise feedback and corrections.",
                cta: "Learn more",
                href: "/use-cases/dance",
              },
              {
                title: "Fitness Trainers",
                description: "Ensure clients maintain proper form during exercises to prevent injuries.",
                cta: "Learn more",
                href: "/use-cases/fitness",
              },
              {
                title: "Physical Therapists",
                description: "Track patient progress and ensure exercises are performed correctly.",
                cta: "Learn more",
                href: "/use-cases/therapy",
              },
            ].map((useCase, index) => (
              <div key={index} className="border border-gray-lighter rounded-xl p-8 hover:border-lime-bright transition-all">
                <h3 className="text-xl font-semibold mb-4 text-gray-dark">
                  {useCase.title}
                </h3>
                <p className="text-gray-medium mb-6">
                  {useCase.description}
                </p>
                <Link
                  href={useCase.href}
                  className="text-lime-bright font-medium flex items-center"
                >
                  {useCase.cta}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24 bg-lime-bright">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-semibold mb-6 text-gray-dark">
              Ready to analyze your movement?
            </h2>
            <p className="text-gray-dark text-lg mb-8 max-w-2xl mx-auto">
              Join thousands of professionals using PoseAI to improve technique, prevent injuries, and enhance performance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/signup"
                className="bg-gray-dark text-white hover:bg-opacity-90 py-3 px-8 rounded-md font-semibold transition-all"
              >
                Get Started Free
              </Link>
              <Link
                href="/contact"
                className="bg-white text-gray-dark hover:bg-opacity-90 py-3 px-8 rounded-md font-semibold transition-all"
              >
                Contact Sales
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
