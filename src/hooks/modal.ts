import { Form } from "ant-design-vue";
import { reactive, ref } from "vue";

export const useModal = () => {
  const visible = ref<boolean>(false);

  const modalOpen = () => {
    visible.value = true;
  };

  const modalClose = () => {
    visible.value = false;
  };

  return { visible, modalOpen, modalClose };
};

export const useLoading = () => {
  const loading = ref<boolean>(false);
  const loadStart = () => {
    loading.value = true;
  };
  const loadDone = () => {
    loading.value = true;
  };

  return { loading, loadStart, loadDone };
};

const useForm = Form.useForm;
export const useFormSubmiter = (values: any, service: Function) => {
  const formState = reactive(values);
  const { resetFields } = useForm(formState);
  const formSubmit = () => service(formState);
  return {
    formState,
    formSubmit,
    resetFields,
  };
};

export const useSelect = () => {
  const currentSelect = ref();
  const handleSelect = (curr: any) => {
    currentSelect.value = curr;
  };

  return {
    currentSelect,
    handleSelect,
  };
};
