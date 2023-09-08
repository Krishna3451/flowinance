import { EXPENSES_CATEGORIES } from "@/lib/categories";
import { AppContext } from "@/lib/context";
import { roundToTwoDecimal } from "@/lib/utils";
import { useContext } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../ui/table";
import { DashboardCard } from "../ui/dashboard-card";

type ExpenseCategory = {
  name: string;
  value: number;
};

export function ExpensesTable() {
  const { transactions } = useContext(AppContext);

  const categoriesWithTotalExpenses = EXPENSES_CATEGORIES.map((category) => {
    const totalForCategory = transactions
      .filter((transaction) => transaction.category === category)
      .reduce((acc, curr) => acc + curr.amount, 0);

    const totalForCategoryRounded = roundToTwoDecimal(totalForCategory);

    return totalForCategoryRounded !== 0
      ? { name: category, value: totalForCategoryRounded }
      : null;
  })
    .filter((item): item is ExpenseCategory => item !== null)
    .sort((a, b) => b.value - a.value);

  return (
    <DashboardCard title="Expenses by categories">
      <Table key="expenses-table">
        <TableHeader>
          <TableRow>
            <TableHead className="p-2">Category</TableHead>
            <TableHead className="p-2 pl-8">Amount</TableHead>
          </TableRow>
        </TableHeader>
        {categoriesWithTotalExpenses.map(
          (item: ExpenseCategory, index: number) => (
            <TableBody key={index}>
              <TableRow key={index}>
                <TableCell className="p-2" key={index}>
                  {item.name}
                </TableCell>
                <TableCell className="p-2 pl-8">{item.value}€</TableCell>
              </TableRow>
            </TableBody>
          )
        )}
      </Table>
    </DashboardCard>
  );
}