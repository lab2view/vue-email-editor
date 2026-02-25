import type { BlockDefinition } from '../types'
import { createSection, createColumn } from '../serializer/node-factory'

export const layoutBlocks: BlockDefinition[] = [
  {
    id: 'layout-1-col',
    label: 'block_layout_1_col',
    category: 'layout',
    icon: 'Square',
    factory: () =>
      createSection([createColumn()]),
  },
  {
    id: 'layout-2-col',
    label: 'block_layout_2_col',
    category: 'layout',
    icon: 'Columns2',
    factory: () =>
      createSection([
        createColumn([], { width: '50%' }),
        createColumn([], { width: '50%' }),
      ]),
  },
  {
    id: 'layout-3-col',
    label: 'block_layout_3_col',
    category: 'layout',
    icon: 'Columns3',
    factory: () =>
      createSection([
        createColumn([], { width: '33.33%' }),
        createColumn([], { width: '33.33%' }),
        createColumn([], { width: '33.33%' }),
      ]),
  },
  {
    id: 'layout-4-col',
    label: 'block_layout_4_col',
    category: 'layout',
    icon: 'Columns4',
    factory: () =>
      createSection([
        createColumn([], { width: '25%' }),
        createColumn([], { width: '25%' }),
        createColumn([], { width: '25%' }),
        createColumn([], { width: '25%' }),
      ]),
  },
  {
    id: 'layout-sidebar-left',
    label: 'block_layout_sidebar_left',
    category: 'layout',
    icon: 'PanelLeft',
    factory: () =>
      createSection([
        createColumn([], { width: '33%' }),
        createColumn([], { width: '67%' }),
      ]),
  },
  {
    id: 'layout-sidebar-right',
    label: 'block_layout_sidebar_right',
    category: 'layout',
    icon: 'PanelRight',
    factory: () =>
      createSection([
        createColumn([], { width: '67%' }),
        createColumn([], { width: '33%' }),
      ]),
  },
]
