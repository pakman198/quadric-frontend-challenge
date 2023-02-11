export type WorkflowState = {
  flows: Workflow[]
  jobs: Job[]
  traces: Trace[]
  currentFlow: Workflow | null;
  error: boolean
}

export type Workflow = {
  id: number,
  project_id: number,
  created_at: string,
  created_by_user: number,
  status: string,
  duration_seconds: number
}

export type Job = {
  created_at: string,
  duration_seconds: number,
  id: number,
  stage: "lint",
  status: STATUS,
  workflow_id: number
}

export type Trace = {
  id: number,
  job_id: number,
  offset: number,
  size: number,
  content: string
}

export interface ExtendedJob extends Job {
  trace: Trace
}

export enum ACTION {
  SET_FLOWS = 'SET_FLOWS',
  SET_CURRENT_FLOW = 'SET_CURRENT_FLOW',
  SET_JOBS = 'SET_JOBS',
  SET_ERROR = 'SET_ERROR',
  SET_TRACES = 'SET_TRACES'
}

export enum STATUS {
  SUCCESS = 'success',
  FAILED = 'failed',
  FAILURE = 'failure',
  PENDING = 'pending'
}

export type WorkflowAction = 
{type: ACTION.SET_FLOWS, payload: Workflow[]} | 
{ type: ACTION.SET_CURRENT_FLOW, payload: Workflow | null } |
{ type: ACTION.SET_JOBS, payload: Job[] } |
{ type: ACTION.SET_TRACES, payload: Trace[] } |
{ type: ACTION.SET_ERROR }

export type SortOption = {
  label: string,
  value: string
}