Vue3使用elementplus封装一个可供多个页面使用的表单

> 使用的时候使用props传值，但是在组件中要包含所需要的表单项的所有类型，使用v-if控制是否展示。

```vue
//封装的组件

<template>
  <el-form :model="formModel" :rules="rules" ref="formRef">
    <el-form-item v-for="item in formItems" :key="item.prop" :label="item.label" :prop="item.prop">
      <template v-if="item.type === 'input'">
        <el-input v-model="formModel[item.prop]"></el-input>
      </template>
      <template v-if="item.type === 'select'">
        <el-select v-model="formModel[item.prop]">
          <el-option v-for="option in item.options" :key="option.value" :label="option.label" :value="option.value"></el-option>
        </el-select>
      </template>
      <!-- 根据需要添加其他表单项类型 -->
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm">提交</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue';
import { ElForm, ElFormItem, ElInput, ElSelect, ElOption, ElButton } from 'element-plus';

const props = defineProps<{
  formItems: Array<{
    prop: string;
    label: string;
    type: 'input' | 'select';
    defaultValue?: string;
    options?: Array<{ value: string; label: string }>;
    rules?: any[];
  }>;
}>();

const formRef = ref(null);
const formModel = ref({});
const rules = reactive({});

onMounted(() => {
  initForm();
});

const initForm = () => {
  formModel.value = {};
  rules.value = {};
  props.formItems.forEach((item) => {
    formModel.value[item.prop] = item.defaultValue || '';
    if (item.rules) {
      rules.value[item.prop] = item.rules;
    }
  });
};

const submitForm = () => {
  formRef.value.validate((valid) => {
    if (valid) {
      console.log('Form Model:', formModel.value);
    } else {
      console.error('Form validation failed!');
    }
  });
};
</script>
```

```vue
//使用该组件



<template>
  <FormComponent :form-items="formItems" />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import FormComponent from './components/FormComponent.vue';

const formItems = ref([
  {
    prop: 'username',
    label: '用户名',
    type: 'input',
    defaultValue: '请输入用户名',
    rules: [{ required: true, message: '用户名不能为空', trigger: 'blur' }]
  },
  {
    prop: 'gender',
    label: '性别',
    type: 'select',
    options: [
      { value: 'male', label: '男' },
      { value: 'female', label: '女' }
    ]
  },
  // 可以继续添加其他表单项
]);

</script>
```

