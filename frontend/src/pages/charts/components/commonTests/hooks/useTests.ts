// ** React
import { IAllTimeTestClient } from '@/types/tests'
import { useEffect, useState } from 'react'

// ** ApiService
import { addComment, getTests } from '@/pages/charts/service'
import { IAddComment } from '@/pages/charts/service/types'

function useTests() {
  const [load, setLoad] = useState<boolean>(true)
  const [data, setData] = useState<IAllTimeTestClient[]>([])
  const [testsNames, setTestsNames] = useState<string[]>([])

  const getData = async () => {
    await getTests().then(r => {
      setTestsNames(r.body.test_names)
      setData(r.body.results)
      setLoad(false)
    });
  }

  const addCommentToTest = async (data: IAddComment) => {
    await addComment(data).then(() => {
      getData()
    })
  }

  useEffect(() => {
    getData()
  }, [])

  return {
    data,
    load,
    testsNames,
    addCommentToTest
  }
}

export default useTests
