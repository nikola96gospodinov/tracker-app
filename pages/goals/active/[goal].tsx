import { useRouter } from 'next/router'

const Post = () => {
  const router = useRouter()
  const { goal } = router.query

  return <p>Post: {goal}</p>
}

export default Post