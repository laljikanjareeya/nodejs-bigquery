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
//   title: BigQuery Update Routine
//   description: Updates a routine's metadata.
//   usage: node updateRoutine.js <DATASET_ID> <ROUTINE_ID>

function main(datasetId = 'my_datset', routineId = 'my_routine') {
  // [START bigquery_update_routine]
  // Import the Google Cloud client library
  const {BigQuery} = require('@google-cloud/bigquery');
  const bigquery = new BigQuery();

  async function updateRoutine() {
    // Updates a routine's metadata.

    /**
     * TODO(developer): Uncomment the following lines before running the sample
     */
    // const datasetId = "my_dataset";
    // const routineId = "my_routine";

    const metadata = {
      description: 'The perfect description!',
    };

    const dataset = bigquery.dataset(datasetId);
    const [apiResponse] = await dataset
      .routine(routineId)
      .setMetadata(metadata);
    const newDescription = apiResponse.description;

    console.log('Routine updated successfully.');

    console.log(`${routineId} description: ${newDescription}`);
  }
  // [END bigquery_update_routine]
  updateRoutine().catch(console.error);
}
main(...process.argv.slice(2));
