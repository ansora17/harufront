import React from "react";
import FormInput from "./FormInput";

export default function RequestInfoForm({
  form,
  onChange,
  onSubmit,
  title,
  submitText = "확인",
}) {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <h2 className="text-xl font-bold text-center">{title}</h2>
      <FormInput
        name="name"
        value={form.name}
        onChange={onChange}
        placeholder="이름"
      />
      <FormInput
        name="email"
        value={form.email}
        onChange={onChange}
        placeholder="이메일 주소"
      />
      <button
        type="submit"
        className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        {submitText}
      </button>
    </form>
  );
}
