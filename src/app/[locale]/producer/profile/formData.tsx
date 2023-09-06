import { getUserDetails } from '@/utils/userService'
import Form from './form'

export async function FormWithData() {
  const userDetails = await getUserDetails()
  return <Form userDetails={userDetails} />
}

export default FormWithData
