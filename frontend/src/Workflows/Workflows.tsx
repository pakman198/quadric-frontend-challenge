import * as React from 'react';

import { Flow } from '../Flow';
import { Modal } from '../Modal';
import { DEFAULT_STATE, workflowReducer, initializer } from '../reducers/workflowReducer';

import { ACTION } from '../types';




export const Workflows = () => {
  const [state, dispatch] = React.useReducer(workflowReducer, DEFAULT_STATE, initializer);

  React.useEffect(() => {
    // console.log({ state })
    const fetchWorkflows = async () => {
      try {
        const p1 = await fetch('/workflows');
        const workflows = await p1.json();
        const p2 = await fetch('/jobs');
        const jobs = await p2.json();
        const p3 = await fetch('/traces');
        const traces = await p3.json();

        localStorage.setItem('quadric-workflows', JSON.stringify(workflows))
        localStorage.setItem('quadric-jobs', JSON.stringify(jobs))
        localStorage.setItem('quadric-traces', JSON.stringify(traces))

        dispatch({ type: ACTION.SET_FLOWS, payload: workflows })
        dispatch({ type: ACTION.SET_JOBS, payload: jobs })
        dispatch({ type: ACTION.SET_TRACES, payload: traces })
      } catch(e) {
        dispatch({ type: ACTION.SET_ERROR })
      }
    }

    if(state.flows.length === 0) {
      console.log("fetching data")
      fetchWorkflows()
    }
  }, []);

  React.useEffect(() => {
    const body: HTMLBodyElement = document.getElementsByTagName('body')[0];

    // if(!state.currentFlow) {  
      body.classList.toggle('modal-open')
    // }


  }, [state.currentFlow])

  if(state.error) {
    return (
      <div className='alert alert-danger'>There was an error while trying to fetch the data.</div>
    )
  }

  const flows = state.flows.map(f => {
    return (
      <Flow key ={f.id} data={f} jobs={state.jobs} dispatch={dispatch} />
    );
  });

  return (
    <div className="container">
      <div className="row">
        <div className="table-responsive-md">
          <table className='table table-striped border border-secondary' style={{ minWidth: '700px' }}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Status</th>
                <th>Duration</th>
                <th>Creation Date</th>
                <th>Failed Jobs</th>
              </tr>
            </thead>
            <tbody>
              {flows}
            </tbody>
          </table>
        </div>
      </div>
      { state.currentFlow && <Modal flow={state.currentFlow} jobs={state.jobs} traces={state.traces} dispatch={dispatch} />}
    </div>
  )
};
