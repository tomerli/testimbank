import React from "react";
import { useBanking } from "@/contexts/BankingContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Home, Calendar, Building2, PiggyBank, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

const Mortgage = () => {
  const { loans } = useBanking();
  
  // Filter mortgage loans
  const mortgages = loans.filter(loan => loan.type === "mortgage");
  const mortgage = mortgages[0]; // Assuming one mortgage per user

  // Calculate mortgage-specific metrics
  const totalPaid = mortgage ? mortgage.amount - mortgage.remainingAmount : 0;
  const yearsRemaining = mortgage ? Math.ceil(mortgage.term / 12) : 0;
  const totalInterest = mortgage ? 
    (mortgage.monthlyPayment * mortgage.term) - mortgage.amount : 0;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Mortgage</h1>
          <p className="text-muted-foreground">Manage your home loan and track progress</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Apply for Mortgage
        </Button>
      </div>

      {mortgage ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Loan Amount</CardTitle>
                <Home className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{formatCurrency(mortgage.amount)}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Remaining Balance</CardTitle>
                <ArrowDownRight className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{formatCurrency(mortgage.remainingAmount)}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Monthly Payment</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{formatCurrency(mortgage.monthlyPayment)}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Interest Rate</CardTitle>
                <PiggyBank className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{mortgage.interestRate}%</div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Loan Progress</CardTitle>
                <CardDescription>Track your mortgage repayment progress</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Total Amount Paid</span>
                    <span className="font-medium">{formatCurrency(totalPaid)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Years Remaining</span>
                    <span className="font-medium">{yearsRemaining} years</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Total Interest</span>
                    <span className="font-medium">{formatCurrency(totalInterest)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Next Payment</span>
                    <span className="font-medium">{mortgage.nextPaymentDate}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Payment Schedule</CardTitle>
                <CardDescription>View your upcoming mortgage payments</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Monthly Principal</span>
                    <span className="font-medium">{formatCurrency(mortgage.monthlyPayment * 0.6)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Monthly Interest</span>
                    <span className="font-medium">{formatCurrency(mortgage.monthlyPayment * 0.4)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Annual Payment</span>
                    <span className="font-medium">{formatCurrency(mortgage.monthlyPayment * 12)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </>
      ) : (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Building2 className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No Active Mortgage</h3>
            <p className="text-muted-foreground text-center mb-4">
              You don't have an active mortgage. Apply for a new mortgage to get started.
            </p>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Apply for Mortgage
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Mortgage; 