import { App } from '@vue/runtime-core'

import Flex from '@/components/utils/Flex.vue'
import Container from '@/components/utils/Container.vue'

export default {
	register(app: App<Element>) {

		app.component('flex', Flex)
		app.component('container', Container)
	}
}
