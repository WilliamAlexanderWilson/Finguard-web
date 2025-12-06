import { NextRequest, NextResponse } from 'next/server'

interface Transaction {
  date: string
  description: string
  amount: number
  type?: string
}

interface CategorizedTransaction extends Transaction {
  category: string
  confidence: number
  subcategory?: string
}

export async function POST(request: NextRequest) {
  try {
    const { transactions } = await request.json()

    if (!transactions || !Array.isArray(transactions)) {
      return NextResponse.json(
        { error: 'Invalid transactions data' },
        { status: 400 }
      )
    }

    // Check if Claude API key is configured
    const apiKey = process.env.ANTHROPIC_API_KEY

    if (!apiKey) {
      // Fallback to rule-based categorization for demo
      const categorized = categorizeWithRules(transactions)
      return NextResponse.json({ categorized, mode: 'demo' })
    }

    // Use Claude AI for categorization
    const categorized = await categorizeWithClaude(transactions, apiKey)
    return NextResponse.json({ categorized, mode: 'ai' })

  } catch (error) {
    console.error('Categorization error:', error)
    return NextResponse.json(
      { error: 'Failed to categorize transactions' },
      { status: 500 }
    )
  }
}

// Rule-based categorization (demo mode)
function categorizeWithRules(transactions: Transaction[]): CategorizedTransaction[] {
  const rules = [
    { keywords: ['grocery', 'safeway', 'kroger', 'whole foods', 'trader'], category: 'Groceries', confidence: 0.95 },
    { keywords: ['restaurant', 'cafe', 'coffee', 'starbucks', 'mcdonald'], category: 'Dining', confidence: 0.90 },
    { keywords: ['gas', 'fuel', 'shell', 'chevron', 'exxon'], category: 'Transportation', confidence: 0.95 },
    { keywords: ['amazon', 'target', 'walmart', 'shopping'], category: 'Shopping', confidence: 0.85 },
    { keywords: ['rent', 'mortgage', 'apartment'], category: 'Housing', confidence: 0.98 },
    { keywords: ['electric', 'water', 'gas bill', 'utility'], category: 'Utilities', confidence: 0.95 },
    { keywords: ['netflix', 'spotify', 'subscription', 'membership'], category: 'Subscriptions', confidence: 0.90 },
    { keywords: ['salary', 'payroll', 'income', 'deposit'], category: 'Income', confidence: 0.98 },
    { keywords: ['insurance', 'premium'], category: 'Insurance', confidence: 0.95 },
    { keywords: ['phone', 'internet', 'cable', 'verizon', 'at&t'], category: 'Telecommunications', confidence: 0.90 },
  ]

  return transactions.map(transaction => {
    const description = transaction.description.toLowerCase()
    
    for (const rule of rules) {
      if (rule.keywords.some(keyword => description.includes(keyword))) {
        return {
          ...transaction,
          category: rule.category,
          confidence: rule.confidence,
        }
      }
    }

    // Default category
    return {
      ...transaction,
      category: transaction.amount > 0 ? 'Income' : 'Miscellaneous',
      confidence: 0.50,
    }
  })
}

// AI-powered categorization with Claude
async function categorizeWithClaude(
  transactions: Transaction[],
  apiKey: string
): Promise<CategorizedTransaction[]> {
  const prompt = `You are a financial categorization AI. Categorize the following transactions with high accuracy.

Transactions:
${transactions.map((t, i) => `${i + 1}. ${t.description} - $${t.amount}`).join('\n')}

For each transaction, provide:
1. Main category (e.g., Groceries, Dining, Transportation, Housing, Utilities, etc.)
2. Confidence score (0-1)
3. Brief reasoning

Respond ONLY with a JSON array in this exact format:
[
  {"index": 0, "category": "Groceries", "confidence": 0.95, "reasoning": "Grocery store purchase"},
  ...
]`

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 4096,
        messages: [
          {
            role: 'user',
            content: prompt,
          },
        ],
      }),
    })

    if (!response.ok) {
      throw new Error('Claude API request failed')
    }

    const data = await response.json()
    const content = data.content[0].text

    // Parse JSON from response
    const jsonMatch = content.match(/\[[\s\S]*\]/)
    if (!jsonMatch) {
      throw new Error('Failed to parse Claude response')
    }

    const categories = JSON.parse(jsonMatch[0])

    // Merge with original transactions
    return transactions.map((transaction, index) => {
      const category = categories.find((c: any) => c.index === index)
      return {
        ...transaction,
        category: category?.category || 'Miscellaneous',
        confidence: category?.confidence || 0.5,
      }
    })
  } catch (error) {
    console.error('Claude API error:', error)
    // Fallback to rules
    return categorizeWithRules(transactions)
  }
}
