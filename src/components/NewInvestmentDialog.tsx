import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus } from "lucide-react";

interface NewInvestmentDialogProps {
  onSubmit: (investment: {
    name: string;
    type: string;
    initialInvestment: number;
    value: number;
    performance: number;
  }) => void;
}

const NewInvestmentDialog = ({ onSubmit }: NewInvestmentDialogProps) => {
  const [open, setOpen] = React.useState(false);
  const [name, setName] = React.useState("");
  const [type, setType] = React.useState("");
  const [initialInvestment, setInitialInvestment] = React.useState("");
  const [value, setValue] = React.useState("");
  const [performance, setPerformance] = React.useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      name,
      type,
      initialInvestment: parseFloat(initialInvestment),
      value: parseFloat(value),
      performance: parseFloat(performance),
    });
    setOpen(false);
    setName("");
    setType("");
    setInitialInvestment("");
    setValue("");
    setPerformance("");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          New Investment
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Investment</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label>Investment Name</Label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter investment name"
              required
            />
          </div>
          <div className="space-y-2">
            <Label>Investment Type</Label>
            <Select value={type} onValueChange={setType} required>
              <SelectTrigger>
                <SelectValue placeholder="Select investment type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="stock">Stock</SelectItem>
                <SelectItem value="etf">ETF</SelectItem>
                <SelectItem value="mutual_fund">Mutual Fund</SelectItem>
                <SelectItem value="bond">Bond</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Initial Investment</Label>
            <Input
              type="number"
              value={initialInvestment}
              onChange={(e) => setInitialInvestment(e.target.value)}
              placeholder="Enter initial investment amount"
              required
            />
          </div>
          <div className="space-y-2">
            <Label>Current Value</Label>
            <Input
              type="number"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Enter current value"
              required
            />
          </div>
          <div className="space-y-2">
            <Label>Performance (%)</Label>
            <Input
              type="number"
              value={performance}
              onChange={(e) => setPerformance(e.target.value)}
              placeholder="Enter performance percentage"
              required
            />
          </div>
          <Button type="submit" className="w-full">
            Add Investment
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default NewInvestmentDialog; 