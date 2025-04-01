
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
    name: "Main Checking",
    type: "checking",
    balance: 4250.75,
    currency: "USD",
    accountNumber: "****4321",
  },
  {
    id: `${userId}-acc2`,
    name: "Savings",
    type: "savings",
    balance: 12680.50,
    currency: "USD",
    accountNumber: "****6789",
  },
  {
    id: `${userId}-acc3`,
    name: "Investment Portfolio",
    type: "investment",
    balance: 28540.25,
    currency: "USD",
    accountNumber: "****9876",
  },
];

const getUserTransactions = (userId: string): Transaction[] => [
  {
    id: `${userId}-tr1`,
    accountId: `${userId}-acc1`,
    amount: -75.50,
    type: "payment",
    description: "Grocery Store",
    date: "2023-09-15",
    category: "Groceries",
  },
  {
    id: `${userId}-tr2`,
    accountId: `${userId}-acc1`,
    amount: -120.00,
    type: "payment",
    description: "Electric Bill",
    date: "2023-09-14",
    category: "Utilities",
  },
  {
    id: `${userId}-tr3`,
    accountId: `${userId}-acc1`,
    amount: 1250.00,
    type: "deposit",
    description: "Paycheck",
    date: "2023-09-10",
    category: "Income",
  },
  {
    id: `${userId}-tr4`,
    accountId: `${userId}-acc1`,
    amount: -45.99,
    type: "payment",
    description: "Streaming Service",
    date: "2023-09-08",
    category: "Entertainment",
  },
  {
    id: `${userId}-tr5`,
    accountId: `${userId}-acc1`,
    amount: -350.00,
    type: "transfer",
    description: "Transfer to Savings",
    date: "2023-09-05",
    category: "Transfer",
  },
];

const getUserCreditCards = (userId: string): CreditCard[] => [
  {
    id: `${userId}-cc1`,
    name: "TestimBank Rewards Platinum",
    number: "****5678",
    expiryDate: "09/26",
    availableCredit: 3500,
    totalLimit: 5000,
  },
  {
    id: `${userId}-cc2`,
    name: "TestimBank Travel Gold",
    number: "****1234",
    expiryDate: "11/25",
    availableCredit: 7800,
    totalLimit: 10000,
  },
];

const getUserLoans = (userId: string): Loan[] => [
  {
    id: `${userId}-loan1`,
    type: "mortgage",
    amount: 250000,
    remainingAmount: 175000,
    interestRate: 4.5,
    monthlyPayment: 1267.89,
    term: 360,
    nextPaymentDate: "2023-10-01",
  },
  {
    id: `${userId}-loan2`,
    type: "personal",
    amount: 15000,
    remainingAmount: 5000,
    interestRate: 9.5,
    monthlyPayment: 375.22,
    term: 48,
    nextPaymentDate: "2023-10-15",
  },
];

const getUserInvestments = (userId: string): Investment[] => [
  {
    id: `${userId}-inv1`,
    name: "Tech Growth Fund",
    type: "mutual_fund",
    value: 15250.75,
    initialInvestment: 12000,
    performance: 27.09,
  },
  {
    id: `${userId}-inv2`,
    name: "S&P 500 ETF",
    type: "etf",
    value: 8320.50,
    initialInvestment: 7500,
    performance: 10.94,
  },
  {
    id: `${userId}-inv3`,
    name: "Corporate Bond Fund",
    type: "bond",
    value: 4969.00,
    initialInvestment: 5000,
    performance: -0.62,
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
