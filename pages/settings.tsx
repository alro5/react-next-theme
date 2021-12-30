import { useSession } from "next-auth/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useSWRConfig } from "swr";
import { update } from '../services/services';
import { ErrorField } from "../src/components/error-field";

const Settings = () => {
  const { register, handleSubmit, setError, formState: { errors } } = useForm();
  const { data: session } = useSession();
  const [saved, setSaved] = useState(false);
  const onSubmit = (data: { name: string, email: string }) => updateUser(Object.assign(data, { id: session?.user?.id! }));
  const { mutate } = useSWRConfig();

  async function updateUser(user: { name: string, email: string, id: string }) {
    await update('http://localhost:3001/api/user', user).then(_ => {
      mutate('http://localhost:3001/api/user');
      setSaved(true);
    }).catch(e => {
      console.log('e :', e);
    }).finally(() => {
      setTimeout(() => {
        setSaved(false);
      }, 2000);
    })
  }

  return <div>
    <h1 className="h3">Settings</h1>
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="form__row">
        <label htmlFor="name">Name</label>
        <input id="name" placeholder="Name" type="text" defaultValue={session?.user?.name!} {...register("name", { required: true, pattern: /^[a-zA-Z\s]*$/ })} />
        {errors.name && <ErrorField errorType={errors.name?.type} fieldName="Name" />}
      </div>
      <div className="form__row">
        <label htmlFor="email">E-mail</label>
        <input id="email" placeholder="E-mail" type="email" defaultValue={session?.user?.email!} {...register("email", { required: true, pattern: /^\S+@\S+\.\S+$/ })} />
        {errors.email && <ErrorField errorType={errors.email?.type} fieldName="E-mail" />}
      </div>
      <div className="form__actions">
        {saved && <p className="form__msg form__msg--success">Saved!</p>}
        <button type="submit">
          Submit
        </button>
      </div>
    </form>
    <p className="text-muted">User id: {session?.user?.id}</p>
  </div>
}

export default Settings;