import React, { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";

// Define types
interface Account {
  id: string;
  name: string;
  type: "checking" | "savings" | "investment";
  balance: number;
  currency: string;
  accountNumber: string;
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
  number: string;
  expiryDate: string;
  availableCredit: number;
  totalLimit: number;
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

interface BankingContextType {
  accounts: Account[];
  transactions: Transaction[];
  creditCards: CreditCard[];
  loans: Loan[];
  investments: Investment[];
  totalBalance: number;
  makeTransfer: (fromAccountId: string, toAccountId: string, amount: number, description: string) => void;
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
});

// Sample data based on user ID
const getUserAccounts = (userId: string): Account[] => [
  {
    id: `${userId}-acc1`,
    name: "Everyday Checking",
    type: "checking",
    balance: 4250.75,
    currency: "USD",
    accountNumber: "****4321",
  },
  {
    id: `${userId}-acc2`,
    name: "Emergency Savings",
    type: "savings",
    balance: 12680.50,
    currency: "USD",
    accountNumber: "****6789",
  },
  {
    id: `${userId}-acc3`,
    name: "Business Checking",
    type: "checking",
    balance: 8500.25,
    currency: "USD",
    accountNumber: "****5432",
  },
  {
    id: `${userId}-acc4`,
    name: "Vacation Fund",
    type: "savings",
    balance: 3500.00,
    currency: "USD",
    accountNumber: "****8765",
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
    number: "****5678",
    expiryDate: "09/26",
    availableCredit: 15000,
    totalLimit: 20000,
  },
  {
    id: `${userId}-cc2`,
    name: "TestimBank Travel Rewards",
    number: "****1234",
    expiryDate: "11/25",
    availableCredit: 7800,
    totalLimit: 10000,
  },
  {
    id: `${userId}-cc3`,
    name: "TestimBank Cash Back",
    number: "****9012",
    expiryDate: "03/25",
    availableCredit: 3500,
    totalLimit: 5000,
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

  return (
    <BankingContext.Provider
      value={{
        accounts,
        transactions,
        creditCards,
        loans,
        investments,
        totalBalance,
        makeTransfer,
      }}
    >
      {children}
    </BankingContext.Provider>
  );
};

// Custom hook for using banking context
export const useBanking = () => useContext(BankingContext);
