import { useEffect } from "react";
import { useState } from "react";

import Navbar from "../components/Navbar";

import CreateGroupModal
from "../components/CreateGroupModal";

import api from "../api/axios";

export default function Dashboard() {

  const [groups,setGroups] =
    useState([]);

  const [showModal,setShowModal] =
    useState(false);

  useEffect(()=>{

    loadGroups();

  },[]);

  async function loadGroups() {

    try {

      const res =
        await api.get(
          "/groups"
        );

      setGroups(
        res.data
      );

    } catch(err) {

      console.log(err);

    }

  }

  return (

    <>
      <Navbar />

      <div className="max-w-5xl mx-auto p-8">

        <div className="flex justify-between mb-6">

          <h1 className="text-3xl font-semibold">
            Groups
          </h1>

          <button
            onClick={()=>
              setShowModal(true)
            }
            className="bg-black text-white px-4 py-2 rounded"
          >
            New Group
          </button>

        </div>

        <div className="grid gap-4">

          {groups.map(group=>(

            <a
              key={group.id}
              href={`/groups/${group.id}`}
              className="bg-white p-4 rounded-xl shadow border hover:shadow-md"
            >

              <h2 className="font-medium">
                {group.name}
              </h2>

            </a>

          ))}

        </div>

      </div>

      <CreateGroupModal
        open={showModal}
        onClose={()=>
          setShowModal(false)
        }
        reload={loadGroups}
      />

    </>
  );
}