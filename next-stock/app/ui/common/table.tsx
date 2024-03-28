import React from 'react';
import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    useReactTable,
  } from "@tanstack/react-table";
  
interface TableProps {
  data: any[];
  columns: ColumnDef<any>[];
  noBorder?: boolean;
}

export default function Table({ data, columns, noBorder }: TableProps) {
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });
    return (
      <div className={`text-left p-2 ${noBorder ? '' : 'border border-paleGlay rounded-md' }`}>
          <table>
            <thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id} className='border-b border-paleGlay'>
                  {headerGroup.headers.map((header) => (
                    <th key={header.id} colSpan={header.colSpan} className='p-3'>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.map((row) => {
                return (
                  <tr key={row.id} className='border-b border-paleGlay'>
                    {row.getVisibleCells().map((cell) => {
                      return (
                        <td key={cell.id} className='p-3'>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
          {table.getRowModel().rows.length === 0 ? <p>Empty</p> : '' }
       </div>
     );
}