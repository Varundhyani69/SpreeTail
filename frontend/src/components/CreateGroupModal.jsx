import { useState } from "react";
import api from "../api/axios";

export default function CreateGroupModal({
  open,
  onClose,
  reload
}) {

  const [name,setName] =
    useState("");

  if(!open) {
    return null;
  }

  async function createGroup() {

    await api.post(
      "/groups",
      {
        name
      }
    );

    reload();

    onClose();

  }

  return (

    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">

      <div className="bg-white p-6 rounded-xl w-96">

        <h2 className="text-xl mb-4">
          Create Group
        </h2>

        <input
          className="border p-2 w-full mb-4"
          placeholder="Group Name"
          onChange={e=>
            setName(e.target.value)
          }
        />

        <div className="flex justify-end gap-3">

          <button
            onClick={onClose}
          >
            Cancel
          </button>

          <button
            onClick={createGroup}
            className="bg-black text-white px-4 py-2 rounded"
          >
            Create
          </button>

        </div>

      </div>

    </div>
  );
}