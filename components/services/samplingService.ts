import { SampleParams, SampleResult } from '../types';

export const generateSystematicSample = (params: SampleParams): SampleResult => {
  const { totalStudents, sampleSize, reserveSize } = params;

  if (sampleSize <= 0 || totalStudents <= 0) {
    throw new Error('Total students and sample size must be greater than zero.');
  }
  if (sampleSize > totalStudents) {
    throw new Error('Sample size cannot be greater than total students.');
  }

  const k = Math.floor(totalStudents / sampleSize);

  if (k < 1) {
     throw new Error('Cannot generate a sample. The sample size is too large for the total number of students.');
  }

  const start = Math.floor(Math.random() * k) + 1;

  const mainSample: number[] = [];
  for (let i = 0; i < sampleSize; i++) {
    mainSample.push(start + i * k);
  }

  const mainSampleSet = new Set(mainSample);
  const allStudents = Array.from({ length: totalStudents }, (_, i) => i + 1);
  const remainingStudents = allStudents.filter(student => !mainSampleSet.has(student));

  // Fisher-Yates shuffle for unbiased random selection from remaining students
  for (let i = remainingStudents.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [remainingStudents[i], remainingStudents[j]] = [remainingStudents[j], remainingStudents[i]];
  }

  const reserveSample = remainingStudents.slice(0, reserveSize).sort((a, b) => a - b);

  return {
    params,
    k,
    start,
    mainSample,
    reserveSample,
  };
};