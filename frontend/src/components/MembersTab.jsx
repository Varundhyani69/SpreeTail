import { useEffect,useState }
from "react";

import api from "../api/axios";

export default function MembersTab(
  { groupId }
){

  const [members,setMembers] =
    useState([]);

  useEffect(()=>{

    loadMembers();

  },[]);

  async function loadMembers(){

    const res =
      await api.get(
        `/groups/${groupId}/members`
      );

    setMembers(
      res.data
    );

  }

  return(

    <div className="bg-white p-6 rounded shadow">

      <h2 className="text-xl mb-4">
        Members
      </h2>

      {members.map(member=>(

        <div
          key={member.id}
          className="border-b py-2"
        >
          <div>
            {member.name}
          </div>

          <div className="text-sm text-gray-500">
            {member.email}
          </div>
        </div>

      ))}

    </div>
  );
}