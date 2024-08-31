'use client'
import React from 'react';
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { ColumnDef, AccessorFnColumnDefBase, AccessorKeyColumnDefBase } from '@tanstack/react-table';

// Define styles
const styles = StyleSheet.create({
  table: {
    display: "flex", // Use flex instead of table
    flexDirection: "column", // Column direction for the rows
    width: "100%",
    borderWidth: 1,
    borderColor: "#000",
  },
  tableRow: {
    flexDirection: "row",
  },
  tableColHeader: {
    flex: 1,
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    backgroundColor: '#f0f0f0',
    padding: 5,
  },
  tableCol: {
    flex: 1,
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    padding: 5,
  },
  tableCellHeader: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  tableCell: {
    fontSize: 10,
  },
});

// Define a reusable PDF Table component
const PdfTable = <T,>({ columns, data }: { columns: ColumnDef<T, any>[], data: T[] }) => (
  <View style={styles.table}>
    {/* Table Header */}
    <View style={styles.tableRow}>
      {columns.map((col, index) => (
        <View key={index} style={styles.tableColHeader}>
          <Text style={styles.tableCellHeader}>
            {typeof col.header === 'string' ? col.header : col.id}
          </Text>
        </View>
      ))}
    </View>

    {/* Table Rows */}
    {data.map((row, rowIndex) => (
      <View key={rowIndex} style={styles.tableRow}>
        {columns.map((col, colIndex) => {
          // Determine the column type and extract cell value accordingly
          let cellContent: any;
          if ('accessorFn' in col) {
            cellContent = (col as AccessorFnColumnDefBase<T, any>).accessorFn(row, rowIndex);
          } else if ('accessorKey' in col) {
            cellContent = (row as any)[(col as AccessorKeyColumnDefBase<T, any>).accessorKey];
          } else {
            cellContent = '';
          }

          return (
            <View key={colIndex} style={styles.tableCol}>
              {/* <Text style={styles.tableCell}>{cellContent}</Text> */}
            </View>
          );
        })}
      </View>
    ))}
  </View>
);

// Define the MyDocument component
const MyDocument = <T,>({ columns, data }: { columns: ColumnDef<T, any>[], data: T[] }) => (
  <Document>
    <Page size="A4" style={{ padding: 30 }}>
      <PdfTable columns={columns} data={data} />
    </Page>
  </Document>
);

// Define the DownloadPDFButton component
const DownloadPDFButton = <T,>({ columns, data }: { columns: ColumnDef<T, any>[], data: T[] }) => {
  // Filter out checkbox and action columns
  const filteredColumns = columns.filter(col => {
    // Customize your filter conditions based on the column's properties
    return !col.id?.includes('actions') && !col.id?.includes('checkbox');
  });

  return (
    <PDFDownloadLink
      document={<MyDocument columns={filteredColumns} data={data} />}
      fileName="table.pdf"
    >
      {({ loading }) => (loading ? 'Loading document...' : 'Download PDF')}
    </PDFDownloadLink>
  );
};

export default DownloadPDFButton;
