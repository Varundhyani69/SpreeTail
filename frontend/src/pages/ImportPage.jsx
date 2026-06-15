import {
  useState,
  useEffect
} from "react";

import api from "../api/axios";
import Navbar from "../components/Navbar";

export default function ImportPage(){

  const [groups,setGroups] =
    useState([]);

  const [groupId,setGroupId] =
    useState("");

  const [file,setFile] =
    useState(null);

  const [importId,setImportId] =
    useState("");

  const [report,setReport] =
    useState(null);

  const [loading,setLoading] =
    useState(false);
const [reportLoading,setReportLoading] =
  useState(false);

const [executeLoading,setExecuteLoading] =
  useState(false);
  useEffect(()=>{

    loadGroups();

  },[]);

  async function loadGroups(){

    try{

      const res =
        await api.get(
          "/groups"
        );

      setGroups(
        res.data
      );

    }catch(error){

      console.error(
        error
      );

    }

  }

  async function upload(){

    if(
      !groupId ||
      !file
    ){

      alert(
        "Select group and CSV file"
      );

      return;

    }

    try{

      setLoading(true);

      const formData =
        new FormData();

      formData.append(
        "file",
        file
      );

      const res =
        await api.post(
          `/groups/${groupId}/imports`,
          formData,
          {
            headers:{
              "Content-Type":
                "multipart/form-data"
            }
          }
        );

      const id =
        res.data.importId;

      setImportId(
        id
      );

      alert(
        `CSV uploaded.
Rows: ${res.data.rows}
Anomalies: ${res.data.anomalyCount}`
      );

    }catch(error){

      alert(
        error.response?.data?.error
        || error.message
      );

    }finally{

      setLoading(false);

    }

  }

  async function loadReport(){

  if(
    !groupId ||
    !importId
  ){

    alert(
      "Upload CSV first"
    );

    return;

  }

  try{

    setReportLoading(true);

    const res =
      await api.get(
        `/groups/${groupId}/imports/${importId}/report`
      );

    setReport(
      res.data
    );

  }catch(error){

    alert(
      error.response?.data?.error
      || error.message
    );

  }finally{

    setReportLoading(false);

  }

}

  async function updateAnomaly(
  anomalyId,
  action
){

  try{

    await api.patch(
      `/groups/${groupId}/imports/anomalies/${anomalyId}`,
      {
        action
      }
    );

    await loadReport();

  }catch(error){

    alert(
      error.response?.data?.error
      || error.message
    );

  }

}
  async function executeImport(){

  try{

    setExecuteLoading(true);

    await api.post(
      `/groups/${groupId}/imports/${importId}/execute`
    );

    alert(
      "Import executed successfully"
    );

    await loadReport();

  }catch(error){

    alert(
      error.response?.data?.error
      || error.message
    );

  }finally{

    setExecuteLoading(false);

  }

}
function downloadReport(){

  if(!report){
    return;
  }

  const blob =
    new Blob(
      [
        JSON.stringify(
          report,
          null,
          2
        )
      ],
      {
        type:
          "application/json"
      }
    );

  const url =
    URL.createObjectURL(
      blob
    );

  const a =
    document.createElement(
      "a"
    );

  a.href = url;

  a.download =
    `import-report-${importId}.json`;

  a.click();

  URL.revokeObjectURL(
    url
  );

}
  return(

    <>
      <Navbar />

      <div className="max-w-6xl mx-auto p-8">

        <h1 className="text-3xl font-semibold mb-8">
          CSV Import
        </h1>

        <div className="bg-white rounded-xl shadow p-6 mb-8">

          <h2 className="text-xl mb-4">
            Upload CSV
          </h2>

          <select
            value={groupId}
            onChange={e=>
              setGroupId(
                e.target.value
              )
            }
            className="border p-2 rounded w-full mb-4"
          >

            <option value="">
              Select Group
            </option>

            {groups.map(group=>(

              <option
                key={group.id}
                value={group.id}
              >
                {group.name}
              </option>

            ))}

          </select>

          <input
            type="file"
            accept=".csv"
            onChange={e=>
              setFile(
                e.target.files[0]
              )
            }
          />

          <div className="mt-4 flex gap-3">

            <button
              onClick={upload}
              className="bg-black text-white px-4 py-2 rounded"
            >
              Upload CSV
            </button>

            <button
              onClick={loadReport}
              className="border px-4 py-2 rounded"
            >
              Load Report
            </button>

          </div>

          {loading && (

            <div className="mt-4">
              Uploading...
            </div>

          )}

        </div>

        {importId && (

          <div className="bg-white rounded-xl shadow p-4 mb-8">

            <div className="font-semibold">
              Import ID
            </div>

            <div className="text-sm text-gray-500 break-all">
              {importId}
            </div>

          </div>

        )}

        {report && (

  <>

    <div className="bg-white rounded-xl shadow p-6 mb-8">

      <div className="flex justify-between items-center mb-4">

        <h2 className="text-xl font-semibold">
          Import Summary
        </h2>

        <button
          onClick={downloadReport}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Download Report
        </button>

      </div>

      <div className="grid md:grid-cols-4 gap-4">

        <div className="border rounded p-4">
          <div className="text-sm text-gray-500">
            Status
          </div>
          <div className="font-semibold">
            {report.import?.status}
          </div>
        </div>

        <div className="border rounded p-4">
          <div className="text-sm text-gray-500">
            File
          </div>
          <div className="font-semibold break-all">
            {report.import?.filename}
          </div>
        </div>

        <div className="border rounded p-4">
          <div className="text-sm text-gray-500">
            Anomalies
          </div>
          <div className="font-semibold">
            {report.anomalyCount}
          </div>
        </div>

        <div className="border rounded p-4">
          <div className="text-sm text-gray-500">
            Group
          </div>
          <div className="font-semibold text-xs break-all">
            {report.import?.group_id || "-"}
          </div>
        </div>

        <div className="border rounded p-4">
          <div className="text-sm text-gray-500">
            Processed Rows
          </div>
          <div className="font-semibold">
            {report.import?.processed_rows}
          </div>
        </div>

        <div className="border rounded p-4">
          <div className="text-sm text-gray-500">
            Imported Expenses
          </div>
          <div className="font-semibold">
            {report.import?.imported_expenses}
          </div>
        </div>

        <div className="border rounded p-4">
          <div className="text-sm text-gray-500">
            Imported Settlements
          </div>
          <div className="font-semibold">
            {report.import?.imported_settlements}
          </div>
        </div>

        <div className="border rounded p-4">
          <div className="text-sm text-gray-500">
            Skipped Rows
          </div>
          <div className="font-semibold">
            {report.import?.skipped_rows}
          </div>
        </div>

      </div>

    </div>

    <div className="bg-white rounded-xl shadow p-6 mb-8 overflow-x-auto">

      <h2 className="text-xl font-semibold mb-4">
        Import Report
      </h2>

      {report.anomalies?.length === 0 ? (

        <div className="text-gray-500">
          No anomalies detected.
        </div>

      ) : (

        <table className="w-full border-collapse">

          <thead>

            <tr className="border-b bg-gray-50">

              <th className="text-left p-3">
                Row
              </th>

              <th className="text-left p-3">
                Type
              </th>

              <th className="text-left p-3">
                Description
              </th>

              <th className="text-left p-3">
                Suggested Action
              </th>

              <th className="text-left p-3">
                Action Taken
              </th>

              <th className="text-left p-3">
                Status
              </th>

              <th className="text-left p-3">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {report.anomalies.map(
              anomaly => (

              <tr
                key={anomaly.id}
                className="border-b"
              >

                <td className="p-3">
                  {anomaly.row_number}
                </td>

                <td className="p-3">
                  {anomaly.anomaly_type}
                </td>

                <td className="p-3">
                  {anomaly.description}
                </td>

                <td className="p-3">
                  {anomaly.suggested_action || "-"}
                </td>

                <td className="p-3">

                  {anomaly.action_taken ? (

                    <span className="font-medium">
                      {anomaly.action_taken}
                    </span>

                  ) : (

                    "-"
                  )}

                </td>

                <td className="p-3">

                  {anomaly.resolved_at ? (

                    <span className="text-green-600 font-medium">
                      Resolved
                    </span>

                  ) : (

                    <span className="text-yellow-600 font-medium">
                      Pending
                    </span>

                  )}

                </td>

                <td className="p-3">

                  {!anomaly.resolved_at && (

                    <div className="flex gap-2">

                      <button
                        onClick={() =>
                          updateAnomaly(
                            anomaly.id,
                            "APPROVE"
                          )
                        }
                        className="bg-green-600 text-white px-2 py-1 rounded text-sm"
                      >
                        Approve
                      </button>

                      <button
                        onClick={() =>
                          updateAnomaly(
                            anomaly.id,
                            "SKIP"
                          )
                        }
                        className="bg-yellow-500 text-white px-2 py-1 rounded text-sm"
                      >
                        Skip
                      </button>

                      <button
                        onClick={() =>
                          updateAnomaly(
                            anomaly.id,
                            "REJECT"
                          )
                        }
                        className="bg-red-600 text-white px-2 py-1 rounded text-sm"
                      >
                        Reject
                      </button>

                    </div>

                  )}

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      )}

    </div>

    <div className="bg-white rounded-xl shadow p-6">

      <h2 className="text-xl font-semibold mb-4">
        Execute Import
      </h2>

      <button
        disabled={executeLoading}
        onClick={executeImport}
        className="
          bg-green-600
          text-white
          px-5
          py-2
          rounded
          disabled:opacity-50
        "
      >
        {
          executeLoading
          ? "Executing..."
          : "Run Import"
        }
      </button>

      {executeLoading && (

        <div className="mt-3 text-gray-500">
          Processing import...
        </div>

      )}

    </div>

  </>

)}

      </div>
    </>
  );
}