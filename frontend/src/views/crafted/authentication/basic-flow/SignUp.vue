<template>
  <!--begin::Wrapper-->
  <div class="bg-white rounded shadow-sm p-10 p-lg-15 mx-auto">
    <!--begin::Form-->
    <Form
      class="form w-100 fv-plugins-bootstrap5 fv-plugins-framework"
      novalidate="novalidate"
      @submit="onSubmitRegister"
      id="kt_login_signup_form"
      :validation-schema="registration"
    >
      <!--begin::Heading-->
      <div class="mb-10 text-center">
        <!--begin::Title-->
        <h1 class="text-dark mb-3">Yeni Hesap Oluştur</h1>
        <!--end::Title-->

        <!--begin::Link-->
        <div class="text-gray-400 fw-bold fs-4">
          Bir hesabınız varsa

          <router-link to="/sign-in" class="link-primary fw-bolder">
            Giriş Yapın
          </router-link>
        </div>
        <!--end::Link-->
      </div>
      <!--end::Heading-->

      <!--begin::Input group-->
      <div class="row fv-row mb-7">
        <!--begin::Col-->
        <div class="col-xl-6">
          <label class="form-label fw-bolder text-dark fs-6">Adınız</label>
          <Field
            class="form-control form-control-lg form-control-solid"
            type="text"
            placeholder=""
            name="name"
            autocomplete="off"
          />
          <div class="fv-plugins-message-container">
            <div class="fv-help-block">
              <ErrorMessage name="name" />
            </div>
          </div>
        </div>
        <!--end::Col-->

        <!--begin::Col-->
        <div class="col-xl-6">
          <label class="form-label fw-bolder text-dark fs-6">Soyadınız</label>
          <Field
            class="form-control form-control-lg form-control-solid"
            type="text"
            placeholder=""
            name="surname"
            autocomplete="off"
          />
          <div class="fv-plugins-message-container">
            <div class="fv-help-block">
              <ErrorMessage name="surname" />
            </div>
          </div>
        </div>
        <!--end::Col-->
      </div>
      <!--end::Input group-->

      <!--begin::Input group-->
      <div class="fv-row mb-7">
        <label class="form-label fw-bolder text-dark fs-6">Eposta</label>
        <Field
          class="form-control form-control-lg form-control-solid"
          type="email"
          placeholder=""
          name="email"
          autocomplete="off"
        />
        <div class="fv-plugins-message-container">
          <div class="fv-help-block">
            <ErrorMessage name="email" />
          </div>
        </div>
      </div>
      <!--end::Input group-->

      <!--begin::Input group-->
      <div class="mb-10 fv-row" data-kt-password-meter="true">
        <!--begin::Wrapper-->
        <div class="mb-1">
          <!--begin::Label-->
          <label class="form-label fw-bolder text-dark fs-6"> Parola </label>
          <!--end::Label-->

          <!--begin::Input wrapper-->
          <div class="position-relative mb-3">
            <Field
              class="form-control form-control-lg form-control-solid"
              type="password"
              placeholder=""
              name="password"
              autocomplete="off"
            />
            <div class="fv-plugins-message-container">
              <div class="fv-help-block">
                <ErrorMessage name="password" />
              </div>
            </div>
          </div>
          <!--end::Input wrapper-->
          <!--begin::Meter-->
          <div
            class="d-flex align-items-center mb-3"
            data-kt-password-meter-control="highlight"
          >
            <div
              class="flex-grow-1 bg-secondary bg-active-success rounded h-5px me-2"
            ></div>
            <div
              class="flex-grow-1 bg-secondary bg-active-success rounded h-5px me-2"
            ></div>
            <div
              class="flex-grow-1 bg-secondary bg-active-success rounded h-5px me-2"
            ></div>
            <div class="flex-grow-1 bg-secondary bg-active-success rounded h-5px"></div>
          </div>
          <!--end::Meter-->
        </div>
        <!--end::Wrapper-->
        <!--begin::Hint-->
        <div class="text-muted">
          Parolanız, büyük/küçük harf, rakam ve sembollerden oluşan en az 8 hane olsun.
        </div>
        <!--end::Hint-->
      </div>
      <!--end::Input group--->

      <!--begin::Input group-->
      <div class="fv-row mb-5">
        <label class="form-label fw-bolder text-dark fs-6">Parolayı Tekrarlayın</label>
        <Field
          class="form-control form-control-lg form-control-solid"
          type="password"
          placeholder=""
          name="confirmation"
          autocomplete="off"
        />
        <div class="fv-plugins-message-container">
          <div class="fv-help-block">
            <ErrorMessage name="confirmation" />
          </div>
        </div>
      </div>
      <!--end::Input group-->

      <!--begin::Input group-->
      <div class="fv-row mb-10">
        <label class="form-check form-check-custom form-check-solid">
          <Field class="form-check-input" type="checkbox" name="toc" value="1" />
          <span class="form-check-label fw-bold text-gray-700 fs-6 mb-7">
            <a href="#" class="ms-1 link-primary">Kullanıcı Sözleşmesi</a>'ni okudum &amp;
            onaylıyorum!
          </span>
          <div class="fv-plugins-message-container">
            <div class="fv-help-block">
              <ErrorMessage name="toc" />
            </div>
          </div>
        </label>
      </div>
      <!--end::Input group-->

      <!--begin::Actions-->
      <div class="text-center">
        <button
          id="kt_sign_up_submit"
          ref="submitButton"
          type="submit"
          class="btn btn-lg btn-primary"
        >
          <span class="indicator-label"> Gönder </span>
          <span class="indicator-progress">
            Lütfen bekleyin...
            <span class="spinner-border spinner-border-sm align-middle ms-2"></span>
          </span>
        </button>
      </div>
      <!--end::Actions-->
    </Form>
    <!--end::Form-->
  </div>
  <!--end::Wrapper-->
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, nextTick } from "vue";
import { ErrorMessage, Field, Form } from "vee-validate";
import * as Yup from "yup";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { Actions } from "@/store/enums/StoreEnums";
import { PasswordMeterComponent } from "@/assets/ts/components";
import Swal from "sweetalert2/dist/sweetalert2.min.js";

export default defineComponent({
  name: "sign-up",
  components: {
    Field,
    Form,
    ErrorMessage,
  },
  setup() {
    const store = useStore();
    const router = useRouter();

    const submitButton = ref<HTMLButtonElement | null>(null);

    const registration = Yup.object().shape({
      name: Yup.string().min(3).required().label("isim"),
      surname: Yup.string().min(3).required().label("soyisim"),
      email: Yup.string().min(4).required().email().label("eposta"),
      password: Yup.string().min(8).required().label("parola"),
      toc: Yup.bool().required("Şartları kabul etmelisiniz!").label("Şartlar"),
      confirmation: Yup.string()
        .required()
        .oneOf([Yup.ref("password"), null], "Parolalar Eşleşmeli!")
        .label("Parola Tekrarı"),
    });

    onMounted(() => {
      nextTick(() => {
        PasswordMeterComponent.bootstrap();
      });
    });

    const onSubmitRegister = async (values) => {
      // Clear existing errors
      store.dispatch(Actions.LOGOUT);

      // eslint-disable-next-line
      submitButton.value!.disabled = true;

      // Activate indicator
      submitButton.value?.setAttribute("data-kt-indicator", "on");

      // Send login request
      await store.dispatch(Actions.REGISTER, values);

      const [errorName] = Object.keys(store.getters.getErrors);
      const error = store.getters.getErrors[errorName];

      if (!error) {
        Swal.fire({
          text: "Kayıt işleminiz başarıyla bitti!",
          icon: "success",
          buttonsStyling: false,
          confirmButtonText: "Tamamdır",
          customClass: {
            confirmButton: "btn fw-bold btn-light-primary",
          },
        }).then(function () {
          router.push({ name: "sign-in" });
        });
      } else {
        Swal.fire({
          text: error.message,
          icon: "error",
          buttonsStyling: false,
          confirmButtonText: "Tekrar Deneyin!",
          customClass: {
            confirmButton: "btn fw-bold btn-light-danger",
          },
        });
      }

      submitButton.value?.removeAttribute("data-kt-indicator");
      // eslint-disable-next-line
      submitButton.value!.disabled = false;
    };

    return {
      registration,
      onSubmitRegister,
      submitButton,
    };
  },
});
</script>
