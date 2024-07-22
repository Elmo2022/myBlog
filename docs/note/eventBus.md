> 今天使用一下event bus事件总线来进行兄弟组件之间的数据传递。

### 代码

```typescript
// event-bus.ts
import { reactive, readonly } from 'vue';

const state = reactive(new Map());

export default readonly({
  emit(event: string, payload: any) {
    state.forEach((callback, key) => {
      if (key === event) {
        callback(payload);
      }
    });
  },
  on(event: string, callback: Function) {
    state.set(event, callback);
  },
  off(event: string) {
    state.delete(event);
  }
});
```



```vue
<template>
  <div style="width: 300px;height: 300px; background-color: red; margin: 0 auto; text-align: center; line-height: 300px">
    我是哥哥组件
    
   {{ datas }}
  </div>

</template>

<script lang="ts">
import { defineComponent, watchEffect } from 'vue';
import eventBus from '../utils/event-bus'; // 引入 event bus
import {ref} from  'vue'
export default defineComponent({
  setup() {
    const datas = ref('')
    // 监听事件
    const emitData = (data: string) => {
      eventBus.emit('custom-event', data);
    };

    watchEffect(() => {
      eventBus.on('custom-event', (payload) => {
        datas.value = payload;
        console.log('Received event with payload:', payload);
      });
    });

    return {
      emitData,
      datas
    };
  }
});
</script>
<style>

</style>
```



```vue
<template>
  <div style="width: 300px;height: 300px; background-color: green; margin: 0 auto; text-align: center; line-height: 300px">
    我是弟弟组件
    <button @click="sendData">给哥哥发信息</button>
  </div>
 
  <template>


</template>
</template>


<script lang="ts">
import { defineComponent } from 'vue';

import eventBus from '../utils/event-bus'; // 引入 event bus

export default defineComponent({

  setup() {
    const sendData = () => {
      eventBus.emit('custom-event', '在吗？哥哥');
    };

    return {
      sendData
    };
  }
});
</script>
<style>

</style>
```





```vue
<template>
  <br>
  这里展示一下兄弟组件通过event bus进行通信
  <br>
 <child></child>
 <parent/>
</template>

<script setup lang="ts">
import child from "../components/childComponent.vue"
import parent from "../components/parentComponent.vue"
</script>

<style>

</style>
```



### 效果

![image-20240722221429357](https://raw.githubusercontent.com/Elmo2022/pictureBed/master/img/202407222214486.png)

点击按钮，实现兄弟组件的信息传递！

![image-20240722221505593](https://raw.githubusercontent.com/Elmo2022/pictureBed/master/img/202407222215656.png)

![image-20240722221555185](https://raw.githubusercontent.com/Elmo2022/pictureBed/master/img/202407222215219.png)