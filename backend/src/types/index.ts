export interface IMetrics {
  payrollRun: number;
  upload: number;
  apply: number;
  payrollrest: number;
  api_version: string;
  comment: string | null;
}


export interface IAllTimeTest {
  id: number,
  time: string,
}

export interface ITestClient {
  time: number;
  test_name: string;
}

export interface ITestServer extends ITestClient {
  id: number;
  parent: number;
}

export interface IAllTimeTestClient extends IAllTimeTest {
  tests: ITestClient[]
}