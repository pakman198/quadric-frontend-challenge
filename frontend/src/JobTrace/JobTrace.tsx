import dayjs from 'dayjs';
import * as React from 'react';
import { ExtendedJob } from '../types';

type  JobTraceProps = {
  trace: ExtendedJob
}

export const JobTrace = ({ trace }: JobTraceProps) => {
  const { created_at, stage, trace: { content }} = trace;

  return (
    <div className='card mb-4 bg-light'>
      <div className='card-header fw-bold text-start text-capitalize d-inline-flex justify-content-between'>
        {stage}
        <small className='text-small'>{dayjs(created_at).format('DD/MM/YYYY')}</small>
      </div>
      <div className="card-body">
        <pre className='text-start'>
          {content}
        </pre>
      </div>
    </div>
  )
};
