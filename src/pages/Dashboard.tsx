import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useBanking } from "@/contexts/BankingContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowDown, ArrowUp, CreditCard, Wallet, BarChart3, PiggyBank } from "lucide-react";
import { formatCurrency, cn } from "@/lib/utils";

const Dashboard = () => {
  const { user } = useAuth();
  const { accounts, transactions, creditCards, investments, totalBalance } = useBanking();

  const firstName = user?.firstName || "User";
  
  // Get current time to determine greeting
  const currentHour = new Date().getHours();
  let greeting = "Good evening";
  if (currentHour < 12) {
    greeting = "Good morning";
  } else if (currentHour < 18) {
    greeting = "Good afternoon";
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <section className="mb-6">
        <h1 className="text-3xl font-bold">
          {greeting}, {firstName}
        </h1>
        <p className="text-muted-foreground">
          Welcome back to your financial overview
        </p>
      </section>
      
      {/* Account Balance Summary */}
      <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Balance</CardTitle>
            <Wallet className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(totalBalance)}</div>
            <p className="text-xs text-muted-foreground">
              Across all accounts
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Available Credit</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(
                creditCards.reduce((sum, card) => sum + (card.creditLimit - card.balance), 0)
              )}
            </div>
            <p className="text-xs text-muted-foreground">
              Across {creditCards.length} cards
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Investments</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(
                investments.reduce((sum, inv) => sum + inv.value, 0)
              )}
            </div>
            <p className="text-xs text-muted-foreground">
              {investments.length} investment portfolio{investments.length > 1 ? "s" : ""}
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Monthly Savings</CardTitle>
            <PiggyBank className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(650.25)}
            </div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-500 font-medium">+12%</span> from last month
            </p>
          </CardContent>
        </Card>
      </section>
      
      {/* Accounts and Recent Transactions */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Accounts */}
        <Card>
          <CardHeader>
            <CardTitle>Your Accounts</CardTitle>
            <CardDescription>
              Overview of your bank accounts
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {accounts.map((account) => (
                <div key={account.id} className="flex items-center justify-between p-3 rounded-lg border border-border">
                  <div>
                    <div className="font-medium">{account.name}</div>
                    <div className="text-xs text-muted-foreground">{account.accountNumber}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold">{formatCurrency(account.balance)}</div>
                    <div className="text-xs text-muted-foreground">{account.type}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        {/* Recent Transactions */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Transactions</CardTitle>
            <CardDescription>
              Your latest financial activities
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {transactions.slice(0, 5).map((transaction) => (
                <div key={transaction.id} className="flex items-center justify-between p-3 rounded-lg border border-border">
                  <div className="flex items-center">
                    <div className={cn(
                      "mr-3 p-2 rounded-full",
                      transaction.amount > 0 
                        ? "bg-green-100" 
                        : "bg-red-100"
                    )}>
                      {transaction.amount > 0 ? (
                        <ArrowDown className="h-4 w-4 text-green-600" />
                      ) : (
                        <ArrowUp className="h-4 w-4 text-red-600" />
                      )}
                    </div>
                    <div>
                      <div className="font-medium">{transaction.description}</div>
                      <div className="text-xs text-muted-foreground">
                        {transaction.category} • {transaction.date}
                      </div>
                    </div>
                  </div>
                  <div className={cn(
                    "font-bold",
                    transaction.amount > 0 
                      ? "text-green-600" 
                      : "text-red-600"
                  )}>
                    {transaction.amount > 0 ? "+" : ""}{formatCurrency(transaction.amount)}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
