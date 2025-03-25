// ** React
import { IAllTimeTestClient } from '@/types/tests'
import { useEffect, useState } from 'react'

// ** ApiService
import { getTests } from '@/pages/charts/service'

function useTests() {
  const [load, setLoad] = useState<boolean>(true)
  const [data, setData] = useState<IAllTimeTestClient[]>([])
  const [testsNames, setTestsNames] = useState<string[]>([])

  const getData = async () => {
    await getTests().then(r => {
      setTestsNames(r.test_names)
      setData(r.results)
      setLoad(false)
    });
  }

  useEffect(() => {
    getData()
  }, [])

  return {
    data,
    load,
    testsNames,
  }
}

export default useTests
