'use client'

import { Fragment } from 'react'
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  getExpandedRowModel,
} from '@tanstack/react-table'
import { dummyData } from '@/utils/dummyData'
import Pagination from './pagination'
import { getTableColumns } from './tableColumnsConfig'

export default function Table() {
  const columns = getTableColumns()
  const table = useReactTable({
    data: dummyData,
    columns,
    defaultColumn: {
      minSize: 100,
      size: 50,
    },
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
                    <span>{row.original.intro}</span>
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
