import { useEffect,useState }
from "react";

import api from "../api/axios";
import Navbar from "../components/Navbar";

export default function Dashboard(){

  const [groups,setGroups] =
    useState([]);

  const [name,setName] =
    useState("");

  useEffect(()=>{

    loadGroups();

  },[]);

  async function loadGroups(){

    const res =
      await api.get("/groups");

    setGroups(res.data);

  }

  async function createGroup(){

    await api.post(
      "/groups",
      { name }
    );

    setName("");

    loadGroups();

  }

  return(

    <>
      <Navbar />

      <div className="max-w-4xl mx-auto p-8">

        <h1 className="text-3xl mb-6">
          Groups
        </h1>

        <div className="flex gap-2 mb-6">

          <input
            placeholder="Group name"
            className="border p-2 flex-1 rounded"
            value={name}
            onChange={e=>
              setName(e.target.value)
            }
          />

          <button
            onClick={createGroup}
            className="bg-black text-white px-4 rounded"
          >
            Create
          </button>

        </div>

        <div className="space-y-3">

          {groups.map(group=>(

            <a
              key={group.id}
              href={`/groups/${group.id}`}
              className="block bg-white p-4 rounded shadow"
            >
              {group.name}
            </a>

          ))}

        </div>

      </div>
    </>
  );
}