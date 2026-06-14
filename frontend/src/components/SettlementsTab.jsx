import { useState }
from "react";

import api from "../api/axios";

export default function SettlementsTab(
  { groupId }
){

  const [
    payerEmail,
    setPayerEmail
  ] = useState("");

  const [
    receiverEmail,
    setReceiverEmail
  ] = useState("");

  const [amount,setAmount] =
    useState("");

  const [
    settlementDate,
    setSettlementDate
  ] = useState(
    new Date()
      .toISOString()
      .split("T")[0]
  );

  const [notes,setNotes] =
    useState("");

  async function create(){

    try {

      await api.post(
        `/groups/${groupId}/settlements`,
        {
          payerEmail,
          receiverEmail,
          amount:
            Number(amount),
          settlementDate,
          notes
        }
      );

      alert(
        "Settlement created"
      );

      setPayerEmail("");
      setReceiverEmail("");
      setAmount("");
      setNotes("");

    } catch(error){

      alert(
        error.response?.data?.error
        || error.message
      );

    }

  }

  return(

    <div className="bg-white p-6 rounded-xl shadow">

      <h2 className="text-xl font-semibold mb-4">
        Add Settlement
      </h2>

      <input
        value={payerEmail}
        placeholder="Payer Email"
        className="border p-2 w-full mb-3 rounded"
        onChange={e=>
          setPayerEmail(
            e.target.value
          )
        }
      />

      <input
        value={receiverEmail}
        placeholder="Receiver Email"
        className="border p-2 w-full mb-3 rounded"
        onChange={e=>
          setReceiverEmail(
            e.target.value
          )
        }
      />

      <input
        type="number"
        value={amount}
        placeholder="Amount"
        className="border p-2 w-full mb-3 rounded"
        onChange={e=>
          setAmount(
            e.target.value
          )
        }
      />

      <input
        type="date"
        value={settlementDate}
        className="border p-2 w-full mb-3 rounded"
        onChange={e=>
          setSettlementDate(
            e.target.value
          )
        }
      />

      <textarea
        value={notes}
        placeholder="Notes (optional)"
        className="border p-2 w-full mb-4 rounded"
        rows={3}
        onChange={e=>
          setNotes(
            e.target.value
          )
        }
      />

      <button
        onClick={create}
        className="bg-black text-white px-4 py-2 rounded hover:opacity-90"
      >
        Create Settlement
      </button>

    </div>
  );
}