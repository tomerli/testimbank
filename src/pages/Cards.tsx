import React from "react";
import { useBanking } from "@/contexts/BankingContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, CreditCard, Lock, Wifi, ChevronRight } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

const Cards = () => {
  const { creditCards } = useBanking();

  // Get card background based on type
  const getCardBackground = (type: string) => {
    switch (type) {
      case "visa":
        return "bg-gradient-to-br from-blue-600 to-blue-800";
      case "mastercard":
        return "bg-gradient-to-br from-orange-500 to-red-600";
      case "amex":
        return "bg-gradient-to-br from-green-600 to-green-800";
      default:
        return "bg-gradient-to-br from-gray-600 to-gray-800";
    }
  };

  // Get card logo based on type
  const getCardLogo = (type: string) => {
    switch (type) {
      case "visa":
        return "VISA";
      case "mastercard":
        return "MASTERCARD";
      case "amex":
        return "AMEX";
      default:
        return "CARD";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Credit Cards</h1>
          <p className="text-muted-foreground">Manage your credit cards and view balances</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Apply for Card
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {creditCards.map((card) => (
          <div key={card.id} className="group relative">
            <div className={`${getCardBackground(card.type)} rounded-2xl p-6 text-white shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1`}>
              <div className="flex justify-between items-start mb-8">
                <div className="text-2xl font-bold">{getCardLogo(card.type)}</div>
                <Lock className="h-6 w-6 opacity-75" />
              </div>
              
              <div className="flex items-center mb-8">
                <div className="h-8 w-12 bg-white/20 rounded mr-4 flex items-center justify-center">
                  <div className="h-4 w-6 bg-white/40 rounded"></div>
                </div>
                <Wifi className="h-6 w-6 opacity-75" />
              </div>

              <div className="space-y-2">
                <div className="text-sm opacity-75">Card Number</div>
                <div className="text-xl font-mono tracking-wider">{card.cardNumber}</div>
              </div>

              <div className="flex justify-between items-end mt-8">
                <div>
                  <div className="text-sm opacity-75">Expires</div>
                  <div className="font-mono">{card.expiryDate}</div>
                </div>
                <div>
                  <div className="text-sm opacity-75">Balance</div>
                  <div className="font-bold">{formatCurrency(card.balance)}</div>
                </div>
              </div>
            </div>

            <div className="mt-4 space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <div className="font-medium">{card.name}</div>
                  <div className="text-sm text-muted-foreground capitalize">{card.type}</div>
                </div>
                <ChevronRight className="h-5 w-5 text-muted-foreground" />
              </div>
              
              <div className="flex justify-between items-center text-sm">
                <div className="text-muted-foreground">Credit Limit</div>
                <div className="font-medium">{formatCurrency(card.creditLimit)}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Transactions</CardTitle>
            <CardDescription>Your latest card activities</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {creditCards[0]?.transactions.slice(0, 5).map((transaction) => (
                <div key={transaction.id} className="flex items-center justify-between p-3 rounded-lg border border-border">
                  <div className="flex items-center">
                    <div className={`mr-3 p-2 rounded-full ${
                      transaction.amount > 0 ? "bg-green-100" : "bg-red-100"
                    }`}>
                      {transaction.amount > 0 ? (
                        <CreditCard className="h-4 w-4 text-green-600" />
                      ) : (
                        <CreditCard className="h-4 w-4 text-red-600" />
                      )}
                    </div>
                    <div>
                      <div className="font-medium">{transaction.description}</div>
                      <div className="text-xs text-muted-foreground">
                        {transaction.category} • {transaction.date}
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
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Card Settings</CardTitle>
            <CardDescription>Manage your card preferences</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 rounded-lg border border-border">
                <div>
                  <div className="font-medium">Card Lock</div>
                  <div className="text-sm text-muted-foreground">Temporarily lock your card</div>
                </div>
                <Button variant="outline">Lock Card</Button>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg border border-border">
                <div>
                  <div className="font-medium">Travel Mode</div>
                  <div className="text-sm text-muted-foreground">Enable international transactions</div>
                </div>
                <Button variant="outline">Enable</Button>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg border border-border">
                <div>
                  <div className="font-medium">Card PIN</div>
                  <div className="text-sm text-muted-foreground">Change your card PIN</div>
                </div>
                <Button variant="outline">Change PIN</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Cards;
