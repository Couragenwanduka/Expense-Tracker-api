import { generateTestExpenses } from "./testDb";

interface Expense {
  user: string;
  category: string;
  name: string;
  totalUnit: number;
  price: number;
  date: Date;
}

export const algorithm = async (data:any) => {
  try {
   
    // Step 1: Group data by category
    const sortedData: Record<string, Expense[]> = {};
    data.forEach((expense:any) => {
      const category = expense.category;
      if (!sortedData[category]) {
        sortedData[category] = [];
      }
      sortedData[category].push(expense);
    });

    // Step 2: Sort each category's expenses by date (most recent first)
    const sortedByDate: Record<string, Expense[]> = {};
    Object.entries(sortedData).forEach(([category, categoryExpenses]) => {
      categoryExpenses.sort((a, b) => b.date.getTime() - a.date.getTime());
      sortedByDate[category] = categoryExpenses;
    });

    // Step 3: Calculate total price by category
    const totalPriceByCategory: Record<string, number> = {};
    Object.entries(sortedByDate).forEach(([category, expenses]) => {
      totalPriceByCategory[category] = expenses.reduce((sum, expense) => sum + expense.price, 0);
    });

    // Step 4: Find the highest spending category
    let highestSpendingCategory = "";
    let highestSpendingAmount = 0;
    Object.entries(totalPriceByCategory).forEach(([category, totalPrice]) => {
      if (totalPrice > highestSpendingAmount) {
        highestSpendingCategory = category;
        highestSpendingAmount = totalPrice;
      }
    });

    // Step 5: Find the item with the highest price per category
    const highestItemPerCategory: Record<string, Expense> = {};
    Object.entries(sortedByDate).forEach(([category, items]) => {
      const highestItem = items.reduce(
        (maxItem, item) => (item.price > maxItem.price ? item : maxItem),
        items[0]
      );
      highestItemPerCategory[category] = highestItem;
    });

     // Step 6: Group data by month (year-month)
     const sortedByMonth: Record<string, Record<string, Expense[]>> = {};
     Object.entries(sortedData).forEach(([category, items]) => {
       items.forEach((expense) => {
         const yearMonth = `${expense.date.getFullYear()}-${(expense.date.getMonth() + 1).toString().padStart(2, "0")}`;
         if (!sortedByMonth[category]) {
           sortedByMonth[category] = {};
         }
         if (!sortedByMonth[category][yearMonth]) {
           sortedByMonth[category][yearMonth] = [];
         }
         sortedByMonth[category][yearMonth].push(expense);
       });
     });
 
     // Step 7: Calculate total price per month and category
     const monthlyTotalPrice: Record<string, Record<string, number>> = {}; // Category -> Year-Month -> Total Price
     Object.entries(sortedByMonth).forEach(([category, months]) => {
       monthlyTotalPrice[category] = {};
       Object.entries(months).forEach(([month, expenses]) => {
         monthlyTotalPrice[category][month] = expenses.reduce((sum, expense) => sum + expense.price, 0);
       });
     });
 
     // Step 8: Calculate trend (percentage change month-over-month)
     const spendingTrends: Record<string, Record<string, { trend: string, totalPrice: number }>> = {}; // Category -> Year-Month -> Trend (% change, total price)
    Object.entries(monthlyTotalPrice).forEach(([category, months]) => {
      spendingTrends[category] = {};
      let lastMonthPrice = 0;
      Object.entries(months).forEach(([month, totalPrice]) => {
        const trend = lastMonthPrice === 0 ? 0 : ((totalPrice - lastMonthPrice) / lastMonthPrice) * 100;
        const trendLabel = trend >= 0 ? `Increase: ${trend.toFixed(2)}%` : `Decrease: ${Math.abs(trend).toFixed(2)}%`;
        spendingTrends[category][month] = { trend: trendLabel, totalPrice };
        lastMonthPrice = totalPrice;
      });
    });
 
    // Return results for further use if needed
    return {
    //   sortedByDate,
      totalPriceByCategory,
      highestSpendingCategory,
      highestSpendingAmount,
      highestItemPerCategory,
      monthlyTotalPrice,
      spendingTrends
    };
  } catch (error) {
    console.error("Error calculating feedback", error);
    return null;
  }
};
