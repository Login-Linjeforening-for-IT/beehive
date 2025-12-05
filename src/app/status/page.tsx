import { getStatus } from '@utils/api'
import PageClient from './pageClient'

export default async function Page() {
    const status = await getStatus()
    return <PageClient status={status} />
}
