import { useState } from "react";
import api from "../api/axios";
import Navbar from "../components/Navbar";

export default function ImportPage(){

  const [file,setFile] =
    useState(null);

  const [importId,setImportId] =
    useState("");

  const [report,setReport] =
    useState(null);

  const [loading,setLoading] =
    useState(false);

  async function upload(){

    if(!file){
      return;
    }

    setLoading(true);

    const formData =
      new FormData();

    formData.append(
      "file",
      file
    );

    const res =
      await api.post(
        "/imports",
        formData,
        {
          headers:{
            "Content-Type":
              "multipart/form-data"
          }
        }
      );

    const id =
      res.data.importId ||
      res.data.id;

    setImportId(id);

    alert(
      "CSV uploaded"
    );

    setLoading(false);

  }

  async function loadReport(){

    if(!importId){
      return;
    }

    const res =
      await api.get(
        `/imports/${importId}/report`
      );

    setReport(
      res.data
    );

  }

  async function approveAnomaly(
    anomalyId
  ){

    await api.patch(
      `/imports/anomalies/${anomalyId}`,
      {
        approved:true
      }
    );

    loadReport();

  }

  async function executeImport(){

    await api.post(
      `/imports/${importId}/execute`
    );

    alert(
      "Import executed"
    );

    loadReport();

  }

  return(

    <>
      <Navbar />

      <div className="max-w-6xl mx-auto p-8">

        <h1 className="text-3xl font-semibold mb-8">
          CSV Import
        </h1>

        {/* Upload */}

        <div className="bg-white rounded-xl shadow p-6 mb-8">

          <h2 className="text-xl mb-4">
            Upload CSV
          </h2>

          <input
            type="file"
            accept=".csv"
            onChange={(e)=>
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
              Upload
            </button>

            <button
              onClick={loadReport}
              className="border px-4 py-2 rounded"
            >
              Load Report
            </button>

          </div>

          {loading &&
            <p className="mt-4">
              Uploading...
            </p>
          }

        </div>

        {/* Import ID */}

        {importId && (

          <div className="bg-white rounded-xl shadow p-4 mb-8">

            <div className="font-medium">
              Import ID
            </div>

            <div className="text-sm text-gray-500 break-all">
              {importId}
            </div>

          </div>

        )}

        {/* Report */}

        {report && (

          <>

            {/* Summary */}

            <div className="bg-white rounded-xl shadow p-6 mb-8">

              <h2 className="text-xl mb-4">
                Import Summary
              </h2>

              <pre className="text-sm overflow-auto">
                {JSON.stringify(
                  report,
                  null,
                  2
                )}
              </pre>

            </div>

            {/* Anomalies */}

            {report.anomalies &&
            report.anomalies.length > 0 && (

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

                      <div>
                        <strong>
                          {anomaly.anomaly_type}
                        </strong>
                      </div>

                      <div>
                        {anomaly.description}
                      </div>

                      <div className="text-sm text-gray-500">
                        Row:
                        {" "}
                        {anomaly.row_number}
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

            {/* Execute */}

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