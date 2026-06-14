import { useState }
from "react";

import api
from "../api/axios";

export default function ImportPage(){

  const [file,setFile] =
    useState();

  const [report,setReport] =
    useState();

  async function upload(){

    const form =
      new FormData();

    form.append(
      "file",
      file
    );

    const res =
      await api.post(
        "/imports/upload",
        form
      );

    setReport(
      res.data
    );

  }

  return(

    <div className="max-w-4xl mx-auto p-8">

      <h1 className="text-3xl mb-6">

        CSV Import

      </h1>

      <input
        type="file"
        onChange={e=>
          setFile(
            e.target.files[0]
          )
        }
      />

      <button
        onClick={upload}
        className="ml-4 px-4 py-2 bg-black text-white rounded"
      >
        Upload
      </button>

      {report && (

        <pre className="mt-6 bg-white p-4 rounded shadow overflow-auto">

          {
            JSON.stringify(
              report,
              null,
              2
            )
          }

        </pre>

      )}

    </div>

  );
}