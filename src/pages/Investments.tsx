import React from "react";
import { useBanking } from "@/contexts/BankingContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, TrendingUp, TrendingDown, BarChart3, PieChart, LineChart, DollarSign } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

const Investments = () => {
  const { investments } = useBanking();

  // Calculate total portfolio value
  const totalPortfolioValue = investments.reduce((sum, inv) => sum + inv.value, 0);

  // Calculate total performance
  const totalPerformance = investments.reduce((sum, inv) => sum + inv.performance, 0) / investments.length;

  // Get investment icon based on type
  const getInvestmentIcon = (type: string) => {
    switch (type) {
      case "stock":
        return <LineChart className="h-6 w-6" />;
      case "etf":
        return <BarChart3 className="h-6 w-6" />;
      case "mutual_fund":
        return <PieChart className="h-6 w-6" />;
      case "bond":
        return <DollarSign className="h-6 w-6" />;
      default:
        return <BarChart3 className="h-6 w-6" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Investments</h1>
          <p className="text-muted-foreground">Manage your investment portfolio</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          New Investment
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Portfolio Value</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(totalPortfolioValue)}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overall Performance</CardTitle>
            {totalPerformance >= 0 ? (
              <TrendingUp className="h-4 w-4 text-green-500" />
            ) : (
              <TrendingDown className="h-4 w-4 text-red-500" />
            )}
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${totalPerformance >= 0 ? 'text-green-500' : 'text-red-500'}`}>
              {totalPerformance.toFixed(2)}%
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {investments.map(investment => (
          <Card key={investment.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div>
                <CardTitle className="text-lg">{investment.name}</CardTitle>
                <CardDescription className="capitalize">{investment.type.replace('_', ' ')}</CardDescription>
              </div>
              {getInvestmentIcon(investment.type)}
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Current Value</span>
                  <span className="font-medium">{formatCurrency(investment.value)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Initial Investment</span>
                  <span className="font-medium">{formatCurrency(investment.initialInvestment)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Performance</span>
                  <span className={`font-medium ${investment.performance >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                    {investment.performance.toFixed(2)}%
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Investments; 