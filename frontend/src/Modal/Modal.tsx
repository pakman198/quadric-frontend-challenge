import * as React from 'react';
import { JobTrace } from '../JobTrace';

import { ACTION, ExtendedJob, Job, Trace, Workflow, WorkflowAction } from '../types';

type ModalProps = {
  flow: Workflow
  jobs: Job[]
  traces: Trace[]
  dispatch: (action: WorkflowAction) => void
}

export const Modal = ({ flow, jobs, traces, dispatch }: ModalProps) => {
  const handleClick = () => {
    dispatch({ type: ACTION.SET_CURRENT_FLOW, payload: null })
  }

  /* 
    - get jobs for a given workflow,
    - find traces for a job
    - generate the details card to be displayed in the modal
  */ 
  const cards = jobs
  .filter(j => j.workflow_id === flow.id)
  .reduce<any>((acc, job) => {
    const trace = traces.find(t => t.job_id === job.id);
    
    if(trace) {
      acc.push({ ...job, trace })
    }

    return acc;
  }, []).map((data: ExtendedJob) => {
    return <JobTrace key={`${data.workflow_id}-${data.id}`} trace={data} />
  });

  return (
    <>
      <div className="modal d-block" tabIndex={-1}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Workflow {flow.id}</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={handleClick}/>
            </div>
            <div className="modal-body">
              {cards}
            </div>
          </div>
        </div>
      </div>
      <div className="modal-backdrop fade show"></div>
    </>
  )
}