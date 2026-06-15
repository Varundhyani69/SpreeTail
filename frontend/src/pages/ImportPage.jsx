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

    }

  }

  async function approveAnomaly(
    anomalyId
  ){

    try{

      await api.patch(
        `/groups/${groupId}/imports/anomalies/${anomalyId}`,
        {
          approved:true
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

    }

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

              <h2 className="text-xl mb-4">
                Import Summary
              </h2>

              <div className="grid grid-cols-3 gap-4">

                <div className="border rounded p-4">

                  <div className="text-sm text-gray-500">
                    Status
                  </div>

                  <div>
                    {report.import?.status}
                  </div>

                </div>

                <div className="border rounded p-4">

                  <div className="text-sm text-gray-500">
                    File
                  </div>

                  <div>
                    {report.import?.filename}
                  </div>

                </div>

                <div className="border rounded p-4">

                  <div className="text-sm text-gray-500">
                    Anomalies
                  </div>

                  <div>
                    {report.anomalyCount}
                  </div>

                </div>

              </div>

            </div>

            {report.anomalies?.length > 0 && (

              <div className="bg-white rounded-xl shadow p-6 mb-8">

                <h2 className="text-xl mb-4">
                  Anomalies
                </h2>

                <div className="space-y-4">

                  {report.anomalies.map(
                    anomaly => (

                    <div
                      key={anomaly.id}
                      className="border rounded p-4"
                    >

                      <div className="font-medium">
                        {anomaly.anomaly_type}
                      </div>

                      <div>
                        {anomaly.description}
                      </div>

                      <div className="text-sm text-gray-500">
                        Row {anomaly.row_number}
                      </div>

                      <div className="mt-3">

                        {anomaly.approved ? (

                          <span className="text-green-600">
                            Approved
                          </span>

                        ) : (

                          <button
                            onClick={()=>
                              approveAnomaly(
                                anomaly.id
                              )
                            }
                            className="bg-black text-white px-3 py-1 rounded"
                          >
                            Approve
                          </button>

                        )}

                      </div>

                    </div>

                  ))}

                </div>

              </div>

            )}

            <div className="bg-white rounded-xl shadow p-6">

              <h2 className="text-xl mb-4">
                Execute Import
              </h2>

              <button
                onClick={executeImport}
                className="bg-green-600 text-white px-5 py-2 rounded"
              >
                Run Import
              </button>

            </div>

          </>
        )}

      </div>
    </>
  );
}