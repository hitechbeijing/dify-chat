import { useDifyChat } from '@dify-chat/core'

import MultiAppLayout from '@/layout/multi-app-layout'
import SingleAppLayout from '@/layout/single-app-layout'

export default function ChatPage() {
	const { mode } = useDifyChat()

	if (mode === 'singleApp') {
		return <SingleAppLayout />
	}

	return <MultiAppLayout />
}
