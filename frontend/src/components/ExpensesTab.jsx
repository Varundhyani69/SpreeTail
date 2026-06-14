import { useEffect, useState } from "react";
import api from "../api/axios";

export default function ExpensesTab({ groupId }) {

  const [expenses, setExpenses] =
    useState([]);

  const [members, setMembers] =
    useState([]);

  const [title, setTitle] =
    useState("");

  const [amount, setAmount] =
    useState("");

  const [paidBy, setPaidBy] =
    useState("");

  const [expenseDate, setExpenseDate] =
    useState(
      new Date()
        .toISOString()
        .split("T")[0]
    );

  const [splitType, setSplitType] =
    useState("equal");

  const [participantIds, setParticipantIds] =
    useState([]);

  useEffect(() => {

    loadExpenses();
    loadMembers();

  }, [groupId]);

  async function loadExpenses() {

    const res =
      await api.get(
        `/groups/${groupId}/expenses`
      );

    setExpenses(
      res.data
    );

  }

  async function loadMembers() {

    const res =
      await api.get(
        `/groups/${groupId}/members`
      );

    setMembers(
      res.data
    );

  }

  function toggleParticipant(userId) {

    if (
      participantIds.includes(userId)
    ) {

      setParticipantIds(
        participantIds.filter(
          id => id !== userId
        )
      );

      return;
    }

    setParticipantIds([
      ...participantIds,
      userId
    ]);

  }

  async function createExpense() {

    if (
      !title ||
      !amount ||
      !paidBy ||
      participantIds.length === 0
    ) {

      alert(
        "Fill all fields"
      );

      return;
    }

    const participants =
      participantIds.map(
        id => ({
          userId: id
        })
      );

    await api.post(
      `/groups/${groupId}/expenses`,
      {
        title,
        amount:
          Number(amount),
        paidBy,
        expenseDate,
        splitType,
        participants
      }
    );

    setTitle("");
    setAmount("");
    setParticipantIds([]);

    await loadExpenses();

  }

  return (

    <div className="space-y-6">

      {/* Add Expense */}

      <div className="bg-white p-6 rounded-xl shadow">

        <h2 className="text-xl font-semibold mb-4">
          Add Expense
        </h2>

        <div className="grid md:grid-cols-2 gap-4">

          <input
            value={title}
            onChange={e =>
              setTitle(
                e.target.value
              )
            }
            placeholder="Title"
            className="border rounded p-2"
          />

          <input
            type="number"
            value={amount}
            onChange={e =>
              setAmount(
                e.target.value
              )
            }
            placeholder="Amount"
            className="border rounded p-2"
          />

          <select
            value={paidBy}
            onChange={e =>
              setPaidBy(
                e.target.value
              )
            }
            className="border rounded p-2"
          >

            <option value="">
              Select Payer
            </option>

            {members.map(member => (

              <option
                key={member.id}
                value={member.id}
              >
                {member.name}
              </option>

            ))}

          </select>

          <input
            type="date"
            value={expenseDate}
            onChange={e =>
              setExpenseDate(
                e.target.value
              )
            }
            className="border rounded p-2"
          />

          <select
            value={splitType}
            onChange={e =>
              setSplitType(
                e.target.value
              )
            }
            className="border rounded p-2"
          >

            <option value="equal">
              Equal
            </option>

            <option value="percentage">
              Percentage
            </option>

            <option value="exact">
              Exact
            </option>

            <option value="shares">
              Shares
            </option>

          </select>

        </div>

        <div className="mt-5">

          <h3 className="font-medium mb-2">
            Participants
          </h3>

          <div className="grid md:grid-cols-2 gap-2">

            {members.map(member => (

              <label
                key={member.id}
                className="flex items-center gap-2"
              >

                <input
                  type="checkbox"
                  checked={
                    participantIds.includes(
                      member.id
                    )
                  }
                  onChange={() =>
                    toggleParticipant(
                      member.id
                    )
                  }
                />

                {member.name}

              </label>

            ))}

          </div>

        </div>

        <button
          onClick={createExpense}
          className="mt-5 bg-black text-white px-4 py-2 rounded"
        >
          Create Expense
        </button>

      </div>

      {/* Expense List */}

      <div className="bg-white p-6 rounded-xl shadow">

        <h2 className="text-xl font-semibold mb-4">
          Expenses
        </h2>

        <div className="space-y-3">

          {expenses.map(expense => (

            <div
              key={expense.id}
              className="border rounded p-4"
            >

              <div className="font-medium">
                {expense.title}
              </div>

              <div>
                ₹{expense.amount}
              </div>

              <div className="text-sm text-gray-500">
                Paid by {expense.payer_name}
              </div>

              <div className="text-sm text-gray-500">
                {new Date(
                  expense.expense_date
                ).toLocaleDateString()}
              </div>

              <div className="text-sm text-gray-500 capitalize">
                {expense.split_type}
              </div>

            </div>

          ))}

          {expenses.length === 0 && (
            <p className="text-gray-500">
              No expenses found.
            </p>
          )}

        </div>

      </div>

    </div>
  );
}