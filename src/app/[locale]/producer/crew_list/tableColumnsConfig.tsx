import { createColumnHelper } from '@tanstack/react-table'
import { CrewMember } from '@/utils/dummyData'

export function getTableColumns(t: (key: any) => string) {
  const columnHelper = createColumnHelper<CrewMember>()

  const columns = [
    columnHelper.accessor('id', {
      header: ({ table }) => (
        <button type="button" className="row-expand header" onClick={table.getToggleAllRowsExpandedHandler()}>
          {table.getIsAllRowsExpanded() ? <>&#9662;</> : <>&#9656;</>}
        </button>
      ),
      cell: ({ row }) => (
        <button type="button" className="row-expand" onClick={() => row.toggleExpanded()}>
          {row.getIsExpanded() ? <>&#9662;</> : <>&#9656;</>}
        </button>
      ),
      meta: { className: 'test-class' },
    }),
    columnHelper.accessor('name', {
      header: t('name'),
      cell: (props) => props.getValue(),
    }),
    columnHelper.accessor('profession', {
      header: t('profession'),
      cell: (props) => props.getValue(),
    }),
    columnHelper.accessor('experienceYears', {
      header: t('experienceYears'),
      cell: (props) => <span>{props.getValue()} y</span>,
    }),
    columnHelper.accessor('hourlyRate', {
      header: t('hourlyRate'),
      cell: (props) => <span>{props.getValue()} €</span>,
    }),
    columnHelper.accessor('availability', {
      header: t('availability'),
      cell: (props) => props.getValue(),
    }),
    columnHelper.accessor('contactNumber', {
      header: t('contactNumber'),
      cell: (props) => props.getValue(),
    }),
  ]

  return columns
}

export default getTableColumns
