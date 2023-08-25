import { createColumnHelper } from '@tanstack/react-table'
import { CrewListItem } from '@/types/types'
import { getProfessionOptions } from '@/utils/consts'

type Translations = {
  ht: (key: any) => string
  ot: (key: any) => string
}

function getProfessionTranslation(t: (key: any) => string, slug: string | null): string {
  const professionOptions = getProfessionOptions(t)
  const prof = professionOptions.find((p) => p.value === slug)
  return prof?.name || ''
}

export function getTableColumns({ ht, ot }: Translations) {
  const columnHelper = createColumnHelper<CrewListItem>()

  const columns = [
    columnHelper.accessor('clerkId', {
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
      header: ht('name'),
      cell: (props) => props.getValue(),
    }),
    columnHelper.accessor('profession', {
      header: ht('profession'),
      cell: (props) => getProfessionTranslation(ot, props.getValue()),
    }),
    columnHelper.accessor('experienceYears', {
      header: ht('experienceYears'),
      cell: (props) => (props.getValue() ? `${props.getValue()} ${ht('year')}` : ''),
    }),
    columnHelper.accessor('hourlyRate', {
      header: ht('hourlyRate'),
      cell: (props) => (props.getValue() ? `${props.getValue()} €` : ''),
    }),
    columnHelper.accessor('availability', {
      header: ht('availability'),
      cell: (props) => props.getValue(),
    }),
    columnHelper.accessor('contactNo', {
      header: ht('contactNumber'),
      cell: (props) => props.getValue(),
    }),
  ]

  return columns
}

export default getTableColumns
