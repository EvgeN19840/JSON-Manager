// ** React
import { IAllTimeTestClient } from '@/types/tests'
import { useState } from 'react'

// ** ApiService
import { addComment, getTests } from '@/pages/charts/service'
import { IAddComment } from '@/pages/charts/service/types'

function useTests() {
  const [load, setLoad] = useState<boolean>(true)
  const [data, setData] = useState<IAllTimeTestClient[]>([])
  const [testsNames, setTestsNames] = useState<string[]>([])
  const [envs, setEnvs] = useState<string[]>([])

  const getData = async ({ env }: { env?: string }) => {
    setLoad(true)
    try {
      const r = await getTests({ env })
      setEnvs(r.body.envs)
      setTestsNames(r.body.test_names)
      setData(r.body.results)
    } catch {
      setData([])
    } finally {
      setLoad(false)
    }
  }

  const addCommentToTest = async (data: IAddComment, env?: string) => {
    await addComment(data)
    await getData({ env })
  }

  return {
    data,
    envs,
    load,
    getData,
    testsNames,
    addCommentToTest
  }
}
export default useTests
