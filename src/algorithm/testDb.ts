import { faker } from "@faker-js/faker";
import { Types } from "mongoose"; // Correctly import ObjectId from Types

// Define an interface for the Expense data
interface Expense {
  user: string; // ObjectId as string
  category: string; // ObjectId as string
  name: string;
  totalUnit: number;
  price: number;
  date: Date;
}

// Function to generate test data
export const generateTestExpenses = (count: number): Expense[] => {
  // Predefined mock IDs for users and categories
  const mockUserIds = [
    new Types.ObjectId().toString(),
    new Types.ObjectId().toString(),
    new Types.ObjectId().toString(),
  ];
  const mockCategoryIds = [
    new Types.ObjectId().toString(),
    new Types.ObjectId().toString(),
    new Types.ObjectId().toString(),
  ];

  const expenses: Expense[] = [];

  for (let i = 0; i < count; i++) {
    expenses.push({
      user: mockUserIds[Math.floor(Math.random() * mockUserIds.length)], // Random user ID
      category: mockCategoryIds[Math.floor(Math.random() * mockCategoryIds.length)], // Random category ID
      name: faker.commerce.productName(),
      totalUnit: faker.number.int({ min: 1, max: 100 }),
      price: faker.number.float({ min: 5, max: 1000, fractionDigits: 2 }),
      date: faker.date.past({ years: 2 }), // Specify the number of years as part of an object
    });
  }

  return expenses;
};

