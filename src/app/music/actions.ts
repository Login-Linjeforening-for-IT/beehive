'use server'

import { getActivity } from '@utils/api'

export async function fetchUsers() {
    const data = await getActivity()
    return {
        mostActiveUsers: data.mostActiveUsers,
        mostSkippingUsers: data.mostSkippingUsers,
        currentlyListeningUsers: data.currentlyListening.map(s => s.user_id).filter(Boolean) as string[],
    }
}
