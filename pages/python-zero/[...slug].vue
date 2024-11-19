<template>
  <main class="min-h-[calc(100vh-var(--header-height))]">
    <ContentDoc v-slot="{ doc }">
      <div class="mx-auto px-4 sm:px-6 lg:px-8 max-w-screen-xl">
        <div class="flex flex-col lg:grid lg:grid-cols-10 lg:gap-8">
          <div class="lg:col-span-2">
            <!-- 这里开始是左侧的教程导航 -->
            <aside class="hidden overflow-y-auto lg:block lg:max-h-[calc(100vh-var(--header-height))] lg:sticky lg:top-[--header-height] py-8 lg:px-4 lg:-mx-4">
              <div class="sticky -top-[calc(100vh-var(--header-height))] -mt-8 z-[1]">
                <div class="h-8 -mx-4 px-4"></div>
                <ContentNavigation v-slot="{ navigation }" :query="catsQuery">
                  <TutNav :nav="navigation[0].children" />
                </ContentNavigation>
              </div>
            </aside>
          </div>
          
          <div class="lg:col-span-8">
            <div class="flex flex-col lg:grid lg:grid-cols-10 lg:gap-8">
              <div class="lg:col-span-8">
                <!-- 这里开始是正文部分 -->
                <article>
                  <div class="relative border-b border-gray-200 dark:border-gray-700 py-8">
                    <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                      <h1 class="text-3xl sm:text-4xl font-black tracking-tight">{{ doc.title }}</h1>
                    </div>
                    <p class="mt-6 leading-8">{{ doc.description?doc.description:"" }}</p>
                  </div>
                  <div class="mt-8 pb-24dark:prose-pre:!bg-gray-800/60 prose prose-primary dark:prose-invert max-w-none">
                    <ContentRenderer :value="doc" class="prose dark:prose-invert max-w-none"/>
                  </div>
                </article>

                <div class="flex border-gray-200 dark:border-gray-800 w-full border-t border-dashed
                my-8">
                </div>
                
                <div class="toolbar">
                  <div class="share-box" style="display:;">
                    分享到：
                    <ul class="share-list">
                      <li data-type="wechat" class="hover-item share-item has-qrcode-item">
                        <a href="javascript:void(0);" target="_self" class="dis-evt">
                          <i class="van-icon-share_wechat_default">
                          </i>
                        </a>
                        <div class="qrcode-box">
                          <p class="qrcode-tit">
                            微信扫一扫分享
                          </p>
                          <div id="wechat-qrcode" class="qrcode-ctnr">
                            <div class="van-qrcode">
                              <canvas width="132" height="132">
                              </canvas>
                            </div>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>

                <CommentArea class="w-auto" />
              </div>
              <div class="lg:col-span-2 order-first lg:order-last">
                <!-- 这里开始是右侧的文章导航 -->
                <BodyNav :toc="doc.body.toc" />
              </div>

            </div>
          </div>
        </div>
      </div>
    </ContentDoc>
  </main>
</template>

<script setup>
const catsQuery = queryContent('/python-zero/')
const pyodideStore = usePyodideStore(); // 获取 Pinia store

const slug = useRoute().params.slug // 假设 slug 是从路由参数中获取的

// 使用 slug 获取文章内容
const article = await queryContent(`/python-zero/${slug}`).findOne() // 使用 slug 动态构建路径

// Toggle Re-initialise for each Page
pyodideStore.initialized = false;

onMounted(()=>{
  pyodideStore.initialize();
  pyodideStore.installDependency(article.pipDependencies);
})
</script>
