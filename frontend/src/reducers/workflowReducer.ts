import { ACTION, WorkflowAction, WorkflowState } from "../types";

export const DEFAULT_STATE = {
  flows: [],
  jobs: [],
  traces: [],
  currentFlow: null,
  error: false
}

export const workflowReducer: React.Reducer<WorkflowState,WorkflowAction> = (state = DEFAULT_STATE, action) => {
  switch(action.type) {
    case ACTION.SET_FLOWS:
      return {
        ...state,
        flows: action.payload
      };
    case ACTION.SET_CURRENT_FLOW:
      return {
        ...state,
        currentFlow: action.payload
      };
    case ACTION.SET_JOBS:
      return {
        ...state,
        jobs: action.payload
      }
    case ACTION.SET_TRACES:
      return {
        ...state,
        traces: action.payload
      }
    case ACTION.SET_ERROR: {
      return {
        ...state,
        error: true
      };
    }
    default:
      return state;
  }
}

export const initializer = (): WorkflowState => {
  const workflows = localStorage.getItem('quadric-workflows');
  const jobs = localStorage.getItem('quadric-jobs');
  const traces = localStorage.getItem('quadric-traces');
  // JSON.parse()

  return {
    ...DEFAULT_STATE,
    flows: workflows ? JSON.parse(workflows) : DEFAULT_STATE.flows,
    jobs: jobs ? JSON.parse(jobs) : DEFAULT_STATE.jobs,
    traces: traces ? JSON.parse(traces) : DEFAULT_STATE.traces,
  }
}