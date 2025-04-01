
import React from "react";
import { useBanking } from "@/contexts/BankingContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { LockIcon, CreditCard as CreditCardIcon, Eye, EyeOff } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { toast } from "sonner";

const Cards = () => {
  const { creditCards } = useBanking();
  const [showCardNumber, setShowCardNumber] = React.useState<Record<string, boolean>>({});
  
  const toggleCardNumberVisibility = (cardId: string) => {
    setShowCardNumber(prev => ({
      ...prev,
      [cardId]: !prev[cardId]
    }));
  };
  
  const lockCard = (cardId: string) => {
    toast.success("Card locked successfully");
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <h1 className="text-3xl font-bold">Your Cards</h1>
      <p className="text-muted-foreground">Manage your credit and debit cards</p>
      
      <div className="grid gap-6 md:grid-cols-2">
        {creditCards.map((card) => (
          <Card key={card.id}>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>{card.name}</CardTitle>
                <CreditCardIcon className="h-5 w-5 text-bank" />
              </div>
              <CardDescription>Expires {card.expiryDate}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bank-card-gradient">
                <div className="flex flex-col h-48 justify-between">
                  <div className="flex justify-between items-center">
                    <div className="text-xl font-bold">TestimBank</div>
                    <div className="text-sm font-light">Credit Card</div>
                  </div>
                  
                  <div className="text-xl tracking-widest font-mono">
                    {showCardNumber[card.id] 
                      ? "4387 2349 8723 1290" 
                      : card.number.padStart(19, "**** **** **** ")}
                  </div>
                  
                  <div className="flex justify-between items-end">
                    <div>
                      <div className="text-xs opacity-80">CARD HOLDER</div>
                      <div>John Doe</div>
                    </div>
                    <div>
                      <div className="text-xs opacity-80">EXPIRES</div>
                      <div>{card.expiryDate}</div>
                    </div>
                    <div className="w-12 h-12 opacity-80">
                      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="1.5" />
                        <circle cx="8" cy="12" r="2" fill="white" />
                        <circle cx="16" cy="12" r="2" fill="white" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Available Credit</span>
                  <span className="text-sm font-medium">
                    {formatCurrency(card.availableCredit)} / {formatCurrency(card.totalLimit)}
                  </span>
                </div>
                <Progress value={(card.availableCredit / card.totalLimit) * 100} />
                <div className="text-xs text-muted-foreground text-right">
                  {Math.round((card.availableCredit / card.totalLimit) * 100)}% available
                </div>
              </div>
              
              <div className="flex space-x-2">
                <Button 
                  variant="outline" 
                  className="flex-1"
                  onClick={() => toggleCardNumberVisibility(card.id)}
                >
                  {showCardNumber[card.id] ? (
                    <>
                      <EyeOff className="h-4 w-4 mr-2" />
                      Hide Number
                    </>
                  ) : (
                    <>
                      <Eye className="h-4 w-4 mr-2" />
                      Show Number
                    </>
                  )}
                </Button>
                <Button 
                  variant="outline" 
                  className="flex-1"
                  onClick={() => lockCard(card.id)}
                >
                  <LockIcon className="h-4 w-4 mr-2" />
                  Lock Card
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Cards;
