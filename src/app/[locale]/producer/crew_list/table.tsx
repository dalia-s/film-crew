'use client'

import { Fragment, useEffect, useState, useRef, useTransition } from 'react'
import { useTranslations } from 'next-intl'
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  getExpandedRowModel,
} from '@tanstack/react-table'
import { CrewListItem, CrewSearchParams } from '@/types/index'
import { getCrewList } from '@/utils/crewListService'
import Pagination from './pagination'
import { getTableColumns } from './tableColumnsConfig'
import Loading from '../../loading'

type Props = {
  searchParams: CrewSearchParams
}

export default function Table({ searchParams }: Props) {
  const initialRender = useRef(true)
  const [data, setData] = useState<CrewListItem[]>([])
  const [isPending, startTransition] = useTransition()
  const ht = useTranslations('Table.crewListHeaders')
  const ot = useTranslations('SelectOptions')

  useEffect(() => {
    let mounted = true

    async function getData() {
      const crewData = await getCrewList(searchParams)
      if (mounted) {
        setData(crewData)
      }
    }

    if (initialRender.current) {
      getData()
      initialRender.current = false
    } else {
      startTransition(() => getData())
    }
    return () => {
      mounted = false
    }
  }, [searchParams])

  const columns = getTableColumns({ ht, ot })

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
  })

  if (initialRender.current) {
    return <Loading />
  }

  const className = isPending ? 'table-container loading' : 'table-container'

  return (
    <div className={className}>
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
