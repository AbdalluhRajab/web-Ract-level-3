import { useEffect, useMemo, useState } from "react";
import { ArrowDown, ArrowUp, ChevronsUpDown, Search } from "lucide-react";
import { StatusPill } from "./StatusPill";

export function DataTable({ rows, columns, filters = [], actions, loading = false, emptyMessage = "No records found.", pageSize = 6, searchPlaceholder = "Search records…" }) {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState({ key: columns[0]?.key, direction: "asc" });
  const [activeFilters, setActiveFilters] = useState({});
  const [page, setPage] = useState(1);

  const filteredRows = useMemo(() => {
    const term = search.trim().toLowerCase();
    const result = rows.filter((row) => {
      const matchesSearch = !term || Object.values(row).some((value) => typeof value !== "object" && String(value).toLowerCase().includes(term));
      const matchesFilters = filters.every((filter) => !activeFilters[filter.key] || String(row[filter.key]) === activeFilters[filter.key]);
      return matchesSearch && matchesFilters;
    });
    return [...result].sort((a, b) => {
      const column = columns.find((item) => item.key === sort.key);
      const getValue = column?.sortValue || ((row) => row[sort.key]);
      const left = getValue(a);
      const right = getValue(b);
      const comparison = typeof left === "number" ? left - right : String(left ?? "").localeCompare(String(right ?? ""));
      return sort.direction === "asc" ? comparison : -comparison;
    });
  }, [activeFilters, columns, filters, rows, search, sort]);

  const pageCount = Math.max(1, Math.ceil(filteredRows.length / pageSize));
  const visibleRows = filteredRows.slice((page - 1) * pageSize, page * pageSize);

  useEffect(() => { setPage(1); }, [search, activeFilters]);
  useEffect(() => { if (page > pageCount) setPage(pageCount); }, [page, pageCount]);

  function toggleSort(key) {
    setSort((current) => current.key === key ? { key, direction: current.direction === "asc" ? "desc" : "asc" } : { key, direction: "asc" });
  }

  return (
    <div className="data-table-card">
      <div className="table-toolbar">
        <label className="search-field">
          <Search size={17} />
          <span className="sr-only">Search table</span>
          <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder={searchPlaceholder} />
        </label>
        {filters.map((filter) => (
          <select key={filter.key} aria-label={filter.label} value={activeFilters[filter.key] || ""} onChange={(event) => setActiveFilters((current) => ({ ...current, [filter.key]: event.target.value }))}>
            <option value="">{filter.label}</option>
            {filter.options.map((option) => <option key={option} value={option}>{option}</option>)}
          </select>
        ))}
        <span className="result-count">{filteredRows.length} result{filteredRows.length === 1 ? "" : "s"}</span>
      </div>
      <div className="table-scroll">
        <table>
          <thead>
            <tr>
              {columns.map((column) => (
                <th key={column.key} scope="col">
                  <button type="button" className="sort-button" onClick={() => toggleSort(column.key)}>
                    {column.label}
                    {sort.key !== column.key ? <ChevronsUpDown size={14} /> : sort.direction === "asc" ? <ArrowUp size={14} /> : <ArrowDown size={14} />}
                  </button>
                </th>
              ))}
              {actions && <th scope="col" className="actions-heading">Actions</th>}
            </tr>
          </thead>
          <tbody>
            {loading ? Array.from({ length: 4 }, (_, index) => (
              <tr key={index}>{columns.map((column) => <td key={column.key}><span className="skeleton-line" /></td>)}{actions && <td><span className="skeleton-line short" /></td>}</tr>
            )) : visibleRows.map((row) => (
              <tr key={row.id}>
                {columns.map((column) => (
                  <td key={column.key} data-label={column.label}>
                    {column.type === "status" ? <StatusPill value={row[column.key]} /> : column.render ? column.render(row[column.key], row) : row[column.key]}
                  </td>
                ))}
                {actions && <td data-label="Actions" className="row-actions">{actions(row)}</td>}
              </tr>
            ))}
          </tbody>
        </table>
        {!loading && visibleRows.length === 0 && <div className="empty-table"><p>{emptyMessage}</p><span>Try changing the search or filter.</span></div>}
      </div>
      <div className="table-pagination">
        <p>Page {page} of {pageCount}</p>
        <div>
          <button type="button" className="button button-small button-ghost" onClick={() => setPage((current) => Math.max(1, current - 1))} disabled={page === 1}>Previous</button>
          <button type="button" className="button button-small button-ghost" onClick={() => setPage((current) => Math.min(pageCount, current + 1))} disabled={page === pageCount}>Next</button>
        </div>
      </div>
    </div>
  );
}
