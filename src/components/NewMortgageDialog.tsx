import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus } from "lucide-react";

interface NewMortgageDialogProps {
  onSubmit: (mortgage: {
    propertyType: string;
    propertyValue: number;
    downPayment: number;
    term: number; // in years
    purpose: string;
    monthlyIncome: number;
    employmentStatus: string;
    creditScore: number;
  }) => void;
}

const NewMortgageDialog = ({ onSubmit }: NewMortgageDialogProps) => {
  const [open, setOpen] = React.useState(false);
  const [propertyType, setPropertyType] = React.useState("");
  const [propertyValue, setPropertyValue] = React.useState("");
  const [downPayment, setDownPayment] = React.useState("");
  const [term, setTerm] = React.useState("");
  const [purpose, setPurpose] = React.useState("");
  const [monthlyIncome, setMonthlyIncome] = React.useState("");
  const [employmentStatus, setEmploymentStatus] = React.useState("");
  const [creditScore, setCreditScore] = React.useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      propertyType,
      propertyValue: parseFloat(propertyValue),
      downPayment: parseFloat(downPayment),
      term: parseInt(term),
      purpose,
      monthlyIncome: parseFloat(monthlyIncome),
      employmentStatus,
      creditScore: parseInt(creditScore),
    });
    setOpen(false);
    setPropertyType("");
    setPropertyValue("");
    setDownPayment("");
    setTerm("");
    setPurpose("");
    setMonthlyIncome("");
    setEmploymentStatus("");
    setCreditScore("");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Apply for Mortgage
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Apply for a New Mortgage</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label>Property Type</Label>
            <Select value={propertyType} onValueChange={setPropertyType} required>
              <SelectTrigger>
                <SelectValue placeholder="Select property type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="single-family">Single Family Home</SelectItem>
                <SelectItem value="multi-family">Multi Family Home</SelectItem>
                <SelectItem value="condo">Condominium</SelectItem>
                <SelectItem value="townhouse">Townhouse</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Property Value</Label>
            <Input
              type="number"
              value={propertyValue}
              onChange={(e) => setPropertyValue(e.target.value)}
              placeholder="Enter property value"
              required
            />
          </div>
          <div className="space-y-2">
            <Label>Down Payment</Label>
            <Input
              type="number"
              value={downPayment}
              onChange={(e) => setDownPayment(e.target.value)}
              placeholder="Enter down payment amount"
              required
            />
          </div>
          <div className="space-y-2">
            <Label>Loan Term (years)</Label>
            <Select value={term} onValueChange={setTerm} required>
              <SelectTrigger>
                <SelectValue placeholder="Select loan term" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="15">15 years</SelectItem>
                <SelectItem value="20">20 years</SelectItem>
                <SelectItem value="30">30 years</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Purpose</Label>
            <Select value={purpose} onValueChange={setPurpose} required>
              <SelectTrigger>
                <SelectValue placeholder="Select purpose" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="primary-residence">Primary Residence</SelectItem>
                <SelectItem value="second-home">Second Home</SelectItem>
                <SelectItem value="investment">Investment Property</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Monthly Income</Label>
            <Input
              type="number"
              value={monthlyIncome}
              onChange={(e) => setMonthlyIncome(e.target.value)}
              placeholder="Enter your monthly income"
              required
            />
          </div>
          <div className="space-y-2">
            <Label>Employment Status</Label>
            <Select value={employmentStatus} onValueChange={setEmploymentStatus} required>
              <SelectTrigger>
                <SelectValue placeholder="Select employment status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="full-time">Full Time</SelectItem>
                <SelectItem value="part-time">Part Time</SelectItem>
                <SelectItem value="self-employed">Self Employed</SelectItem>
                <SelectItem value="retired">Retired</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Credit Score</Label>
            <Input
              type="number"
              value={creditScore}
              onChange={(e) => setCreditScore(e.target.value)}
              placeholder="Enter your credit score"
              min="300"
              max="850"
              required
            />
          </div>
          <Button type="submit" className="w-full">
            Submit Application
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default NewMortgageDialog; 