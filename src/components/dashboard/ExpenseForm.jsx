import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../firebase";

export default function ExpenseForm({ user }) {
  const [date, setDate] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [receipt, setReceipt] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!date || !category || !description || !amount) {
      alert("Please fill all fields");
      return;
    }

    try {
      await addDoc(collection(db, "expenses"), {
        uid: user.uid,
        date,
        category,
        description,
        amount: Number(amount),
        receipt,
        createdAt: new Date(),
      });

      // Clear form
      setDate("");
      setCategory("");
      setDescription("");
      setAmount("");
      setReceipt("");

    } catch (error) {
      console.error("Error adding expense:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="grid md:grid-cols-4 gap-4 items-end"
    >
      <div>
        <label className="block text-sm font-medium mb-1 dark:text-white">
          Date
        </label>
        <input
          type="date"
          className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1 dark:text-white">
          Category
        </label>
        <input
          type="text"
          placeholder="Food / Travel / Bills"
          className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1 dark:text-white">
          Description
        </label>
        <input
          type="text"
          placeholder="Short note..."
          className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1 dark:text-white">
          Amount (₹)
        </label>
        <input
          type="number"
          placeholder="Enter amount"
          className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>

      <div className="md:col-span-3">
        <label className="block text-sm font-medium mb-1 dark:text-white">
          Receipt URL (optional)
        </label>
        <input
          type="text"
          placeholder="Paste receipt link..."
          className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
          value={receipt}
          onChange={(e) => setReceipt(e.target.value)}
        />
      </div>

      <div>
        <button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition shadow-md"
        >
          Add Expense
        </button>
      </div>
    </form>
  );
}