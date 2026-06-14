import { useEffect, useState } from "react";
import api from "../api/axios";

export default function MembersTab(
  { groupId }
) {

  const [members, setMembers] =
    useState([]);

  const [email, setEmail] =
    useState("");

  const [joinedAt, setJoinedAt] =
    useState(
      new Date()
        .toISOString()
        .split("T")[0]
    );

  useEffect(() => {

    loadMembers();

  }, [groupId]);

  async function loadMembers() {

    const res =
      await api.get(
        `/groups/${groupId}/members`
      );

    setMembers(
      res.data
    );

  }

  async function addMember() {

    try {

      await api.post(
        `/groups/${groupId}/members`,
        {
          email,
          joinedAt
        }
      );

      setEmail("");

      loadMembers();

    } catch (error) {

      alert(
        error.response?.data?.error ||
        "Failed to add member"
      );

    }

  }

  async function leaveGroup(
    userId
  ) {

    const leftAt =
      new Date()
        .toISOString()
        .split("T")[0];

    await api.patch(
      `/groups/${groupId}/members/${userId}/leave`,
      {
        leftAt
      }
    );

    loadMembers();

  }

  return (

    <div className="space-y-6">

      <div className="bg-white p-6 rounded-xl shadow">

        <h2 className="text-xl font-semibold mb-4">
          Add Member
        </h2>

        <div className="flex gap-3">

          <input
            type="email"
            placeholder="Member email"
            value={email}
            onChange={e =>
              setEmail(
                e.target.value
              )
            }
            className="flex-1 border rounded p-2"
          />

          <input
            type="date"
            value={joinedAt}
            onChange={e =>
              setJoinedAt(
                e.target.value
              )
            }
            className="border rounded p-2"
          />

          <button
            onClick={addMember}
            className="bg-black text-white px-4 py-2 rounded"
          >
            Add
          </button>

        </div>

      </div>

      <div className="bg-white p-6 rounded-xl shadow">

        <h2 className="text-xl font-semibold mb-4">
          Members
        </h2>

        <div className="space-y-3">

          {members.map(member => (

            <div
              key={member.id}
              className="flex justify-between items-center border rounded p-3"
            >

              <div>

                <div className="font-medium">
                  {member.name}
                </div>

                <div className="text-sm text-gray-500">
                  {member.email}
                </div>

                <div className="text-xs text-gray-400">
                  Joined:
                  {" "}
                  {new Date(
                    member.joined_at
                  ).toLocaleDateString()}
                </div>

                {member.left_at && (

                  <div className="text-xs text-red-500">

                    Left:
                    {" "}
                    {new Date(
                      member.left_at
                    ).toLocaleDateString()}

                  </div>

                )}

              </div>

              {!member.left_at && (

                <button
                  onClick={() =>
                    leaveGroup(
                      member.id
                    )
                  }
                  className="text-red-500"
                >
                  Leave
                </button>

              )}

            </div>

          ))}

        </div>

      </div>

    </div>

  );

}