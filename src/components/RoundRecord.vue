<template>
  <table>
    <tr>
      <th>Round</th>
      <th>Card Count</th>
      <th>WIP</th>
      <th>StartTime</th>
      <th>First Delivery Time</th>
      <th>Final Delivery Time</th>
    </tr>
    <tr>
      <td>数据1</td>
      <td>数据2</td>
      <td>数据3</td>
      <td>数据1</td>
      <td>数据2</td>
      <td>数据3</td>
    </tr>
  </table>
</template>

<script lang="ts">
export default {};
</script>

<style lang="scss" scoped>
table {
  width: 100%;
  border-collapse: collapse;
}
th,
td {
  border: 1px solid black;
  padding: 8px;
  text-align: left;
}
th {
  background-color: #f2f2f2;
}
</style>