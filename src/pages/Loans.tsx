import React from "react";
import { useBanking } from "@/contexts/BankingContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Car, GraduationCap, Wallet, Calendar, ArrowUpRight, ArrowDownRight, Home } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

const Loans = () => {
  const { loans } = useBanking();

  // Calculate total loan amount and remaining amount
  const totalLoanAmount = loans.reduce((sum, loan) => sum + loan.amount, 0);
  const totalRemainingAmount = loans.reduce((sum, loan) => sum + loan.remainingAmount, 0);
  const totalMonthlyPayment = loans.reduce((sum, loan) => sum + loan.monthlyPayment, 0);

  // Get loan icon based on type
  const getLoanIcon = (type: string) => {
    switch (type) {
      case "auto":
        return <Car className="h-6 w-6" />;
      case "student":
        return <GraduationCap className="h-6 w-6" />;
      case "personal":
        return <Wallet className="h-6 w-6" />;
      case "mortgage":
        return <Home className="h-6 w-6" />;
      default:
        return <Wallet className="h-6 w-6" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Loans</h1>
          <p className="text-muted-foreground">Manage your loans and track payments</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Apply for Loan
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Loan Amount</CardTitle>
            <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(totalLoanAmount)}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Remaining Balance</CardTitle>
            <ArrowDownRight className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(totalRemainingAmount)}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Payments</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(totalMonthlyPayment)}</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {loans.map(loan => (
          <Card key={loan.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div>
                <CardTitle className="text-lg capitalize">{loan.type} Loan</CardTitle>
                <CardDescription>Next payment: {loan.nextPaymentDate}</CardDescription>
              </div>
              {getLoanIcon(loan.type)}
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Original Amount</span>
                  <span className="font-medium">{formatCurrency(loan.amount)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Remaining Balance</span>
                  <span className="font-medium">{formatCurrency(loan.remainingAmount)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Monthly Payment</span>
                  <span className="font-medium">{formatCurrency(loan.monthlyPayment)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Interest Rate</span>
                  <span className="font-medium">{loan.interestRate}%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Term</span>
                  <span className="font-medium">{loan.term} months</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Loans; 