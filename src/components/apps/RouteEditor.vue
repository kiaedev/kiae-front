
<script lang="ts">
import { defineComponent, reactive, ref, defineEmits, onMounted } from 'vue';
import { useFormSubmiter, useModal } from '@/hooks/modal';
import { AppSize, RouteRoute, RouteRouteType } from '@/libs/kiae';
import { useKiaeApi } from '@/hooks/kiae';
import { message } from 'ant-design-vue/es';

export default defineComponent({
    props: {
        value: Object,
        app: Object,
    },
    emits: ["done"],
    setup(props, ctx) {
        const { visible, modalOpen, modalClose } = useModal()
        const { routeSvc } = useKiaeApi()
        const initFormItem: any = {
            id: props.value?.id,
            appid: props.app?.id,
            path: '',
            methods: [],
            type: RouteRouteType.Forward,
            forward: {
                limiter: {
                    qps: 10
                },
                cors: {},
                rewrite: {}
            },
            redirect: {
                enabled: false,
                code: 301,
                url: ''
            },
            mock: {
                enabled: false,
                code: 200,
                body: ''
            },
        }

        let title = "New Route"
        let formItem = initFormItem
        if (props.value) {
            formItem = props.value
            title = "Edit Route"
        }
        const { formState, formSubmit, resetFields } = useFormSubmiter(formItem, (values: any) => {
            const done = () => {
                message.success("succeed!");
                resetFields({})
                modalClose()
                ctx.emit("done")
            }

            if (values.id) {
                routeSvc.routeServiceUpdate(values.appid, values?.id, values).then(done)
            } else {
                routeSvc.routeServiceCreate(props.app?.id, values).then(done)
            }
        })

        return {
            title, visible, modalOpen,
            formState, formSubmit,
            methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"]
        };
    },
});
</script>
        
<template>
    <a @click="modalOpen">
        <slot></slot>
    </a>

    <a-modal v-model:visible="visible" width="650px" :title="title" :footer="null">
        <a-form :model="formState" :label-col="{ span: 5 }" :wrapper-col="{ span: 16 }" @finish="formSubmit">
            <a-form-item label="Path" name="path" :rules="[{ required: true, message: 'Please input the path' }]">
                <a-input v-model:value="formState.path" placeholder="Please input the path"></a-input>
            </a-form-item>
            <a-form-item label="Methods" name="methods"
                :rules="[{ required: true, message: 'Please select the methods' }]">
                <a-select v-model:value="formState.methods" mode="multiple" placeholder="Please select the methods">
                    <a-select-option v-for="method in methods" :key="method" :value="method">
                        {{ method }}
                    </a-select-option>
                </a-select>
            </a-form-item>

            <a-form-item label="Type" name="type">
                <a-radio-group v-model:value="formState.type">
                    <a-radio-button value="FORWARD">Forward</a-radio-button>
                    <a-radio-button value="REDIRECT">Redirect</a-radio-button>
                    <a-radio-button value="DIRECT_RESPONSE">DirectResponse</a-radio-button>
                </a-radio-group>
            </a-form-item>
            <template v-if="formState.type == 'FORWARD'">
                <a-form-item label="Limiter">
                    <a-switch v-model:checked="formState.forward.limiter.enabled" />
                </a-form-item>
                <div v-if="formState.forward.limiter.enabled" class="inner-form">
                    <a-form-item label="LimitQPS" :name="['forward', 'limiter', 'qps']"
                        :rules="[{ required: true, message: 'Please input the limit QPS' }]">
                        <a-input-number v-model:value="formState.forward.limiter.qps" size="small"></a-input-number>
                    </a-form-item>
                    <a-form-item label="Fallback" name="fallback">
                        <a-select v-model:value="formState.forward.limiter.fallback" size="small"
                            placeholder="select the fallback policy" style="width: 260px"></a-select>
                    </a-form-item>
                </div>
                <a-form-item label="CORS">
                    <a-switch v-model:checked="formState.forward.cors.enabled" />
                </a-form-item>
                <div v-if="formState.forward.cors.enabled" class="inner-form">
                    <a-form-item label="allowOrigins" name="allowOrigins">
                        <a-select v-model:value="formState.forward.cors.allowOrigins" mode="tags" size="small">
                        </a-select>
                    </a-form-item>
                    <a-form-item label="allowMethods" name="allowMethods">
                        <a-select v-model:value="formState.forward.cors.allowMethods" mode="multiple" size="small">
                            <a-select-option v-for="method in methods" :key="method" :value="method">
                                {{ method }}
                            </a-select-option>
                        </a-select>
                    </a-form-item>
                    <a-form-item label="allowHeaders" name="allowHeaders">
                        <a-select v-model:value="formState.forward.cors.allowHeaders" mode="tags" size="small">
                        </a-select>
                    </a-form-item>
                    <a-form-item label="exposeHeaders" name="exposeHeaders">
                        <a-select v-model:value="formState.forward.cors.exposeHeaders" mode="tags" size="small">
                        </a-select>
                    </a-form-item>
                    <a-form-item label="maxAge" name="maxAge">
                        <a-input-number v-model:value="formState.forward.cors.maxAge" size="small">
                        </a-input-number>
                    </a-form-item>
                    <a-form-item label="allowCredentials" name="allowCredentials">
                        <a-switch v-model:checked="formState.forward.cors.allowCredentials" size="small" />
                    </a-form-item>
                </div>
            </template>
            <template v-if="formState.type == 'REDIRECT' || formState.failback == 'redirect'">
                <a-form-item label="StatusCode" :name="['redirect', 'code']">
                    <a-radio-group v-model:value="formState.redirect.code">
                        <a-radio :value="301">301</a-radio>
                        <a-radio :value="302">302</a-radio>
                        <a-radio :value="307">307</a-radio>
                        <a-radio :value="308">308</a-radio>
                    </a-radio-group>
                </a-form-item>
                <a-form-item label="RedirectURL" :name="['redirect', 'url']"
                    :rules="[{ required: true, message: 'Please input the redirect url' }]">
                    <a-input v-model:value="formState.redirect.url"></a-input>
                </a-form-item>
            </template>
            <template v-if="formState.type == 'DIRECT_RESPONSE'">
                <a-form-item label="ResponseCode" :name="['mock', 'code']"
                    :rules="[{ required: true, message: 'Please input the response code' }]">
                    <a-input-number v-model:value="formState.mock.code"></a-input-number>
                </a-form-item>
                <a-form-item label="ResponseBody" :name="['mock', 'body']"
                    :rules="[{ required: true, message: 'Please input the response body' }]">
                    <a-textarea v-model:value="formState.mock.body"></a-textarea>
                </a-form-item>
            </template>
            <a-form-item :wrapper-col="{ offset: 5, span: 16 }">
                <a-button type="primary" html-type="submit">{{ $t('btn.save') }}</a-button>
            </a-form-item>
        </a-form>
    </a-modal>
</template>
          
<style scoped>
.inner-form {
    background-color: #eef0f5;
    padding: 10px 10px;
    margin: 0px 50px
}

.inner-form .ant-form-item {
    margin-bottom: 0px;
}
</style>