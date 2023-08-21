import { createColumnHelper } from '@tanstack/react-table'
import { CrewMember } from '@/utils/dummyData'

export function getTableColumns() {
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
      header: 'Name',
      cell: (props) => props.getValue(),
    }),
    columnHelper.accessor('profession', {
      header: 'Profession',
      cell: (props) => props.getValue(),
    }),
    columnHelper.accessor('experienceYears', {
      header: 'Experience',
      cell: (props) => <span>{props.getValue()} y</span>,
    }),
    columnHelper.accessor('hourlyRate', {
      header: 'Hourly rate',
      cell: (props) => <span>{props.getValue()} €</span>,
    }),
    columnHelper.accessor('availability', {
      header: 'Dates available',
      cell: (props) => props.getValue(),
    }),
    columnHelper.accessor('contactNumber', {
      header: 'Contact number',
      cell: (props) => props.getValue(),
    }),
  ]

  return columns
}

export default getTableColumns
