import type { BlockDefinition } from '../types'
import { createSection, createColumn } from '../serializer/node-factory'

export const layoutBlocks: BlockDefinition[] = [
  {
    id: 'layout-1-col',
    label: '1 colonne',
    category: 'layout',
    icon: 'Square',
    factory: () =>
      createSection([createColumn()]),
  },
  {
    id: 'layout-2-col',
    label: '2 colonnes',
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
    label: '3 colonnes',
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
    label: '4 colonnes',
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
    label: 'Sidebar G.',
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
    label: 'Sidebar D.',
    category: 'layout',
    icon: 'PanelRight',
    factory: () =>
      createSection([
        createColumn([], { width: '67%' }),
        createColumn([], { width: '33%' }),
      ]),
  },
]
