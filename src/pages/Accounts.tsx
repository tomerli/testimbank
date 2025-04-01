import React from "react";
import { useBanking } from "../contexts/BankingContext";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Plus, ArrowUpDown, PiggyBank, Building2, Wallet, CreditCard, Download, Lock, Bell } from "lucide-react";

const Accounts = () => {
  const { accounts, makeTransfer } = useBanking();
  const [fromAccount, setFromAccount] = React.useState("");
  const [toAccount, setToAccount] = React.useState("");
  const [amount, setAmount] = React.useState("");
  const [description, setDescription] = React.useState("");

  const handleTransfer = () => {
    if (!fromAccount || !toAccount || !amount || !description) return;
    try {
      makeTransfer(fromAccount, toAccount, parseFloat(amount), description);
      setAmount("");
      setDescription("");
    } catch (error) {
      console.error("Transfer failed:", error);
    }
  };

  const getAccountIcon = (type: string) => {
    switch (type) {
      case "checking":
        return <Wallet className="h-6 w-6" />;
      case "savings":
        return <PiggyBank className="h-6 w-6" />;
      case "investment":
        return <Building2 className="h-6 w-6" />;
      case "credit":
        return <CreditCard className="h-6 w-6" />;
      default:
        return <Wallet className="h-6 w-6" />;
    }
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Accounts</h1>
          <p className="text-muted-foreground">Manage your accounts and view balances</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Open New Account
        </Button>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="transfer">Transfer</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {accounts.map((account) => (
              <Card key={account.id} className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    {getAccountIcon(account.type)}
                    <div>
                      <h3 className="font-semibold">{account.name}</h3>
                      <p className="text-sm text-gray-500">{account.type}</p>
                    </div>
                  </div>
                  <span className="text-sm text-gray-500">{account.accountNumber}</span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Balance</span>
                    <span className="font-semibold">
                      {account.currency} {account.balance.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Account Type</span>
                    <span className="capitalize">{account.type}</span>
                  </div>
                  {account.type === "credit" && (
                    <div className="flex justify-between">
                      <span className="text-gray-500">Available Credit</span>
                      <span className="font-semibold">
                        {account.currency} {(account.creditLimit - account.balance).toLocaleString()}
                      </span>
                    </div>
                  )}
                </div>
                <div className="mt-4 flex space-x-2">
                  <Button variant="outline" className="flex-1">
                    View Details
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <Download className="mr-2 h-4 w-4" />
                    Statements
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="transfer" className="space-y-4">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Transfer Between Accounts</h2>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>From Account</Label>
                  <Select value={fromAccount} onValueChange={setFromAccount}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select account" />
                    </SelectTrigger>
                    <SelectContent>
                      {accounts.map((account) => (
                        <SelectItem key={account.id} value={account.id}>
                          {account.name} - {account.currency} {account.balance.toLocaleString()}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>To Account</Label>
                  <Select value={toAccount} onValueChange={setToAccount}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select account" />
                    </SelectTrigger>
                    <SelectContent>
                      {accounts.map((account) => (
                        <SelectItem key={account.id} value={account.id}>
                          {account.name} - {account.currency} {account.balance.toLocaleString()}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Amount</Label>
                <Input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="Enter amount"
                />
              </div>
              <div className="space-y-2">
                <Label>Description</Label>
                <Input
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Enter description"
                />
              </div>
              <Button onClick={handleTransfer} className="w-full">
                <ArrowUpDown className="mr-2 h-4 w-4" />
                Make Transfer
              </Button>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Account Settings</h2>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Default Account</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select default account" />
                  </SelectTrigger>
                  <SelectContent>
                    {accounts.map((account) => (
                      <SelectItem key={account.id} value={account.id}>
                        {account.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Account Alerts</Label>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span>Low Balance Alert</span>
                    <Button variant="outline" size="sm">
                      <Bell className="mr-2 h-4 w-4" />
                      Configure
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Large Transaction Alert</span>
                    <Button variant="outline" size="sm">
                      <Bell className="mr-2 h-4 w-4" />
                      Configure
                    </Button>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Security Settings</Label>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span>Card Lock</span>
                    <Button variant="outline" size="sm">
                      <Lock className="mr-2 h-4 w-4" />
                      Manage
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Accounts; 