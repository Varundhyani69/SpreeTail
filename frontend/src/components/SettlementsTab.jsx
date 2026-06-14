import { useState }
from "react";

import api from "../api/axios";

export default function SettlementsTab(
  { groupId }
){

  const [payerId,setPayerId] =
    useState("");

  const [
    receiverId,
    setReceiverId
  ] = useState("");

  const [amount,setAmount] =
    useState("");

  async function create(){

    await api.post(
      `/groups/${groupId}/settlements`,
      {
        payerId,
        receiverId,
        amount
      }
    );

    alert(
      "Settlement created"
    );

  }

  return(

    <div className="bg-white p-6 rounded shadow">

      <h2 className="text-xl mb-4">
        Add Settlement
      </h2>

      <input
        placeholder="Payer ID"
        className="border p-2 w-full mb-3"
        onChange={e=>
          setPayerId(
            e.target.value
          )
        }
      />

      <input
        placeholder="Receiver ID"
        className="border p-2 w-full mb-3"
        onChange={e=>
          setReceiverId(
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
        onClick={create}
        className="bg-black text-white px-4 py-2 rounded"
      >
        Save
      </button>

    </div>
  );
}