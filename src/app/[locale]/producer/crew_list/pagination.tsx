import { useTranslations } from 'next-intl'
import { Table } from '@tanstack/react-table'
import { CrewListItem } from '@/types/types'

type Props = {
  table: Table<CrewListItem>
}

export default function Pagination({ table }: Props) {
  const t = useTranslations('Table.pagination')

  return (
    <div className="pagination-container flex items-center gap-2">
      <button type="button" onClick={() => table.setPageIndex(0)} disabled={!table.getCanPreviousPage()}>
        &#171;
      </button>
      <button type="button" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
        &#8249;
      </button>
      <button type="button" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
        &#8250;
      </button>
      <button
        type="button"
        onClick={() => table.setPageIndex(table.getPageCount() - 1)}
        disabled={!table.getCanNextPage()}
      >
        &#187;
      </button>
      <span className="page-number">
        <div>{t('page')}</div>
        <strong>
          {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
        </strong>
      </span>
      <span className="page-navigation">
        {t('goTo')}
        <input
          type="number"
          defaultValue={table.getState().pagination.pageIndex + 1}
          onChange={(e) => {
            const page = e.target.value ? Number(e.target.value) - 1 : 0
            table.setPageIndex(page)
          }}
        />
      </span>
      <select
        value={table.getState().pagination.pageSize}
        onChange={(e) => {
          table.setPageSize(Number(e.target.value))
        }}
      >
        {[10, 20, 30, 40, 50].map((pageSize) => (
          <option key={pageSize} value={pageSize}>
            {t('show')} {pageSize}
          </option>
        ))}
      </select>
    </div>
  )
}
