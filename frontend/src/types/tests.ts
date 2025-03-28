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
  time: number,
  status: string
}

export interface ITestClient {
  id: number;
  time: number;
  test_name: string;
  status: string
  comment: string | null;
}

export interface ITestServer extends ITestClient {
  id: number;
  parent: number;
}

export interface IAllTimeTestClient extends IAllTimeTest {
  date: string
  tests: ITestClient[]
  workers: number,
  comment: string | null;
}

export interface ITest extends IAllTimeTest {
  name: string
  date: string
}