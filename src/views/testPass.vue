<script setup>
import { ref } from "vue"

const activeName = ref("first")
</script>

<template>
  <el-card>
    <el-tabs v-model="activeName" class="demo-tabs">
      <el-tab-pane label="描述类" name="first">
        <el-card>
          <template #header>
            <div class="card-header">
              <p>
                Some individuals theorized that ...whereas from my own
                unprecedented vantage point,I vhemently advocate that ... I
                assert that this argument holds merit to a certain degree.
              </p>
              <p>
                My astounding and paradigm-shifting assertion is that ...
              </p>
              <p>
                Primarily,it is universally postulated that ...
              </p>
              <p>
                Moreover, the emphatic and unanimous consensus maintains that
                almost everyone ardently endorses ...
              </p>
              <p>
                In conclusion, I genuinely espouse the belief that ...
              </p>
              <p>
                一部分人认为... 然而，基于我独特的观点，我强烈觉得...
                我敢说，我的这个论点在一定程度上是有价值的
              </p>
              <p>我自己的思考是...</p>
              <p>首先的，大家普遍认为...</p>
              <p>此外，几乎每个人都强烈认为且支持...</p>
              <p>总的来说，我真诚地希望...</p>
            </div>
          </template>

          <el-tag>theorized: verb 推理</el-tag>
          <el-tag type="success">unprecedented: adj. 空前的</el-tag>
          <el-tag type="warning">vehemently: adv. 强烈的</el-tag>
          <el-tag type="success">astounding: adj. 令人震惊的</el-tag>
          <el-tag>postulated: verb 假设</el-tag>
          <el-tag type="success">emphatic: adj. 强调的</el-tag>
          <el-tag type="success">unanimous: adj. 一致同意</el-tag>
          <el-tag>endorse: verb 公开支持，赞同</el-tag>
          <el-tag type="warning">ardently: adv. 热情地</el-tag>
          <el-tag>espouse: verb 支持</el-tag>
        </el-card>
        <div class="centered">
          <el-link
            target="_blank"
            href="https://zhuanlan.zhihu.com/p/484015242"
            style="font-size: medium;"
          >
            模板来源
          </el-link>
        </div>
      </el-tab-pane>
      <el-tab-pane label="对比类" name="second">
        <p>
          About <em>(题目)</em>, different people have entirely dissimilar
          opinions. Hence, there is an ongoing dispute about <em>(题目)</em> on
          the internet, which could be vitally problematic. However, I deem that
          … for the following reasons and instances.
        </p>
        <p>
          To be honest, before…, I used to think that <em>(题目)</em> is of
          little significance. Hence, I haven’t thought about it until I
          realized that it exerts a profound impact on people’s lives.
        </p>
      </el-tab-pane>
      <el-tab-pane label="解决类" name="third">Role</el-tab-pane>
      <el-tab-pane label="小作文" name="four">
        <div>
          <p>
            About (题目), different people have entirely dissimilar opinions.
            Hence, there is an ongoing dispute about…
          </p>
          <p>
            Apparently, this controversy about … could be vitally problematic.
          </p>

          <p>
            From my perspective, elaborated by two momentous factors, I deem
            that (观点). There are several quintessential instances and reasons
            involved thereof. The explicit sentiment that coincides with my
            standpoint is that … Additionally, advocates utterly concede that …
          </p>
        </div>
        <el-divider />
        <div class="card-header">
          <p>
            Some individuals theorized that ...whereas from my own unprecedented
            vantage point,I vhemently advocate that ... I assert that this
            argument holds merit to a certain degree.
          </p>
          <p>
            My astounding and paradigm-shifting assertion is that ...
          </p>
          <p>
            Primarily,it is universally postulated that ...
          </p>
          <p>
            Moreover, the emphatic and unanimous consensus maintains that almost
            everyone ardently endorses ...
          </p>
          <p>
            In conclusion, I genuinely espouse the belief that ...
          </p>
        </div>
      </el-tab-pane>
      <el-tab-pane label="凑时长" name="122">
        <p>
          It provided me an opportunity to expose myself to…, which helps me
          broaden my horizon.
        </p>
        <p>
          This enables me to change my point of view on certain things, thereby
          exerting a profound impact on cultivating my xx skills.
        </p>
        <p>
          Had it not been for this experience, I would not have become such a
          versatile person today.
        </p>
      </el-tab-pane>
    </el-tabs>
  </el-card>
  <div class="footerCon">
    <el-link
      href="https://beian.miit.gov.cn/"
      target="_blank"
      type="default"
      class="footerLink"
      >粤ICP备2024184954号-1
    </el-link>
  </div>
</template>

<style scoped>
body {
  display: flex;
  flex-direction: column;
  min-height: 100vh; /* 保证内容高度不足时也能撑开页面 */
  margin: 0;
}

.footerCon {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: transparent;
  padding: 10px 0;
  text-align: center;
}

.demo-tabs > .el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}
p {
  line-height: 2;
  font-size: large;
}

.el-tag {
  margin-left: 5px;
  margin-top: 5px;
  margin-bottom: 5px;
  margin-right: 5px;
  font-size: 18px;
}

.centered {
  text-align: center;
  font-size: medium;
}
</style>
