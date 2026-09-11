export function showErrorMessage(message, form) {
  removeMessage(form);
  const errorEl = document.createElement("p");
  errorEl.className = "form-error";
  errorEl.textContent = message;
  form.appendChild(errorEl);
}
export function removeMessage(form) {
  form
    .querySelectorAll(".form-error, .form-error-list, .form-success")
    .forEach((el) => el.remove());
}
export function showErrors(errors, form) {
  removeMessage(form);
  const ul = document.createElement("ul");
  ul.className = "form-error-list";
  errors.forEach((error) => {
    const li = document.createElement("li");
    li.textContent = error.message;
    ul.appendChild(li);
  });
  form.appendChild(ul);
}
