import { useEffect,useState }
from "react";

import api from "../api/axios";

export default function BalancesTab(
  { groupId }
){

  const [balances,setBalances] =
  useState([]);

  const [summary,setSummary] =
    useState([]);

  useEffect(()=>{

    load();

  },[]);

  async function load(){

    const balancesRes =
      await api.get(
        `/groups/${groupId}/balances`
      );

    const summaryRes =
      await api.get(
        `/groups/${groupId}/balances/summary`
      );

    setBalances(
      balancesRes.data
    );

    setSummary(
      summaryRes.data
    );

  }

  return(

    <div className="space-y-6">

      <div className="bg-white p-6 rounded shadow">

        <h2 className="text-xl mb-4">
          Balances
        </h2>

        {balances.map(user => (

  <div
    key={user.userId}
    className="flex justify-between py-2 border-b"
  >

    <span>
      {user.name}
    </span>

    <span
      className={
        user.balance >= 0
          ? "text-green-600"
          : "text-red-600"
      }
    >
      ₹{Number(user.balance).toFixed(2)}
    </span>

  </div>

))}

      </div>

      <div className="bg-white p-6 rounded shadow">

        <h2 className="text-xl mb-4">
          Settlement Summary
        </h2>

        {summary.map(
          (item,index)=>(
            <div key={index}>
              {item.from}
              →
              {item.to}
              :
              ₹{item.amount}
            </div>
          )
        )}

      </div>

    </div>
  );
}