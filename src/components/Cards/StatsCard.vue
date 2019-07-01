<template>
  <md-card class="md-card-stats">
    <md-card-header :data-background-color="dataBackgroundColor">
      <slot name="header"></slot>
    </md-card-header>

    <md-card-content>
      <slot name="content"></slot>
    </md-card-content>

	<div v-if="showcompact == 'false'">
    <md-card-content >
      <slot name="description"></slot>
    </md-card-content>
	</div>
	
    <md-card-actions md-alignment="left">
      <slot name="footer"></slot>
    </md-card-actions>
  </md-card>
</template>
<script>
export default {
  name: 'stats-card',
  props: {
    dataBackgroundColor: {
      type: String,
      default: ''
    },
	showcompact: {
	  type: String,
      default: 'false'
	}
  }
}
</script>
