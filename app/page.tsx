'use client'

import { useState, useCallback } from 'react'
import { Upload, Download, FileSpreadsheet, Sparkles, TrendingUp, PieChart, BarChart3, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import Papa from 'papaparse'
import { BarChart, Bar, PieChart as RePieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

interface Transaction {
  date: string
  description: string
  amount: number
  category?: string
  confidence?: number
}

export default function Dashboard() {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [isProcessing, setIsProcessing] = useState(false)
  const [mode, setMode] = useState<'demo' | 'ai' | null>(null)

  // Handle file upload
  const handleFileUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    Papa.parse(file, {
      complete: async (results) => {
        const data = results.data as any[]

        // Parse CSV data (assuming format: date, description, amount)
        const parsedTransactions = data
          .slice(1) // Skip header
          .filter(row => row.length >= 3 && row[1] && row[2])
          .map(row => ({
            date: row[0] || new Date().toISOString().split('T')[0],
            description: row[1],
            amount: parseFloat(row[2]) || 0,
          }))

        if (parsedTransactions.length === 0) {
          alert('No valid transactions found in file')
          return
        }

        // Call categorization API
        setIsProcessing(true)
        try {
          const response = await fetch('/api/categorize', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ transactions: parsedTransactions }),
          })

          const result = await response.json()
          setTransactions(result.categorized)
          setMode(result.mode)
        } catch (error) {
          console.error('Categorization failed:', error)
          alert('Failed to categorize transactions')
        } finally {
          setIsProcessing(false)
        }
      },
      header: false,
    })
  }, [])

  // Load demo data
  const loadDemoData = async () => {
    const demoTransactions = [
      { date: '2025-01-15', description: 'Whole Foods Market', amount: -127.43 },
      { date: '2025-01-14', description: 'Shell Gas Station', amount: -52.18 },
      { date: '2025-01-14', description: 'Starbucks Coffee', amount: -5.75 },
      { date: '2025-01-13', description: 'Netflix Subscription', amount: -15.99 },
      { date: '2025-01-12', description: 'Electric Company', amount: -143.67 },
      { date: '2025-01-10', description: 'Salary Deposit', amount: 3500.00 },
      { date: '2025-01-09', description: 'Amazon Purchase', amount: -87.32 },
      { date: '2025-01-08', description: 'Apartment Rent', amount: -1850.00 },
      { date: '2025-01-07', description: 'Target Shopping', amount: -64.21 },
      { date: '2025-01-06', description: 'Verizon Wireless', amount: -89.99 },
      { date: '2025-01-05', description: 'Chipotle Restaurant', amount: -12.47 },
      { date: '2025-01-04', description: 'Trader Joes', amount: -94.55 },
      { date: '2025-01-03', description: 'Car Insurance', amount: -145.00 },
      { date: '2025-01-02', description: 'Uber Ride', amount: -23.14 },
      { date: '2025-01-01', description: 'Water Bill', amount: -38.92 },
    ]

    setIsProcessing(true)
    try {
      const response = await fetch('/api/categorize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ transactions: demoTransactions }),
      })

      const result = await response.json()
      setTransactions(result.categorized)
      setMode(result.mode)
    } catch (error) {
      console.error('Failed to load demo:', error)
    } finally {
      setIsProcessing(false)
    }
  }

  // Download results
  const downloadResults = () => {
    const csv = Papa.unparse(transactions)
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'categorized_transactions.csv'
    a.click()
  }

  // Calculate analytics
  const analytics = transactions.reduce((acc, t) => {
    const category = t.category || 'Uncategorized'
    if (!acc[category]) {
      acc[category] = { total: 0, count: 0 }
    }
    acc[category].total += Math.abs(t.amount)
    acc[category].count += 1
    return acc
  }, {} as Record<string, { total: number; count: number }>)

  const chartData = Object.entries(analytics)
    .map(([category, data]) => ({
      category,
      amount: Math.round(data.total),
      count: data.count,
    }))
    .sort((a, b) => b.amount - a.amount)
    .slice(0, 10)

  const COLORS = ['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b', '#ef4444', '#06b6d4', '#ec4899', '#84cc16', '#f97316', '#6366f1']

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/" className="flex items-center space-x-2 text-gray-600 hover:text-gray-900">
                <ArrowLeft className="h-5 w-5" />
                <span>Back</span>
              </Link>
              <div className="h-6 w-px bg-gray-300" />
              <div className="flex items-center space-x-2">
                <Sparkles className="h-6 w-6 text-blue-600" />
                <span className="text-xl font-bold gradient-text">FinGuard Dashboard</span>
              </div>
            </div>
            {mode && (
              <div className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm font-semibold">
                {mode === 'ai' ? '🤖 AI Mode' : '📊 Demo Mode'}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Upload Section */}
        {transactions.length === 0 && (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            <div className="max-w-2xl mx-auto">
              <FileSpreadsheet className="h-16 w-16 text-blue-600 mx-auto mb-6" />
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Upload Your Transactions
              </h2>
              <p className="text-gray-600 mb-8">
                Upload a CSV file with your bank transactions or try our demo with sample data
              </p>

              <div className="space-y-4">
                <label className="block">
                  <input
                    type="file"
                    accept=".csv"
                    onChange={handleFileUpload}
                    className="hidden"
                    id="file-upload"
                  />
                  <label
                    htmlFor="file-upload"
                    className="cursor-pointer inline-flex items-center px-8 py-4 bg-blue-600 text-white text-lg rounded-lg hover:bg-blue-700 transition shadow-lg space-x-2"
                  >
                    <Upload className="h-5 w-5" />
                    <span>Upload CSV File</span>
                  </label>
                </label>

                <div className="text-gray-400">or</div>

                <button
                  onClick={loadDemoData}
                  className="inline-flex items-center px-8 py-4 bg-white text-gray-700 text-lg rounded-lg hover:bg-gray-50 transition shadow-lg border border-gray-300 space-x-2"
                >
                  <Sparkles className="h-5 w-5" />
                  <span>Load Demo Data</span>
                </button>
              </div>

              <div className="mt-8 p-4 bg-blue-50 rounded-lg text-sm text-gray-600">
                <p className="font-semibold mb-2">CSV Format:</p>
                <code className="text-xs">date, description, amount</code>
                <p className="mt-2 text-xs">Example: 2025-01-15, Whole Foods, -127.43</p>
              </div>
            </div>
          </div>
        )}

        {/* Processing State */}
        {isProcessing && (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            <div className="animate-spin h-12 w-12 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">Processing Transactions...</h3>
            <p className="text-gray-600">Our AI is categorizing your data</p>
          </div>
        )}

        {/* Results */}
        {transactions.length > 0 && !isProcessing && (
          <div className="space-y-8">
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-600">Total Transactions</span>
                  <BarChart3 className="h-5 w-5 text-blue-600" />
                </div>
                <div className="text-3xl font-bold text-gray-900">{transactions.length}</div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-600">Categories</span>
                  <PieChart className="h-5 w-5 text-purple-600" />
                </div>
                <div className="text-3xl font-bold text-gray-900">{Object.keys(analytics).length}</div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-600">Avg Confidence</span>
                  <TrendingUp className="h-5 w-5 text-green-600" />
                </div>
                <div className="text-3xl font-bold text-gray-900">
                  {Math.round((transactions.reduce((sum, t) => sum + (t.confidence || 0), 0) / transactions.length) * 100)}%
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6">
                <button
                  onClick={downloadResults}
                  className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                  <Download className="h-5 w-5" />
                  <span>Export CSV</span>
                </button>
              </div>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Spending by Category</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="category" angle={-45} textAnchor="end" height={100} />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="amount" fill="#3b82f6" />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Category Distribution</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <RePieChart>
                    <Pie
                      data={chartData}
                      dataKey="amount"
                      nameKey="category"
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                    >
                      {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value: number) => `$${value.toLocaleString()}`} />
                    <Legend />
                  </RePieChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Transaction Table */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-xl font-bold text-gray-900">Categorized Transactions</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Description
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Amount
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Category
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Confidence
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {transactions.map((transaction, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {transaction.date}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900">
                          {transaction.description}
                        </td>
                        <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${
                          transaction.amount >= 0 ? 'text-green-600' : 'text-red-600'
                        }`}>
                          ${Math.abs(transaction.amount).toFixed(2)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-3 py-1 text-sm font-medium bg-blue-100 text-blue-800 rounded-full">
                            {transaction.category}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                              <div
                                className="bg-blue-600 h-2 rounded-full"
                                style={{ width: `${(transaction.confidence || 0) * 100}%` }}
                              />
                            </div>
                            <span className="text-sm text-gray-600">
                              {Math.round((transaction.confidence || 0) * 100)}%
                            </span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Reset Button */}
            <div className="text-center">
              <button
                onClick={() => setTransactions([])}
                className="px-6 py-3 text-gray-600 hover:text-gray-900 transition"
              >
                Upload New File
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
