"use client"

import * as React from "react"
import {
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  type VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { ChevronDown, Search, Settings2, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Task } from '@/domain/tasks'
import { TaskStatus, TaskPriority } from '@/domain/tasks'
import { TaskStatusBadge } from "./TaskStatusBadge"
import { TaskPriorityBadge } from "./TaskPriorityBadge"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

// Componente de filtros para Status
function StatusFilter({
  value,
  onChange
}: {
  value: string[],
  onChange: (value: string[]) => void
}) {
  const statuses = Object.values(TaskStatus)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="border-dashed h-8 text-sm">
          <Search className="mr-2 h-4 w-4" />
          Estado
          {value?.length > 0 && (
            <>
              <div className="mx-2 h-4 w-px bg-gray-300" />
              <Badge className="px-1 font-normal text-xs">
                {value.length}
              </Badge>
            </>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-[200px]">
        {statuses.map((status) => (
          <DropdownMenuCheckboxItem
            key={status}
            checked={value?.includes(status)}
            onCheckedChange={(checked) => {
              if (checked) {
                onChange([...value, status])
              } else {
                onChange(value?.filter((v) => v !== status) || [])
              }
            }}
          >
            <TaskStatusBadge status={status} />
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

// Componente de filtros para Priority
function PriorityFilter({
  value,
  onChange
}: {
  value: string[],
  onChange: (value: string[]) => void
}) {
  const priorities = Object.values(TaskPriority)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="border-dashed h-8 text-sm">
          <Search className="mr-2 h-4 w-4" />
          Prioridad
          {value?.length > 0 && (
            <>
              <div className="mx-2 h-4 w-px bg-gray-300" />
              <Badge className="px-1 font-normal text-xs">
                {value.length}
              </Badge>
            </>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-[150px]">
        {priorities.map((priority) => (
          <DropdownMenuCheckboxItem
            key={priority}
            checked={value?.includes(priority)}
            onCheckedChange={(checked) => {
              if (checked) {
                onChange([...value, priority])
              } else {
                onChange(value?.filter((v) => v !== priority) || [])
              }
            }}
          >
            <TaskPriorityBadge priority={priority} />
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export function TasksDataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({
    "estimatedTimeHours": false
  })
  const [rowSelection, setRowSelection] = React.useState({})

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })

  // Función para limpiar todos los filtros
  const isFiltered = table.getState().columnFilters.length > 0

  return (
    <div className="w-full space-y-4">
      {/* Barra de herramientas */}
      <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
        <div className="flex flex-col space-y-2 sm:flex-row sm:flex-1 sm:items-center sm:space-x-2 sm:space-y-0">
          {/* Filtro de búsqueda por título */}
          <Input
            placeholder="Buscar por título..."
            value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("title")?.setFilterValue(event.target.value)
            }
            className="h-8 w-full sm:w-[150px] lg:w-[250px]"
          />

          <div className="flex flex-wrap gap-2 sm:gap-2">
            {/* Filtros de estado */}
            <StatusFilter
              value={(table.getColumn("status")?.getFilterValue() as string[]) || []}
              onChange={(value) => table.getColumn("status")?.setFilterValue(value)}
            />

            {/* Filtros de prioridad */}
            <PriorityFilter
              value={(table.getColumn("priority")?.getFilterValue() as string[]) || []}
              onChange={(value) => table.getColumn("priority")?.setFilterValue(value)}
            />

            {/* Botón para limpiar filtros */}
            {isFiltered && (
              <Button
                variant="ghost"
                onClick={() => table.resetColumnFilters()}
                className="h-8 px-2 lg:px-3"
              >
                <span className="hidden sm:inline">Limpiar</span>
                <X className="h-4 w-4 sm:ml-2" />
              </Button>
            )}
          </div>
        </div>

        {/* Selector de columnas */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="h-8 w-full sm:w-auto sm:ml-auto"
            >
              <Settings2 className="mr-2 h-4 w-4" />
              <span className="hidden sm:inline">Columnas</span>
              <span className="sm:hidden">Cols</span>
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[150px]">
            {table
              .getAllColumns()
              .filter(
                (column) =>
                  typeof column.accessorFn !== "undefined" && column.getCanHide()
              )
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.columnDef.header && typeof column.columnDef.header === 'string'
                      ? column.columnDef.header
                      : column.id}
                  </DropdownMenuCheckboxItem>
                )
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Tabla */}
      <div className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className={
                    (row.original as Task).isOverdue()
                      ? "border-l-2 border-l-red-500"
                      : ""
                  }
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No se encontraron tareas.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Controles de paginación y selección */}
      <div className="flex flex-col space-y-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
        <div className="flex-1 text-sm text-muted-foreground">
          <span className="hidden sm:inline">
            {table.getFilteredSelectedRowModel().rows.length} de{" "}
            {table.getFilteredRowModel().rows.length} fila(s) seleccionada(s).
          </span>
          <span className="sm:hidden">
            {table.getFilteredSelectedRowModel().rows.length}/{table.getFilteredRowModel().rows.length} seleccionadas
          </span>
        </div>

        <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:space-x-6 sm:space-y-0 lg:space-x-8">
          <div className="flex items-center justify-between sm:justify-start space-x-2">
            <p className="text-sm font-medium">
              <span className="hidden sm:inline">Filas por página</span>
              <span className="sm:hidden">Por página</span>
            </p>
            <select
              className="h-8 w-[70px] rounded border border-input bg-background px-3 py-1 text-sm ring-offset-background"
              value={`${table.getState().pagination.pageSize}`}
              onChange={(e) => {
                table.setPageSize(Number(e.target.value))
              }}
            >
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <option key={pageSize} value={pageSize}>
                  {pageSize}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center justify-center text-sm font-medium">
            <span className="hidden sm:inline">
              Página {table.getState().pagination.pageIndex + 1} de{" "}
              {table.getPageCount()}
            </span>
            <span className="sm:hidden">
              {table.getState().pagination.pageIndex + 1}/{table.getPageCount()}
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              className="flex-1 sm:flex-none"
            >
              <span className="hidden sm:inline">Anterior</span>
              <span className="sm:hidden">Ant</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              className="flex-1 sm:flex-none"
            >
              <span className="hidden sm:inline">Siguiente</span>
              <span className="sm:hidden">Sig</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}