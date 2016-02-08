import Tracker from './tracker';
import Model from './model';

export module Tasks {
  'use strict';
  export function apply(tracker: Tracker) {
    return {
      previewTask: previewTask.bind(tracker),
      checkProtocolTask: checkProtocolTask.bind(tracker),
      validationTask: validationTask.bind(tracker),
      checkStorageTask: checkStorageTask.bind(tracker),
      historyImportTask: historyImportTask.bind(tracker),
      samplerTask: samplerTask.bind(tracker),
      buildHitTask: buildHitTask.bind(tracker),
      sendHitTask: sendHitTask.bind(tracker),
      timingTask: timingTask.bind(tracker)
    };
  }
  function previewTask(model: Model) {
  }
  function checkProtocolTask(model: Model) {
  }
  function validationTask(model: Model) {
  }
  function checkStorageTask(model: Model) {
  }
  function historyImportTask(model: Model) {
  }
  function samplerTask(model: Model) {
  }
  function buildHitTask(model: Model) {
  }
  function sendHitTask(model: Model) {
  }
  function timingTask(model: Model) {
  }
}
