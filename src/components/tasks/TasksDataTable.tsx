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

  const getStatusColor = (status: TaskStatus) => {
    switch (status) {
      case TaskStatus.TODO: return 'bg-gray-100 text-gray-800'
      case TaskStatus.IN_PROGRESS: return 'bg-blue-100 text-blue-800'
      case TaskStatus.IN_REVIEW: return 'bg-orange-100 text-orange-800'
      case TaskStatus.DONE: return 'bg-green-100 text-green-800'
      case TaskStatus.DELIVERED: return 'bg-purple-100 text-purple-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="border-dashed">
          <Search className="mr-2 h-4 w-4" />
          Estado
          {value?.length > 0 && (
            <>
              <div className="mx-2 h-4 w-px bg-gray-300" />
              <Badge className="px-1 font-normal">
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
            <Badge className={`${getStatusColor(status)} mr-2`}>
              {status.replace('_', ' ')}
            </Badge>
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

  const getPriorityColor = (priority: TaskPriority) => {
    switch (priority) {
      case TaskPriority.HIGH: return 'bg-red-100 text-red-800'
      case TaskPriority.MEDIUM: return 'bg-yellow-100 text-yellow-800'
      case TaskPriority.LOW: return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="border-dashed">
          <Search className="mr-2 h-4 w-4" />
          Prioridad
          {value?.length > 0 && (
            <>
              <div className="mx-2 h-4 w-px bg-gray-300" />
              <Badge className="px-1 font-normal">
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
            <Badge className={`${getPriorityColor(priority)} mr-2`}>
              {priority}
            </Badge>
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
      <div className="flex items-center justify-between">
        <div className="flex flex-1 items-center space-x-2">
          {/* Filtro de búsqueda por título */}
          <Input
            placeholder="Buscar por título..."
            value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("title")?.setFilterValue(event.target.value)
            }
            className="h-8 w-[150px] lg:w-[250px]"
          />

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
              Limpiar
              <X className="ml-2 h-4 w-4" />
            </Button>
          )}
        </div>

        {/* Selector de columnas */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="ml-auto hidden h-8 lg:flex"
            >
              <Settings2 className="mr-2 h-4 w-4" />
              Columnas
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
      <div className="flex items-center justify-between space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} de{" "}
          {table.getFilteredRowModel().rows.length} fila(s) seleccionada(s).
        </div>
        <div className="flex items-center space-x-6 lg:space-x-8">
          <div className="flex items-center space-x-2">
            <p className="text-sm font-medium">Filas por página</p>
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
          <div className="flex w-[100px] items-center justify-center text-sm font-medium">
            Página {table.getState().pagination.pageIndex + 1} de{" "}
            {table.getPageCount()}
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              Anterior
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              Siguiente
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}