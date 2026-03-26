<template>
  <div class="relative overflow-x-clip pb-16">
    <ClientOnly>
      <AppCursor />
    </ClientOnly>
    <SiteHeader />
    <main>
      <slot />
    </main>
  </div>
</template>
