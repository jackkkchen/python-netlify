<template>
  <ContentNavigation v-slot="{ navigation }" :query="queryContent('/python-zero/')">
    <TutNav :nav="navigation[0].children" />
  </ContentNavigation>
</template>