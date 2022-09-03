import { ref } from "vue";

export const useModal = () => {
  const loading = ref<boolean>(false);
  const visible = ref<boolean>(false);

  const showModal = () => {
    visible.value = true;
  };

  const handleOk = () => {
    loading.value = true;
    setTimeout(() => {
      loading.value = false;
      visible.value = false;
    }, 2000);
  };

  const handleCancel = () => {
    visible.value = false;
  };

  return { visible, showModal, handleCancel, handleOk };
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
