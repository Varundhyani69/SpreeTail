import { useEffect,useState }
from "react";

import api from "../api/axios";

export default function Dashboard(){

  const [groups,setGroups] =
    useState([]);

  useEffect(()=>{

    loadGroups();

  },[]);

  async function loadGroups(){

    const res =
      await api.get("/groups");

    setGroups(
      res.data
    );

  }

  return(
    <div className="max-w-4xl mx-auto p-8">

      <h1 className="text-3xl mb-6">
        Groups
      </h1>

      <div className="space-y-3">

        {groups.map(group=>(
          <a
            key={group.id}
            href={`/groups/${group.id}`}
            className="block bg-white p-4 rounded-lg shadow"
          >
            {group.name}
          </a>
        ))}

      </div>

    </div>
  );
}