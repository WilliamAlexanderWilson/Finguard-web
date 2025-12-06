'use client'

import { useState } from 'react'
import { Upload, Zap, BarChart3, FileCheck, Download, ArrowRight, Sparkles } from 'lucide-react'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Sparkles className="h-8 w-8 text-blue-600" />
              <span className="text-2xl font-bold gradient-text">FinGuard</span>
            </div>
            <div className="flex items-center space-x-6">
              <Link href="#features" className="text-gray-600 hover:text-gray-900 transition">
                Features
              </Link>
              <Link href="#how-it-works" className="text-gray-600 hover:text-gray-900 transition">
                How It Works
              </Link>
              <Link 
                href="/dashboard" 
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center space-x-2"
              >
                <span>Try Demo</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center animate-fade-in">
            <div className="inline-block mb-4 px-4 py-2 bg-blue-100 text-blue-600 rounded-full text-sm font-semibold">
              🚀 AI-Powered Accounting
            </div>
            <h1 className="text-6xl font-extrabold text-gray-900 mb-6 leading-tight">
              Automate Your Bookkeeping
              <br />
              <span className="gradient-text">with AI Intelligence</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Save 10+ hours per week with FinGuard's AI-powered transaction categorization,
              bank reconciliation, and financial reporting. Achieve 95%+ accuracy instantly.
            </p>
            <div className="flex justify-center space-x-4">
              <Link
                href="/dashboard"
                className="px-8 py-4 bg-blue-600 text-white text-lg rounded-lg hover:bg-blue-700 transition shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center space-x-2"
              >
                <span>Start Free Demo</span>
                <ArrowRight className="h-5 w-5" />
              </Link>
              <a
                href="https://github.com/WilliamAlexanderWilson/Finguard"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 bg-white text-gray-700 text-lg rounded-lg hover:bg-gray-50 transition shadow-lg border border-gray-300"
              >
                View on GitHub
              </a>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-8 bg-white rounded-2xl shadow-lg">
              <div className="text-4xl font-bold text-blue-600 mb-2">95%+</div>
              <div className="text-gray-600">Categorization Accuracy</div>
            </div>
            <div className="text-center p-8 bg-white rounded-2xl shadow-lg">
              <div className="text-4xl font-bold text-purple-600 mb-2">10+ hrs</div>
              <div className="text-gray-600">Saved Per Week</div>
            </div>
            <div className="text-center p-8 bg-white rounded-2xl shadow-lg">
              <div className="text-4xl font-bold text-green-600 mb-2">$1,500+</div>
              <div className="text-gray-600">Monthly Value</div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-xl text-gray-600">Three simple steps to automated accounting</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-6">
                <Upload className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">1. Upload CSV</h3>
              <p className="text-gray-600">
                Upload your transaction CSV from your bank or accounting software.
                Supports all major formats.
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mb-6">
                <Zap className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">2. AI Processing</h3>
              <p className="text-gray-600">
                Our Claude AI engine analyzes patterns and categorizes transactions
                with 95%+ accuracy using advanced algorithms.
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-6">
                <Download className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">3. Export Results</h3>
              <p className="text-gray-600">
                Download categorized transactions, reconciliation reports, and
                financial insights in Excel format.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Powerful Features</h2>
            <p className="text-xl text-gray-600">Everything you need to automate your accounting</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition">
              <FileCheck className="h-12 w-12 text-blue-600 mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Smart Categorization</h3>
              <p className="text-gray-600">
                AI-powered pattern matching engine categorizes transactions with 95%+ accuracy.
                Learns from your data to improve over time.
              </p>
            </div>

            <div className="p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition">
              <BarChart3 className="h-12 w-12 text-purple-600 mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Bank Reconciliation</h3>
              <p className="text-gray-600">
                Fuzzy matching algorithms automatically match and reconcile bank statements
                with your records. Save hours of manual work.
              </p>
            </div>

            <div className="p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition">
              <Sparkles className="h-12 w-12 text-green-600 mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Financial Reports</h3>
              <p className="text-gray-600">
                Auto-generate comprehensive financial reports with insights, trends,
                and actionable recommendations.
              </p>
            </div>

            <div className="p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition">
              <Zap className="h-12 w-12 text-orange-600 mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Real-Time Processing</h3>
              <p className="text-gray-600">
                Lightning-fast processing powered by Claude AI. Process thousands of
                transactions in seconds.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Transform Your Accounting?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join businesses saving 10+ hours per week with AI-powered automation
          </p>
          <Link
            href="/dashboard"
            className="inline-flex items-center px-8 py-4 bg-white text-blue-600 text-lg rounded-lg hover:bg-gray-100 transition shadow-lg hover:shadow-xl transform hover:-translate-y-1 space-x-2"
          >
            <span>Try Free Demo Now</span>
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Sparkles className="h-6 w-6 text-blue-400" />
            <span className="text-xl font-bold">FinGuard</span>
          </div>
          <p className="text-gray-400 mb-4">
            AI-Powered Accounting Automation | Built by Alex Wilson
          </p>
          <div className="flex justify-center space-x-6">
            <a
              href="https://github.com/WilliamAlexanderWilson"
              className="text-gray-400 hover:text-white transition"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
            <a
              href="https://linkedin.com/in/williamwilson1999"
              className="text-gray-400 hover:text-white transition"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
            <a
              href="mailto:wilsonwilliamalex@gmail.com"
              className="text-gray-400 hover:text-white transition"
            >
              Contact
            </a>
          </div>
          <div className="mt-8 text-gray-500 text-sm">
            © 2025 FinGuard. Built with Next.js & Claude AI.
          </div>
        </div>
      </footer>
    </div>
  )
}
