import React, { useEffect, useState } from "react";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { signOut } from "firebase/auth";
import { db, auth } from "../../firebase";
import ExpenseForm from "./ExpenseForm";
import ExpenseTable from "./ExpenseTable";

export default function Dashboard({ user }) {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    const q = query(
      collection(db, "expenses"),
      where("uid", "==", user.uid)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      setExpenses(snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })));
    });

    return () => unsubscribe();
  }, [user]);

  const total = expenses.reduce((sum, item) => sum + Number(item.amount), 0);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-8">

      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6 mb-8 flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold dark:text-white">
            Welcome, {user.email}
          </h2>
          <p className="text-gray-500 mt-1">
            Total Expenses:
            <span className="text-indigo-600 font-bold ml-2">
              ₹ {total}
            </span>
          </p>
        </div>

        <button
          onClick={() => signOut(auth)}
          className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg transition"
        >
          Logout
        </button>
      </div>

      {/* Form Card */}
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6 mb-8">
        <ExpenseForm user={user} />
      </div>

      {/* Table Card */}
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6">
        <ExpenseTable expenses={expenses} />
      </div>

    </div>
  );
}