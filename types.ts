export interface SampleParams {
  grade: string;
  totalStudents: number;
  sampleSize: number;
  reserveSize: number;
}

export interface SampleResult {
  params: SampleParams;
  k: number;
  start: number;
  mainSample: number[];
  reserveSample: number[];
}