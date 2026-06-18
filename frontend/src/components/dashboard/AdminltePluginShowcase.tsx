"use client";

import { useMemo, useState } from "react";
import {
  ApexChart,
  Card,
  Datatable,
  Editor,
  InputFlatpickr,
  InputTomSelect,
  WorldMap,
  useSortable,
} from "@adminlte/react";
import type { ApexOptions } from "apexcharts";

export function AdminltePluginShowcase() {
  const [editorValue, setEditorValue] = useState("<p>Write your note...</p>");

  useSortable(true);

  const tableColumns = useMemo(
    () => [
      { title: "Module", field: "module", sorter: "string" },
      { title: "Records", field: "records", sorter: "number" },
      { title: "Owner", field: "owner", sorter: "string" },
    ],
    []
  );

  const tableData = useMemo(
    () => [
      { module: "Sale", records: 28, owner: "Umair" },
      { module: "Rent", records: 19, owner: "Umair" },
      { module: "Property", records: 13, owner: "Umair" },
    ],
    []
  );

  const chartSeries = useMemo(
    () => [
      {
        name: "Records",
        data: [28, 19, 13],
      },
    ],
    []
  );

  const chartConfig = useMemo<ApexOptions>(
    () => ({
      chart: { type: "bar", height: 260, toolbar: { show: false } },
      xaxis: { categories: ["Sale", "Rent", "Property"] },
      dataLabels: { enabled: false },
      colors: ["#0d6efd"],
    }),
    []
  );

  return (
    <section className="mt-3">

      <div className="row connectedSortable">
        <div className="col-lg-6">
          <Card title="ApexChart">
            <ApexChart id="records-apex-chart" series={chartSeries} config={chartConfig} />
          </Card>
        </div>

        <div className="col-lg-6">
          <Card title="WorldMap">
            <WorldMap id="global-map" height={260} />
          </Card>
        </div>
      </div>

      <div className="row connectedSortable mt-3">
        <div className="col-lg-6">
          <Card title="Datatable (Tabulator)">
            <Datatable id="module-table" columns={tableColumns} data={tableData} />
          </Card>
        </div>

        <div className="col-lg-6">
          <Card title="Editor (Quill)">
            <Editor
              name="dashboard-editor"
              label="Internal Notes"
              value={editorValue}
              placeholder="Add your note"
              onChange={setEditorValue}
            />
          </Card>
        </div>
      </div>

      <div className="row connectedSortable mt-3">
        <div className="col-lg-6">
          <Card title="InputFlatpickr">
            <InputFlatpickr
              name="followup-date"
              label="Follow-up Date"
              dateType="datetime"
              placeholder="Select date and time"
            />
          </Card>
        </div>

        <div className="col-lg-6">
          <Card title="InputTomSelect">
            <InputTomSelect
              name="module-selector"
              label="Module Selector"
              options={[
                { value: "sale", label: "Sale" },
                { value: "rent", label: "Rent" },
                { value: "property", label: "Property" },
              ]}
            />
          </Card>
        </div>
      </div>
    </section>
  );
}
