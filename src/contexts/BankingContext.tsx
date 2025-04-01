import React, { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";

// Define types
export interface Account {
  id: string;
  name: string;
  type: "checking" | "savings" | "investment" | "credit";
  balance: number;
  currency: string;
  accountNumber: string;
  creditLimit?: number;
  transactions: Transaction[];
}

interface Transaction {
  id: string;
  accountId: string;
  amount: number;
  type: "deposit" | "withdrawal" | "transfer" | "payment";
  description: string;
  date: string;
  category: string;
}

interface CreditCard {
  id: string;
  name: string;
  type: "visa" | "mastercard" | "amex";
  cardNumber: string;
  expiryDate: string;
  balance: number;
  creditLimit: number;
  transactions: Transaction[];
}

interface Loan {
  id: string;
  type: "personal" | "auto" | "student" | "mortgage";
  amount: number;
  remainingAmount: number;
  interestRate: number;
  monthlyPayment: number;
  term: number; // in months
  nextPaymentDate: string;
}

interface Investment {
  id: string;
  name: string;
  type: "stock" | "etf" | "mutual_fund" | "bond";
  value: number;
  initialInvestment: number;
  performance: number; // percentage
}

interface LoanApplication {
  id: string;
  userId: string;
  type: "personal" | "auto" | "student" | "mortgage";
  amount: number;
  term: number;
  purpose: string;
  monthlyIncome: number;
  employmentStatus: string;
  status: "pending" | "approved" | "rejected";
  createdAt: Date;
}

interface BankingContextType {
  accounts: Account[];
  transactions: Transaction[];
  creditCards: CreditCard[];
  loans: Loan[];
  investments: Investment[];
  totalBalance: number;
  makeTransfer: (fromAccountId: string, toAccountId: string, amount: number, description: string) => void;
  addInvestment: (investment: Omit<Investment, "id">) => void;
  loanApplications: LoanApplication[];
  applyForLoan: (application: Omit<LoanApplication, "id" | "userId" | "status" | "createdAt">) => void;
}

// Create context
const BankingContext = createContext<BankingContextType>({
  accounts: [],
  transactions: [],
  creditCards: [],
  loans: [],
  investments: [],
  totalBalance: 0,
  makeTransfer: () => {},
  addInvestment: () => {},
  loanApplications: [],
  applyForLoan: () => {},
});

// Sample data based on user ID
const getUserAccounts = (userId: string): Account[] => [
  {
    id: `${userId}-acc1`,
    name: "Main Checking",
    type: "checking",
    balance: 5000,
    currency: "USD",
    accountNumber: "****4321",
    transactions: [],
  },
  {
    id: `${userId}-acc2`,
    name: "Savings",
    type: "savings",
    balance: 15000,
    currency: "USD",
    accountNumber: "****6789",
    transactions: [],
  },
  {
    id: `${userId}-acc3`,
    name: "Investment Portfolio",
    type: "investment",
    balance: 25000,
    currency: "USD",
    accountNumber: "****5432",
    transactions: [],
  },
  {
    id: `${userId}-acc4`,
    name: "Business Account",
    type: "checking",
    balance: 8000,
    currency: "USD",
    accountNumber: "****8765",
    transactions: [],
  },
  {
    id: `${userId}-acc5`,
    name: "Premium Credit Card",
    type: "credit",
    balance: 2500,
    currency: "USD",
    accountNumber: "****9876",
    creditLimit: 10000,
    transactions: [],
  },
];

const getUserTransactions = (userId: string): Transaction[] => [
  {
    id: `${userId}-tr1`,
    accountId: `${userId}-acc1`,
    amount: -75.50,
    type: "payment",
    description: "Grocery Store",
    date: "2024-09-15",
    category: "Groceries",
  },
  {
    id: `${userId}-tr2`,
    accountId: `${userId}-acc1`,
    amount: -120.00,
    type: "payment",
    description: "Electric Bill",
    date: "2024-09-14",
    category: "Utilities",
  },
  {
    id: `${userId}-tr3`,
    accountId: `${userId}-acc1`,
    amount: 1250.00,
    type: "deposit",
    description: "Paycheck",
    date: "2024-09-10",
    category: "Income",
  },
  {
    id: `${userId}-tr4`,
    accountId: `${userId}-acc3`,
    amount: -2500.00,
    type: "payment",
    description: "Office Supplies",
    date: "2024-09-08",
    category: "Business",
  },
  {
    id: `${userId}-tr5`,
    accountId: `${userId}-acc2`,
    amount: -350.00,
    type: "transfer",
    description: "Transfer to Vacation Fund",
    date: "2024-09-05",
    category: "Transfer",
  },
];

const getUserCreditCards = (userId: string): CreditCard[] => [
  {
    id: `${userId}-cc1`,
    name: "TestimBank Business Elite",
    type: "visa",
    cardNumber: "****5678",
    expiryDate: "09/26",
    balance: 15000,
    creditLimit: 20000,
    transactions: [
      {
        id: `${userId}-cc1-tr1`,
        accountId: `${userId}-cc1`,
        amount: -2500.00,
        type: "payment",
        description: "Office Equipment Purchase",
        date: "2024-03-15",
        category: "Business",
      },
      {
        id: `${userId}-cc1-tr2`,
        accountId: `${userId}-cc1`,
        amount: -850.00,
        type: "payment",
        description: "Business Conference Tickets",
        date: "2024-03-14",
        category: "Travel",
      },
      {
        id: `${userId}-cc1-tr3`,
        accountId: `${userId}-cc1`,
        amount: -1200.00,
        type: "payment",
        description: "Client Dinner",
        date: "2024-03-13",
        category: "Entertainment",
      },
    ],
  },
  {
    id: `${userId}-cc2`,
    name: "TestimBank Travel Rewards",
    type: "mastercard",
    cardNumber: "****1234",
    expiryDate: "11/25",
    balance: 7800,
    creditLimit: 10000,
    transactions: [
      {
        id: `${userId}-cc2-tr1`,
        accountId: `${userId}-cc2`,
        amount: -1200.00,
        type: "payment",
        description: "Hotel Booking - Paris",
        date: "2024-03-15",
        category: "Travel",
      },
      {
        id: `${userId}-cc2-tr2`,
        accountId: `${userId}-cc2`,
        amount: -450.00,
        type: "payment",
        description: "Airline Tickets",
        date: "2024-03-14",
        category: "Travel",
      },
      {
        id: `${userId}-cc2-tr3`,
        accountId: `${userId}-cc2`,
        amount: -150.00,
        type: "payment",
        description: "Travel Insurance",
        date: "2024-03-13",
        category: "Insurance",
      },
    ],
  },
  {
    id: `${userId}-cc3`,
    name: "TestimBank Cash Back",
    type: "amex",
    cardNumber: "****9012",
    expiryDate: "03/25",
    balance: 3500,
    creditLimit: 5000,
    transactions: [
      {
        id: `${userId}-cc3-tr1`,
        accountId: `${userId}-cc3`,
        amount: -250.00,
        type: "payment",
        description: "Grocery Shopping",
        date: "2024-03-15",
        category: "Groceries",
      },
      {
        id: `${userId}-cc3-tr2`,
        accountId: `${userId}-cc3`,
        amount: -180.00,
        type: "payment",
        description: "Gas Station",
        date: "2024-03-14",
        category: "Transportation",
      },
      {
        id: `${userId}-cc3-tr3`,
        accountId: `${userId}-cc3`,
        amount: -120.00,
        type: "payment",
        description: "Online Shopping",
        date: "2024-03-13",
        category: "Shopping",
      },
    ],
  },
];

const getUserLoans = (userId: string): Loan[] => [
  {
    id: `${userId}-loan1`,
    type: "mortgage",
    amount: 450000,
    remainingAmount: 375000,
    interestRate: 4.5,
    monthlyPayment: 1901.84,
    term: 360,
    nextPaymentDate: "2024-10-01",
  },
  {
    id: `${userId}-loan2`,
    type: "auto",
    amount: 35000,
    remainingAmount: 15000,
    interestRate: 5.2,
    monthlyPayment: 662.50,
    term: 60,
    nextPaymentDate: "2024-10-15",
  },
  {
    id: `${userId}-loan3`,
    type: "student",
    amount: 25000,
    remainingAmount: 18000,
    interestRate: 3.8,
    monthlyPayment: 250.00,
    term: 120,
    nextPaymentDate: "2024-10-20",
  },
  {
    id: `${userId}-loan4`,
    type: "personal",
    amount: 10000,
    remainingAmount: 3000,
    interestRate: 9.5,
    monthlyPayment: 250.22,
    term: 48,
    nextPaymentDate: "2024-10-25",
  },
];

const getUserInvestments = (userId: string): Investment[] => [
  {
    id: `${userId}-inv1`,
    name: "Growth Tech Portfolio",
    type: "stock",
    value: 15250.75,
    initialInvestment: 12000,
    performance: 27.09,
  },
  {
    id: `${userId}-inv2`,
    name: "Global Market ETF",
    type: "etf",
    value: 8320.50,
    initialInvestment: 7500,
    performance: 10.94,
  },
  {
    id: `${userId}-inv3`,
    name: "Retirement Fund",
    type: "mutual_fund",
    value: 4969.00,
    initialInvestment: 5000,
    performance: -0.62,
  },
  {
    id: `${userId}-inv4`,
    name: "Government Bonds",
    type: "bond",
    value: 7500.00,
    initialInvestment: 7000,
    performance: 7.14,
  },
  {
    id: `${userId}-inv5`,
    name: "Sustainable Energy ETF",
    type: "etf",
    value: 6200.00,
    initialInvestment: 6000,
    performance: 3.33,
  },
];

// Provider component
export const BankingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const userId = user?.id || "guest";

  const [accounts, setAccounts] = useState<Account[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [creditCards, setCreditCards] = useState<CreditCard[]>([]);
  const [loans, setLoans] = useState<Loan[]>([]);
  const [investments, setInvestments] = useState<Investment[]>([]);
  const [loanApplications, setLoanApplications] = useState<LoanApplication[]>([]);

  // Load user data when authenticated
  useEffect(() => {
    if (user) {
      setAccounts(getUserAccounts(userId));
      setTransactions(getUserTransactions(userId));
      setCreditCards(getUserCreditCards(userId));
      setLoans(getUserLoans(userId));
      setInvestments(getUserInvestments(userId));
    } else {
      // Reset data when logged out
      setAccounts([]);
      setTransactions([]);
      setCreditCards([]);
      setLoans([]);
      setInvestments([]);
    }
  }, [user, userId]);

  // Calculate total balance
  const totalBalance = accounts.reduce((sum, account) => sum + account.balance, 0);

  // Make transfer between accounts
  const makeTransfer = (fromAccountId: string, toAccountId: string, amount: number, description: string) => {
    if (amount <= 0) {
      throw new Error("Transfer amount must be positive");
    }

    setAccounts(prevAccounts => {
      const newAccounts = [...prevAccounts];
      const fromAccount = newAccounts.find(acc => acc.id === fromAccountId);
      const toAccount = newAccounts.find(acc => acc.id === toAccountId);

      if (!fromAccount || !toAccount) {
        throw new Error("Invalid account");
      }

      if (fromAccount.balance < amount) {
        throw new Error("Insufficient funds");
      }

      fromAccount.balance -= amount;
      toAccount.balance += amount;

      return newAccounts;
    });

    // Add transaction records
    const now = new Date().toISOString().split('T')[0];
    const newTransactionId = `tr-${Date.now()}`;

    const fromTransaction: Transaction = {
      id: `from-${newTransactionId}`,
      accountId: fromAccountId,
      amount: -amount,
      type: "transfer",
      description: `Transfer to ${description}`,
      date: now,
      category: "Transfer",
    };

    const toTransaction: Transaction = {
      id: `to-${newTransactionId}`,
      accountId: toAccountId,
      amount: amount,
      type: "transfer",
      description: `Transfer from ${description}`,
      date: now,
      category: "Transfer",
    };

    setTransactions(prev => [fromTransaction, toTransaction, ...prev]);
  };

  const addInvestment = (investment: Omit<Investment, "id">) => {
    if (!user) return;
    const newInvestment: Investment = {
      ...investment,
      id: `${user.id}-inv${investments.length + 1}`,
    };
    setInvestments((prev) => [...prev, newInvestment]);
  };

  const applyForLoan = (application: Omit<LoanApplication, "id" | "userId" | "status" | "createdAt">) => {
    if (!user) return;

    const newApplication: LoanApplication = {
      ...application,
      id: `loan-${Date.now()}`,
      userId: user.id,
      status: "pending",
      createdAt: new Date(),
    };

    setLoanApplications((prev) => [...prev, newApplication]);
  };

  const value = {
    accounts,
    transactions,
    creditCards,
    loans,
    investments,
    totalBalance,
    makeTransfer,
    addInvestment,
    loanApplications,
    applyForLoan,
  };

  return (
    <BankingContext.Provider value={value}>
      {children}
    </BankingContext.Provider>
  );
};

// Custom hook for using banking context
export const useBanking = () => useContext(BankingContext);
