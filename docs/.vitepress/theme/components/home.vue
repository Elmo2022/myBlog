<template>
  <div class="ui-home">
    <div class="ui-title">精彩文章推荐</div>
    <div class="ui-project">
      <div class="item" v-for="v in siteData" :key="v.name">
        <a class="link" :href="v.link" target="_blank">
          <h3 :class="['title', v.className]">{{ v.name }}</h3>
          <p class="desc">{{ v.desc }}</p>
        </a>
      </div>
    </div>
  </div>
  <BackTop></BackTop>
</template>

<script setup>
import { siteData } from '../model/siteData.js'
</script>

<style lang="scss" scoped>
.color-pink1 {background: #90f;}
.color-red {background: #b91d47;}
.color-blue-deep4 {background: #3360a3;}
.color-blue-light6 {background: #2db7f5;}
.color-green-gradient1 {
  background: -webkit-linear-gradient(120deg, #86b91a 30%, #edd532);
  background: linear-gradient(315deg, #86b91a 30%, #edd532);
}
.color-green-gradient2 {
  background: -webkit-linear-gradient(315deg, #42d392 25%, #647eff);
  background: linear-gradient(315deg, #42d392 25%, #647eff);
}
.color-green-gradient3 {
  background: -webkit-linear-gradient(315deg, #51a256 25%, #f7d336);
  background: linear-gradient(315deg, #51a256 25%, #f7d336);
}
.color-pink-gradient4 {
  background: -webkit-linear-gradient(120deg, #bd44fe 35%, #42d1ff);
  background: linear-gradient(315deg, #bd44fe 35%, #42d1ff);
}
.color-gradient5 {
  background: -webkit-linear-gradient(135deg, #ff4d4d 30%, #ff9a52);
  background: linear-gradient(315deg, #ff4d4d 30%, #ff9a52);
}

.color-gradient6 {
  background: -webkit-linear-gradient(315deg, #7b4397 25%, #dc2430);
  background: linear-gradient(135deg, #7b4397 25%, #dc2430);
}

.color-gradient7 {
  background: -webkit-linear-gradient(315deg, #0984e3 20%, #36a2eb);
  background: linear-gradient(135deg, #0984e3 20%, #36a2eb);
}

.color-gradient8 {
  background: -webkit-linear-gradient(135deg, #f4a261 35%, #f9c74f);
  background: linear-gradient(315deg, #f4a261 35%, #f9c74f);
}


.color-gradient9 {
  background: -webkit-linear-gradient(120deg, #48c9b0 40%, #6f86d6);
  background: linear-gradient(300deg, #48c9b0 40%, #6f86d6);
}

.color-gradient10 {
  background: -webkit-linear-gradient(315deg, rgba(175, 244, 27, 0.856) 30%, #50c878);
  background: linear-gradient(135deg, #96deda 30%, #50c878);
}
/**首页网址推荐**/
.ui-home {
  width: 1152px;
  margin: 0 auto;
  .ui-title {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 60px;
    font-size: 26px;
  }
}
.ui-project {
  display: grid;
  gap: 20px;
  list-style-type: none;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  padding: 0; /* Add padding reset */
  margin: 0;  /* Add margin reset */
  .item,
  .link {
    height: 220px;
  }
  .item {
    .link {
      margin-top: 0;
      display: block;
      color: #333;
      background: #fff;
      border: 1px solid #f1f1f1;
      border-radius: 6px;
      transition: all .4s;
    }
    .link:hover {
      box-shadow: 0 15px 30px rgba(0, 0, 0, .1);
      transform: rotateY(-0.1deg) scale(1.03) translateZ(0);
    }
    .title {
      height: 80px;
      padding-top: 25px;
      font-size: 24px;
      color: #fff;
      text-align: center;
      border-radius: 6px 6px 0 0;
    }
    .desc {
      line-height: 2;
      padding: 0 12px;
      margin-top: 14px;
      font-size: 14px;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
    }
  }
}
</style>
