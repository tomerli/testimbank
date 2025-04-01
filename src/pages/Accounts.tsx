import React from "react";
import { useBanking } from "@/contexts/BankingContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, ArrowUpRight, ArrowDownRight, Wallet, PiggyBank, Building2, Plane } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

const Accounts = () => {
  const { accounts, transactions } = useBanking();

  // Get recent transactions for each account
  const getRecentTransactions = (accountId: string) => {
    return transactions
      .filter(t => t.accountId === accountId)
      .slice(0, 3);
  };

  // Get account icon based on type
  const getAccountIcon = (type: string) => {
    switch (type) {
      case "checking":
        return <Wallet className="h-6 w-6" />;
      case "savings":
        return <PiggyBank className="h-6 w-6" />;
      case "business":
        return <Building2 className="h-6 w-6" />;
      default:
        return <Wallet className="h-6 w-6" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Accounts</h1>
          <p className="text-muted-foreground">Manage your accounts and view balances</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Open New Account
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {accounts.map(account => (
          <Card key={account.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {account.name}
              </CardTitle>
              {getAccountIcon(account.type)}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatCurrency(account.balance)}</div>
              <p className="text-xs text-muted-foreground">
                {account.type.charAt(0).toUpperCase() + account.type.slice(1)}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {accounts.map(account => (
          <Card key={account.id}>
            <CardHeader>
              <CardTitle className="text-lg">{account.name}</CardTitle>
              <CardDescription>Recent transactions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {getRecentTransactions(account.id).map(transaction => (
                  <div key={transaction.id} className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      {transaction.amount > 0 ? (
                        <ArrowDownRight className="h-4 w-4 text-green-500" />
                      ) : (
                        <ArrowUpRight className="h-4 w-4 text-red-500" />
                      )}
                      <div>
                        <p className="text-sm font-medium">{transaction.description}</p>
                        <p className="text-xs text-muted-foreground">{transaction.category}</p>
                      </div>
                    </div>
                    <div className={`text-sm font-medium ${transaction.amount > 0 ? 'text-green-500' : 'text-red-500'}`}>
                      {formatCurrency(transaction.amount)}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Accounts; 