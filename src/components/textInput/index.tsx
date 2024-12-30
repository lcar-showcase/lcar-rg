import style from "./textInput.module.css";

interface TextInputProps {
  label: string;
  id: string;
  name: string;
  placeholder: string;
  errorMsg: string;
}

function TextInput({ label, id, name, placeholder, errorMsg }: TextInputProps) {
  return (
    <div className={style.nameInput}>
      <label htmlFor={name}>
        {label}
        <input type="text" id={id} name={name} placeholder={placeholder} />
      </label>
      <p>{errorMsg}</p>
    </div>
  );
}

export default TextInput;
