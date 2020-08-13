// Copyright 2020 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

'use strict';

function main(
  projectId = 'my_project_id',
  datasetId = 'my_dataset',
  routineId = 'my_routine'
) {
  // [START bigquery_create_routine_ddl]
  // Import the Google Cloud client library
  const {BigQuery} = require('@google-cloud/bigquery');
  const bigquery = new BigQuery();

  async function createRoutine() {
    // Creates a model named "my_model" from "my_dataset".

    /**
     * TODO(developer): Uncomment the following lines before running the sample
     */
    // const projectId = "my_project_id";
    // const datasetId = "my_dataset";
    // const routineId = "my_model";

    const query = `CREATE FUNCTION \`${projectId}.${datasetId}.${routineId}\`(
        arr ARRAY<STRUCT<name STRING, val INT64>>
      ) AS (
        (SELECT SUM(IF(elem.name = "foo",elem.val,null)) FROM UNNEST(arr) AS elem)
      )`;

    const queryOptions = {
      query: query,
    };

    // Run query to create a routine
    const [job] = await bigquery.createQueryJob(queryOptions);

    // Wait for the query to finish
    await job.getQueryResults();

    console.log(`Routine ${routineId} created.`);
  }
  // [END bigquery_create_routine_ddl]
  createRoutine();
}
main(...process.argv.slice(2));
