import React from "react";
import { useBanking } from "@/contexts/BankingContext";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ArrowUpRight, ArrowDownRight, DollarSign, Clock, Calendar, PiggyBank } from "lucide-react";
import NewLoanDialog from "@/components/NewLoanDialog";

const Loans = () => {
  const { loans, loanApplications, applyForLoan } = useBanking();

  const totalLoanAmount = loans.reduce((sum, loan) => sum + loan.amount, 0);
  const totalRemaining = loans.reduce((sum, loan) => sum + loan.remainingAmount, 0);
  const totalPaid = totalLoanAmount - totalRemaining;
  const totalMonthlyPayment = loans.reduce((sum, loan) => sum + loan.monthlyPayment, 0);
  const totalInterest = loans.reduce((sum, loan) => {
    const totalPayment = loan.monthlyPayment * loan.term;
    return sum + (totalPayment - loan.amount);
  }, 0);

  const getLoanIcon = (type: string) => {
    switch (type) {
      case "personal":
        return <DollarSign className="h-6 w-6" />;
      case "auto":
        return <ArrowUpRight className="h-6 w-6" />;
      case "student":
        return <ArrowDownRight className="h-6 w-6" />;
      case "mortgage":
        return <Calendar className="h-6 w-6" />;
      default:
        return <DollarSign className="h-6 w-6" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Loans</h1>
          <p className="text-muted-foreground">Manage your loans and track payments</p>
        </div>
        <NewLoanDialog onSubmit={applyForLoan} />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Loans</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalLoanAmount.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Original loan amount</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Payment</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalMonthlyPayment.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Total monthly payment</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Interest</CardTitle>
            <PiggyBank className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalInterest.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Interest over loan terms</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Applications</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {loanApplications.filter((app) => app.status === "pending").length}
            </div>
            <p className="text-xs text-muted-foreground">Pending applications</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {loans.map((loan) => (
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
                  <span className="font-medium">${loan.amount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Remaining Balance</span>
                  <span className="font-medium">${loan.remainingAmount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Monthly Payment</span>
                  <span className="font-medium">${loan.monthlyPayment.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Interest Rate</span>
                  <span className="font-medium">{loan.interestRate}%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Term</span>
                  <span className="font-medium">{loan.term / 12} years</span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Progress</span>
                    <span>{Math.round((loan.remainingAmount / loan.amount) * 100)}% remaining</span>
                  </div>
                  <Progress value={(loan.remainingAmount / loan.amount) * 100} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {loanApplications.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Loan Applications</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {loanApplications.map((application) => (
              <Card key={application.id}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <div>
                    <CardTitle className="text-sm font-medium capitalize">{application.type} Loan</CardTitle>
                    <CardDescription>Submitted on {new Date(application.createdAt).toLocaleDateString()}</CardDescription>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    application.status === "pending" ? "bg-yellow-100 text-yellow-800" :
                    application.status === "approved" ? "bg-green-100 text-green-800" :
                    "bg-red-100 text-red-800"
                  }`}>
                    {application.status}
                  </span>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="text-2xl font-bold">${application.amount.toLocaleString()}</div>
                    <div className="text-xs text-muted-foreground">
                      Term: {application.term / 12} years
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Purpose: {application.purpose}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Employment: {application.employmentStatus}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Loans; 