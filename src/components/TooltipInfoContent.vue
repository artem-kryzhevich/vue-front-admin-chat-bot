<template>
  <CTooltip :content="content" placement="bottom">
    <template #toggler="{ on }">
      <CButton color="info" variant="outline" v-on="on">
        <CIcon icon="cil-info"/>
      </CButton>
    </template>
  </CTooltip>
</template>

<script>
export default {
  name: "TooltipInfoContent",
  props: ['content']
}
</script>

<style scoped>

</style>
