import classNames from 'classnames';
import dayjs from 'dayjs';
import * as React from 'react';
import { ACTION, Job, STATUS, Workflow, WorkflowAction } from '../types';

type FlowProps = {
  data: Workflow,
  jobs: Job[]
  dispatch: (action: WorkflowAction) => void
}

export const Flow = ({ data, jobs, dispatch }: FlowProps) => {

  const pillColor = classNames({
    danger: data.status === STATUS.FAILED || data.status === STATUS.FAILURE,
    success: data.status === STATUS.SUCCESS,
    info: data.status === STATUS.PENDING
  })

  const failingJobs = jobs
  .filter(j =>  j.status === STATUS.FAILED && j.workflow_id === data.id)
  .map(j => {
    const stage = j.stage.charAt(0).toUpperCase() + j.stage.slice(1);

    return stage;
  });

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    dispatch({ type: ACTION.SET_CURRENT_FLOW, payload: data })
  }

  return (
    <tr>
      <td>
        <button className="btn btn-link" onClick={handleClick}>Workflow {data.id}</button>
      </td>
      <td>
      <span className={`badge rounded-pill text-bg-${pillColor}`}>{data.status}</span>
      </td>
      <td>{data.duration_seconds > 60 ? `${Math.floor(data.duration_seconds/60)}m ${data.duration_seconds%60}s` : `${data.duration_seconds}s`}</td>
      <td className='flex-column'>
        <span>📆 {dayjs(data.created_at).format('DD/MM/YYYY')}</span>
        {' '}
        <span>🕗 {dayjs(data.created_at).format('hh:ssa')}</span>
      </td>
      <td>{failingJobs.toString()}</td>
    </tr>
  )
}