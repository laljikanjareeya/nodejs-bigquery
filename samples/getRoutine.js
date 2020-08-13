// Copyright 2019 Google LLC
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

// sample-metadata:
//   title: BigQuery Get Routine
//   description: Retrieves an existing routine from a dataset.
//   usage: node getRoutine.js <DATASET_ID> <ROUTINE_ID>

function main(datasetId = 'my_dataset', routineId = 'my_routine') {
  // [START bigquery_get_routine]
  // Import the Google Cloud client library
  const {BigQuery} = require('@google-cloud/bigquery');
  const bigquery = new BigQuery();

  async function getRoutine() {
    // Retrieves routine named "my_routine" in "my_dataset".

    /**
     * TODO(developer): Uncomment the following lines before running the sample
     */
    // const datasetId = "my_dataset";
    // const routineId = "my_existing_rotine";

    const dataset = bigquery.dataset(datasetId);
    const [routine] = await dataset.routine(routineId).get();

    console.log('Routine:');
    console.log(routine.metadata.routineReference);
  }
  // [END bigquery_get_routine]
  getRoutine();
}
main(...process.argv.slice(2));
