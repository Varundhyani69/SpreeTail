import { useState } from "react";
import { useParams } from "react-router-dom";

import Navbar from "../components/Navbar";
import MembersTab from "../components/MembersTab";
import ExpensesTab from "../components/ExpensesTab";
import BalancesTab from "../components/BalancesTab";
import SettlementsTab from "../components/SettlementsTab";

export default function GroupDetails(){

  const { groupId } =
    useParams();

  const [tab,setTab] =
    useState("members");

  return(
    <>
      <Navbar />

      <div className="max-w-6xl mx-auto p-8">

        <div className="flex gap-3 mb-6">

          <button
            onClick={()=>setTab("members")}
            className="border px-4 py-2 rounded"
          >
            Members
          </button>

          <button
            onClick={()=>setTab("expenses")}
            className="border px-4 py-2 rounded"
          >
            Expenses
          </button>

          <button
            onClick={()=>setTab("balances")}
            className="border px-4 py-2 rounded"
          >
            Balances
          </button>

          <button
            onClick={()=>setTab("settlements")}
            className="border px-4 py-2 rounded"
          >
            Settlements
          </button>

        </div>

        {tab==="members" &&
          <MembersTab
            groupId={groupId}
          />
        }

        {tab==="expenses" &&
          <ExpensesTab
            groupId={groupId}
          />
        }

        {tab==="balances" &&
          <BalancesTab
            groupId={groupId}
          />
        }

        {tab==="settlements" &&
          <SettlementsTab
            groupId={groupId}
          />
        }

      </div>
    </>
  );
}