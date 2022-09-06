import exp from "constants";
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

export const useFormSubmiter = (values: any, service: Function) => {
  const formState = reactive(values);
  const formSubmit = () => {
    service(formState);
  };
  return {
    formState,
    formSubmit,
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
