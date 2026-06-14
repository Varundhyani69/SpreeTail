import { useEffect,useState }
from "react";

import api from "../api/axios";

export default function ExpensesTab(
  { groupId }
){

  const [expenses,setExpenses] =
    useState([]);

  const [title,setTitle] =
    useState("");

  const [amount,setAmount] =
    useState("");

  useEffect(()=>{

    loadExpenses();

  },[]);

  async function loadExpenses(){

    const res =
      await api.get(
        `/groups/${groupId}/expenses`
      );

    setExpenses(
      res.data
    );

  }

  async function createExpense(){

    await api.post(
      `/groups/${groupId}/expenses`,
      {
        title,
        amount,
        paidBy:"",
        expenseDate:
          new Date()
            .toISOString()
            .split("T")[0],

        splitType:"equal",

        participants:[]
      }
    );

    loadExpenses();
  }

  return(

    <div>

      <div className="bg-white p-6 rounded shadow mb-6">

        <h2 className="text-xl mb-4">
          Add Expense
        </h2>

        <input
          placeholder="Title"
          className="border p-2 w-full mb-3"
          onChange={e=>
            setTitle(
              e.target.value
            )
          }
        />

        <input
          placeholder="Amount"
          className="border p-2 w-full mb-3"
          onChange={e=>
            setAmount(
              e.target.value
            )
          }
        />

        <button
          onClick={createExpense}
          className="bg-black text-white px-4 py-2 rounded"
        >
          Save
        </button>

      </div>

      <div className="space-y-3">

        {expenses.map(expense=>(

          <div
            key={expense.id}
            className="bg-white p-4 rounded shadow"
          >

            <div>
              {expense.title}
            </div>

            <div>
              ₹{expense.amount}
            </div>

            <div className="text-sm text-gray-500">
              {expense.payer_name}
            </div>

          </div>

        ))}

      </div>

    </div>
  );
}