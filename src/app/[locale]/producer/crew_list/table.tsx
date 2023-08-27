'use client'

import { Fragment } from 'react'
import { useTranslations } from 'next-intl'
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  getExpandedRowModel,
} from '@tanstack/react-table'
import { CrewListItem } from '@/types/index'
import Pagination from './pagination'
import { getTableColumns } from './tableColumnsConfig'

type Props = {
  data: CrewListItem[]
}

export default function Table({ data }: Props) {
  const ht = useTranslations('Table.crewListHeaders')
  const ot = useTranslations('SelectOptions')

  const columns = getTableColumns({ ht, ot })

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
  })

  return (
    <div className="table-container">
      <table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <Fragment key={row.id}>
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
                ))}
              </tr>
              {row.getIsExpanded() ? (
                <tr>
                  <td aria-label="spacer" className="spacer" />
                  <td colSpan={7} className="intro">
                    <span>{row.original.about}</span>
                  </td>
                </tr>
              ) : null}
            </Fragment>
          ))}
        </tbody>
      </table>
      <Pagination table={table} />
    </div>
  )
}
