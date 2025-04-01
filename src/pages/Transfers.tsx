
import React, { useState } from "react";
import { useBanking } from "@/contexts/BankingContext";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowDown, ArrowUp, Calendar } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { toast } from "sonner";

const Transfers = () => {
  const { accounts, transactions, makeTransfer } = useBanking();
  
  const [fromAccount, setFromAccount] = useState("");
  const [toAccount, setToAccount] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!fromAccount || !toAccount || !amount || !description) {
      toast.error("Please fill in all fields");
      return;
    }
    
    if (fromAccount === toAccount) {
      toast.error("You cannot transfer to the same account");
      return;
    }
    
    const transferAmount = parseFloat(amount);
    if (isNaN(transferAmount) || transferAmount <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }
    
    try {
      makeTransfer(fromAccount, toAccount, transferAmount, description);
      toast.success("Transfer completed successfully");
      
      // Reset form
      setAmount("");
      setDescription("");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Transfer failed");
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <h1 className="text-3xl font-bold">Transfers</h1>
      <p className="text-muted-foreground">Send money between your accounts or to others</p>
      
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Transfer Form */}
        <Card>
          <CardHeader>
            <CardTitle>New Transfer</CardTitle>
            <CardDescription>
              Transfer funds between your accounts
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="from-account">From Account</Label>
                <Select 
                  value={fromAccount} 
                  onValueChange={setFromAccount}
                >
                  <SelectTrigger id="from-account">
                    <SelectValue placeholder="Select account" />
                  </SelectTrigger>
                  <SelectContent>
                    {accounts.map((account) => (
                      <SelectItem key={account.id} value={account.id}>
                        {account.name} ({formatCurrency(account.balance)})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="to-account">To Account</Label>
                <Select 
                  value={toAccount} 
                  onValueChange={setToAccount}
                >
                  <SelectTrigger id="to-account">
                    <SelectValue placeholder="Select account" />
                  </SelectTrigger>
                  <SelectContent>
                    {accounts.map((account) => (
                      <SelectItem key={account.id} value={account.id}>
                        {account.name} ({formatCurrency(account.balance)})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="amount">Amount</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                  <Input
                    id="amount"
                    type="number"
                    placeholder="0.00"
                    className="pl-7"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  placeholder="What's this transfer for?"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full bg-bank hover:bg-bank-dark">
                Send Money
              </Button>
            </CardFooter>
          </form>
        </Card>
        
        {/* Recent Transfers */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Transfers</CardTitle>
            <CardDescription>
              Your last 5 transfers
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {transactions
                .filter(t => t.type === "transfer")
                .slice(0, 5)
                .map((transaction) => (
                  <div key={transaction.id} className="flex items-center justify-between p-3 rounded-lg border border-border">
                    <div className="flex items-center">
                      <div className={`mr-3 p-2 rounded-full ${
                        transaction.amount > 0 ? "bg-green-100" : "bg-red-100"
                      }`}>
                        {transaction.amount > 0 ? (
                          <ArrowDown className="h-4 w-4 text-green-600" />
                        ) : (
                          <ArrowUp className="h-4 w-4 text-red-600" />
                        )}
                      </div>
                      <div>
                        <div className="font-medium">{transaction.description}</div>
                        <div className="flex items-center text-xs text-muted-foreground">
                          <Calendar className="h-3 w-3 mr-1" />
                          {transaction.date}
                        </div>
                      </div>
                    </div>
                    <div className={`font-bold ${
                      transaction.amount > 0 ? "text-green-600" : "text-red-600"
                    }`}>
                      {transaction.amount > 0 ? "+" : ""}{formatCurrency(transaction.amount)}
                    </div>
                  </div>
                ))}
              
              {transactions.filter(t => t.type === "transfer").length === 0 && (
                <div className="text-center p-4 text-muted-foreground">
                  No transfer history yet
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Transfers;
