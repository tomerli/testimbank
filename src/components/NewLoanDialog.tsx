import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus } from "lucide-react";

interface NewLoanDialogProps {
  onSubmit: (loan: {
    type: "personal" | "auto" | "student" | "mortgage";
    amount: number;
    term: number; // in months
    purpose: string;
    monthlyIncome: number;
    employmentStatus: string;
  }) => void;
}

const NewLoanDialog = ({ onSubmit }: NewLoanDialogProps) => {
  const [open, setOpen] = React.useState(false);
  const [type, setType] = React.useState("");
  const [amount, setAmount] = React.useState("");
  const [term, setTerm] = React.useState("");
  const [purpose, setPurpose] = React.useState("");
  const [monthlyIncome, setMonthlyIncome] = React.useState("");
  const [employmentStatus, setEmploymentStatus] = React.useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      type: type as "personal" | "auto" | "student" | "mortgage",
      amount: parseFloat(amount),
      term: parseInt(term),
      purpose,
      monthlyIncome: parseFloat(monthlyIncome),
      employmentStatus,
    });
    setOpen(false);
    setType("");
    setAmount("");
    setTerm("");
    setPurpose("");
    setMonthlyIncome("");
    setEmploymentStatus("");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Apply for Loan
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Apply for a New Loan</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label>Loan Type</Label>
            <Select value={type} onValueChange={setType} required>
              <SelectTrigger>
                <SelectValue placeholder="Select loan type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="personal">Personal Loan</SelectItem>
                <SelectItem value="auto">Auto Loan</SelectItem>
                <SelectItem value="student">Student Loan</SelectItem>
                <SelectItem value="mortgage">Mortgage</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Loan Amount</Label>
            <Input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter loan amount"
              required
            />
          </div>
          <div className="space-y-2">
            <Label>Loan Term (months)</Label>
            <Input
              type="number"
              value={term}
              onChange={(e) => setTerm(e.target.value)}
              placeholder="Enter loan term in months"
              required
            />
          </div>
          <div className="space-y-2">
            <Label>Purpose</Label>
            <Input
              value={purpose}
              onChange={(e) => setPurpose(e.target.value)}
              placeholder="Enter loan purpose"
              required
            />
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
                <SelectItem value="contract">Contract</SelectItem>
                <SelectItem value="self-employed">Self Employed</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button type="submit" className="w-full">
            Submit Application
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default NewLoanDialog; 