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

const {BigQuery} = require('@google-cloud/bigquery');
const {assert} = require('chai');
const {describe, it, before, after} = require('mocha');
const cp = require('child_process');
const uuid = require('uuid');

const execSync = cmd => cp.execSync(cmd, {encoding: 'utf-8'});

const generateUuid = () =>
  `nodejs-samples-tests-routines-${uuid.v4()}`.replace(/-/gi, '_');

const bigquery = new BigQuery();

describe('Routine', () => {
  let projectId;
  const datasetId = generateUuid();
  const routineId = generateUuid();
  const tableId = generateUuid();

  before(async () => {
    await bigquery.createDataset(datasetId);
    const [tableData] = await bigquery.dataset(datasetId).createTable(tableId);
    projectId = tableData.metadata.tableReference.projectId;
  });

  after(async () => {
    await bigquery
      .dataset(datasetId)
      .delete({force: true})
      .catch(console.warn);
  });

  it('should create routine via ddl', async () => {
    const output = execSync(
      `node ddlCreateRoutine.js ${projectId} ${datasetId} ${routineId}`
    );

    assert.include(output, `Routine ${routineId} created.`);
    const [exists] = await bigquery
      .dataset(datasetId)
      .routine(routineId)
      .exists();
    assert.strictEqual(exists, true);
  });

  it('should create routine.', async () => {
    const routineId = generateUuid();
    const output = execSync(`node createRoutine.js ${datasetId} ${routineId}`);

    assert.include(output, `Routine ${routineId} created.`);
    const [exists] = await bigquery
      .dataset(datasetId)
      .routine(routineId)
      .exists();
    assert.strictEqual(exists, true);
  });

  it('should retrieve a routine if it exists', async () => {
    const output = execSync(`node getRoutine.js ${datasetId} ${routineId}`);
    assert.include(output, 'Routine:');
    assert.include(output, datasetId && routineId);
  });

  it('should list routines', async () => {
    const output = execSync(`node listRoutines.js ${datasetId}`);
    assert.include(output, 'Routines:');
    assert.include(output, datasetId);
  });

  it("should update routine's metadata", async () => {
    const output = execSync(`node updateRoutine.js ${datasetId} ${routineId}`);
    assert.include(
      output,
      `${routineId} description: The perfect description!`
    );
  });

  it('should delete routine.', async () => {
    const output = execSync(`node deleteRoutine.js ${datasetId} ${routineId}`);

    assert.include(output, `Routine ${routineId} deleted.`);
    const [exists] = await bigquery
      .dataset(datasetId)
      .routine(routineId)
      .exists();
    assert.strictEqual(exists, false);
  });
});
