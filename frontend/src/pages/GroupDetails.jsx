import {
  useEffect,
  useState
}
from "react";

import {
  useParams
}
from "react-router-dom";

import api
from "../api/axios";

export default function GroupDetails(){

  const {groupId} =
    useParams();

  const [members,setMembers] =
    useState([]);

  const [balances,setBalances] =
    useState({});

  useEffect(()=>{

    load();

  },[]);

  async function load(){

    const m =
      await api.get(
        `/groups/${groupId}/members`
      );

    const b =
      await api.get(
        `/groups/${groupId}/balances`
      );

    setMembers(m.data);

    setBalances(b.data);

  }

  return(

    <div className="max-w-5xl mx-auto p-8">

      <h1 className="text-3xl mb-6">
        Group
      </h1>

      <div className="grid md:grid-cols-2 gap-6">

        <div>

          <h2 className="mb-2">
            Members
          </h2>

          {members.map(member=>(
            <div
              key={member.id}
              className="bg-white p-3 mb-2 rounded shadow"
            >
              {member.name}
            </div>
          ))}

        </div>

        <div>

          <h2 className="mb-2">
            Balances
          </h2>

          {
            Object.entries(
              balances
            ).map(
              ([id,balance])=>(
                <div
                  key={id}
                  className="bg-white p-3 mb-2 rounded shadow"
                >
                  {id} :
                  ₹{balance}
                </div>
              )
            )
          }

        </div>

      </div>

    </div>

  );
}