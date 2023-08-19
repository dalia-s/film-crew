'use client'

import { Fragment } from 'react'
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  getExpandedRowModel,
} from '@tanstack/react-table'

import { CrewMember, dummyData } from './dummyData'
import Pagination from './pagination'

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

export default function Table() {
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
