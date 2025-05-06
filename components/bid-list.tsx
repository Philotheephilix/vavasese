// components/bid-list.tsx
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "./ui/button";
type Bid = {
    amount: number;
    days: number;
    proposal: string;
    bidder: string;
    timestamp: Date;
    taskId: string;
  };
export function BidList({ bids }: { bids: Bid[] }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Bidder</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead>Timeframe</TableHead>
          <TableHead>Proposal</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {bids.map((bid, index) => (
          <TableRow key={index}>
            <TableCell>{bid.bidder}</TableCell>
            <TableCell>${bid.amount}</TableCell>
            <TableCell>{bid.days} days</TableCell>
            <TableCell className="max-w-[300px] truncate">{bid.proposal}</TableCell>
            <TableCell>
              <Button variant="outline" size="sm">
                Approve
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}