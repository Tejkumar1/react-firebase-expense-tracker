import React from "react";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../firebase";

export default function ExpenseTable({ expenses }) {

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "expenses", id));
    } catch (error) {
      console.error("Error deleting:", error);
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-gray-200 dark:bg-gray-700 text-left">
            <th className="p-3">Date</th>
            <th className="p-3">Category</th>
            <th className="p-3">Description</th>
            <th className="p-3">Amount</th>
            <th className="p-3">Receipt</th>
            <th className="p-3">Action</th>
          </tr>
        </thead>

        <tbody>
          {expenses.length === 0 ? (
            <tr>
              <td
                colSpan="6"
                className="text-center p-6 text-gray-500"
              >
                No expenses added yet.
              </td>
            </tr>
          ) : (
            expenses.map((exp) => (
              <tr
                key={exp.id}
                className="border-b hover:bg-gray-100 dark:hover:bg-gray-700 transition"
              >
                <td className="p-3">{exp.date}</td>
                <td className="p-3">{exp.category}</td>
                <td className="p-3">{exp.description}</td>
                <td className="p-3 font-semibold text-indigo-600">
                  ₹ {exp.amount}
                </td>
                <td className="p-3">
                  {exp.receipt ? (
                    <a
                      href={exp.receipt}
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-500 underline"
                    >
                      View
                    </a>
                  ) : (
                    "-"
                  )}
                </td>
                <td className="p-3">
                  <button
                    onClick={() => handleDelete(exp.id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}