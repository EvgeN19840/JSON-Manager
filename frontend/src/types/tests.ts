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
  date: string
  tests: ITestClient[]
}

export interface ITest extends IAllTimeTest {
  name: string
  date: string
}