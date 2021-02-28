export const view = (name: string) => () => import(`@/views/${name}.vue`)
export const layout = (name: string) => () => import(`@/layouts/${name}.vue`)
